/**
 * Angelle Sucre — log order inquiry emails into a spreadsheet.
 *
 * Runs inside Google Apps Script, attached to a Google Sheet. On a timer it
 * searches Gmail for order inquiries, pulls the cake details out of the email
 * body, and appends one row per cake. Processed threads get a Gmail label so
 * nothing is ever logged twice.
 *
 * Setup instructions live in automation/README.md.
 */

// ---------------------------------------------------------------------------
// CONFIG — these are the only lines you should need to touch.
// ---------------------------------------------------------------------------

/** Which Gmail messages to look at. Uses normal Gmail search syntax. */
var SEARCH_QUERY = 'to:orders@angellesucre.com';

/** Tab name inside the spreadsheet. Created automatically if missing. */
var SHEET_NAME = 'Order Inquiries';

/** Gmail label applied once a thread is logged, so it is skipped next time. */
var PROCESSED_LABEL = 'Logged to Sheet';

/** Your own domain. Mail sent *by* you is skipped, so replies aren't logged. */
var OWN_DOMAIN = 'angellesucre.com';

/** Safety valve: most threads to examine in a single run. */
var MAX_THREADS_PER_RUN = 50;

// ---------------------------------------------------------------------------

var HEADERS = [
  'Received',
  'Customer Name',
  'Customer Email',
  'Subject',
  'Item #',
  'Item',
  'Size',
  'Price',
  'Flavor',
  'Cream',
  'Filling',
  'Nut Allergy',
  'Shape',
  'Pickup Date & Time',
  'Additional Notes',
  'Instagram / Phone',
  'Email Link',
  'Message ID',
];

var TAIL_LABELS = [
  'Desired pickup date & time:',
  'Additional notes:',
  'Instagram/Phone # (Both Required):',
  'Pickup Agreement:',
];

/**
 * Main entry point. This is the function the timer runs.
 */
function logNewOrderInquiries() {
  var sheet = getSheet_();
  var alreadyLogged = getLoggedMessageIds_(sheet);
  var label = getOrCreateLabel_(PROCESSED_LABEL);

  var query = SEARCH_QUERY + ' -label:"' + PROCESSED_LABEL + '"';
  var threads = GmailApp.search(query, 0, MAX_THREADS_PER_RUN);

  var rows = [];
  var threadsToLabel = [];

  threads.forEach(function (thread) {
    var messages = thread.getMessages();

    messages.forEach(function (message) {
      var from = message.getFrom();

      // Skip anything you sent yourself, so replies in the thread aren't logged.
      if (OWN_DOMAIN && from.toLowerCase().indexOf(OWN_DOMAIN.toLowerCase()) !== -1) {
        return;
      }

      var messageId = message.getId();
      if (alreadyLogged[messageId]) return;

      rows = rows.concat(buildRowsForMessage_(message, thread));
      alreadyLogged[messageId] = true;
    });

    threadsToLabel.push(thread);
  });

  if (rows.length) {
    sheet
      .getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length)
      .setValues(rows);
  }

  // Label only after a successful write, so a failure mid-run is retried.
  threadsToLabel.forEach(function (thread) {
    thread.addLabel(label);
  });

  return rows.length;
}

/**
 * Turns one email into one or more spreadsheet rows (one per cake ordered).
 */
function buildRowsForMessage_(message, thread) {
  var body = message.getPlainBody().replace(/\r\n/g, '\n');
  var sender = parseSender_(message.getFrom());
  var received = message.getDate();
  var subject = message.getSubject();
  var link = 'https://mail.google.com/mail/u/0/#all/' + thread.getId();
  var messageId = message.getId();

  var pickup = extractTailField_(body, 'Desired pickup date & time:');
  var notes = extractTailField_(body, 'Additional notes:');
  var contact = extractTailField_(body, 'Instagram/Phone # (Both Required):');

  var items = parseItems_(body);

  // Free-form inquiries (e.g. wedding emails) have no cake blocks. Keep them
  // rather than dropping them, with the message text in the notes column.
  if (!items.length) {
    items = [
      {
        index: '',
        name: '(unstructured inquiry)',
        fields: {},
      },
    ];
    if (!notes) notes = body.trim();
  }

  return items.map(function (item) {
    return [
      received,
      sender.name,
      sender.email,
      subject,
      item.index,
      item.name,
      item.fields.size || '',
      item.fields.price || '',
      item.fields.flavor || '',
      item.fields.cream || '',
      item.fields.filling || '',
      item.fields.nutAllergy || '',
      item.fields.shape || '',
      pickup,
      notes,
      contact,
      link,
      messageId,
    ];
  });
}

/**
 * Pulls the "--- Cake 1: Spring Florals ---" blocks out of the body.
 */
function parseItems_(body) {
  var lines = body.split('\n');
  var headerPattern = /^---\s*(?:Cake|Item)\s+(\d+):\s*(.+?)\s*---\s*$/;
  var items = [];
  var current = null;

  lines.forEach(function (rawLine) {
    var line = rawLine.trim();
    var header = line.match(headerPattern);

    if (header) {
      current = { index: header[1], name: header[2], fields: {} };
      items.push(current);
      return;
    }

    if (!current) return;

    // A tail label means the item list is over.
    for (var i = 0; i < TAIL_LABELS.length; i++) {
      if (line.indexOf(TAIL_LABELS[i]) === 0) {
        current = null;
        return;
      }
    }

    var separator = line.indexOf(':');
    if (separator === -1) return;

    var key = line.slice(0, separator).trim();
    var value = line.slice(separator + 1).trim();
    assignItemField_(current, key, value);
  });

  return items;
}

/**
 * Maps an email label like "Cake Size" onto a column, splitting the
 * "6" ($130)" form into separate size and price values.
 */
function assignItemField_(item, key, value) {
  var normalized = key.toLowerCase();

  if (normalized === 'cake size' || normalized === 'gift card amount') {
    var withPrice = value.match(/^(.*?)\s*\(([^)]*)\)\s*$/);
    if (withPrice) {
      item.fields.size = withPrice[1].trim();
      item.fields.price = withPrice[2].trim();
    } else {
      item.fields.size = value;
    }
    return;
  }

  if (normalized === 'cake flavor') {
    item.fields.flavor = value;
  } else if (normalized === 'cake cream') {
    item.fields.cream = value;
  } else if (normalized === 'nut allergy') {
    item.fields.nutAllergy = value;
  } else if (normalized === 'cake shape') {
    item.fields.shape = value;
  } else if (normalized.indexOf('filling') !== -1) {
    // Covers "Cake Filling" and the flavour-specific filling labels.
    item.fields.filling = value;
  }
}

/**
 * Reads a trailing field, which may run across several lines because the
 * customer types their answer after the colon.
 */
function extractTailField_(body, label) {
  var start = body.indexOf(label);
  if (start === -1) return '';

  var rest = body.slice(start + label.length);
  var end = rest.length;

  TAIL_LABELS.forEach(function (other) {
    if (other === label) return;
    var index = rest.indexOf(other);
    if (index !== -1 && index < end) end = index;
  });

  return rest.slice(0, end).trim();
}

function parseSender_(from) {
  var match = from.match(/^\s*(.*?)\s*<([^>]+)>\s*$/);
  if (match) {
    return { name: match[1].replace(/^"|"$/g, ''), email: match[2] };
  }
  return { name: '', email: from.trim() };
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActive();
  if (!spreadsheet) {
    throw new Error(
      'No spreadsheet attached. Open this script from a Google Sheet via Extensions > Apps Script.'
    );
  }

  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function getLoggedMessageIds_(sheet) {
  var seen = {};
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return seen;

  var column = HEADERS.indexOf('Message ID') + 1;
  var values = sheet.getRange(2, column, lastRow - 1, 1).getValues();

  values.forEach(function (row) {
    if (row[0]) seen[String(row[0])] = true;
  });

  return seen;
}

function getOrCreateLabel_(name) {
  return GmailApp.getUserLabelByName(name) || GmailApp.createLabel(name);
}

/**
 * Run once by hand to start the automation. Checks Gmail every 15 minutes.
 */
function createTrigger() {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === 'logNewOrderInquiries') {
      ScriptApp.deleteTrigger(trigger);
    }
  });

  ScriptApp.newTrigger('logNewOrderInquiries').timeBased().everyMinutes(15).create();
}

/**
 * Run once by hand to import inquiries that arrived before you set this up.
 * Removes the processed label from matching threads so they are re-read.
 */
function backfillExistingInquiries() {
  var label = GmailApp.getUserLabelByName(PROCESSED_LABEL);
  if (label) {
    GmailApp.search('label:"' + PROCESSED_LABEL + '"', 0, 200).forEach(function (thread) {
      thread.removeLabel(label);
    });
  }

  var total = 0;
  for (var pass = 0; pass < 10; pass++) {
    var added = logNewOrderInquiries();
    total += added;
    if (!added) break;
  }

  return total;
}
