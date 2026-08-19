/** Pickup availability — edit these windows anytime your schedule changes. */
export const PICKUP_WINDOWS = {
  // 0 = Sunday … 6 = Saturday
  4: [
    { start: '06:00', end: '12:00' },
    { start: '16:00', end: '18:00' },
  ], // Thursday: 6am–12pm, 4pm–6pm
  5: [
    { start: '06:00', end: '10:30' },
    { start: '15:00', end: '18:00' },
  ], // Friday: 6am–10:30am, 3pm–6pm
  6: [{ start: '06:00', end: '17:00' }], // Saturday: 6am–5pm
}

const SLOT_MINUTES = 15

function parseTime(value) {
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

function formatTimeValue(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function formatTimeLabel(totalMinutes) {
  const hours24 = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const period = hours24 >= 12 ? 'PM' : 'AM'
  const hours12 = hours24 % 12 || 12
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`
}

export function isPickupDay(date) {
  return Boolean(PICKUP_WINDOWS[date.getDay()])
}

export function getTimeSlotsForDate(date) {
  const windows = PICKUP_WINDOWS[date.getDay()]
  if (!windows) return []

  const slots = []
  for (const window of windows) {
    const start = parseTime(window.start)
    const end = parseTime(window.end)
    for (let minutes = start; minutes <= end; minutes += SLOT_MINUTES) {
      slots.push({
        value: formatTimeValue(minutes),
        label: formatTimeLabel(minutes),
      })
    }
  }

  const seen = new Set()
  return slots.filter((slot) => {
    if (seen.has(slot.value)) return false
    seen.add(slot.value)
    return true
  })
}

export function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function parseDateInputValue(value) {
  if (!value) return null
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getUpcomingPickupDates(daysAhead = 30, from = new Date()) {
  const dates = []
  const date = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  for (let i = 0; i <= daysAhead; i += 1) {
    if (isPickupDay(date)) {
      dates.push(new Date(date))
    }
    date.setDate(date.getDate() + 1)
  }
  return dates
}

export function filterSlotsAfterNow(date, slots, now = new Date()) {
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  if (!isToday) return slots

  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  return slots.filter((slot) => {
    const [hours, minutes] = slot.value.split(':').map(Number)
    return hours * 60 + minutes > nowMinutes
  })
}

export function formatPickupSelection(dateValue, timeValue) {
  const date = parseDateInputValue(dateValue)
  if (!date || !timeValue) return ''
  const [hours, minutes] = timeValue.split(':').map(Number)
  date.setHours(hours, minutes, 0, 0)
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
