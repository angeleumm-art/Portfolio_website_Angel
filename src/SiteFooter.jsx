import { Link } from 'react-router-dom'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <nav className="site-footer-nav" aria-label="Footer">
          <Link to="/order">Order Now</Link>
          <Link to="/about">About</Link>
          <Link to="/weddings">Wedding Cakes/Events</Link>
          <Link to="/merch">Merch</Link>
          <Link to="/gift-cards">Gift Cards</Link>
          <Link to="/faqs">FAQs</Link>
          <a href="mailto:angelle@angellesucre.com">Contact</a>
        </nav>

        <div className="site-footer-social">
          <a
            href="https://instagram.com/angellesucre"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram @angellesucre"
            className="site-footer-social-link"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@angellesucre"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok @angellesucre"
            className="site-footer-social-link"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M16.6 5.8A4.7 4.7 0 0 1 14.9 2h-2.7v13.1a2.5 2.5 0 1 1-1.8-2.4V10a5.2 5.2 0 1 0 4.5 5.1V9.2a7.3 7.3 0 0 0 4.2 1.3V7.8a4.7 4.7 0 0 1-2.5-2z"
              />
            </svg>
          </a>
          <a
            href="https://www.pinterest.com/angellesucre"
            target="_blank"
            rel="noreferrer"
            aria-label="Pinterest @angellesucre"
            className="site-footer-social-link"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6.1 9.1-.1-.8-.2-2 0-2.9.2-.8 1.3-5.4 1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.3-4.5-4.3-3.1 0-4.9 2.3-4.9 4.7 0 .9.4 1.9.8 2.4.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.3.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8 1 .3 2 .5 3.1.5 5.5 0 10-4.5 10-10S17.5 2 12 2z"
              />
            </svg>
          </a>
        </div>

        <div className="site-footer-bottom">
          <div className="site-footer-policies">
            <Link to="/faqs">FAQs</Link>
            <Link to="/weddings">Allergies *</Link>
            <a href="mailto:orders@angellesucre.com">Orders</a>
            <a href="mailto:angelle@angellesucre.com">Inquiries</a>
          </div>
          <p className="site-footer-copy">© 2026, Angelle Sucre</p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
