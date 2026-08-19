import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'
import CartNavLink from './CartNavLink'
import SiteFooter from './SiteFooter'
import './App.css'

function WeddingsPage() {
  return (
    <div className="site weddings-page">
      <header className="topbar">
        <BrandMark />
        <nav className="top-nav" aria-label="Main sections">
          <Link to="/about" className="small-link">
            About
          </Link>
          <Link to="/order" className="small-link">
            Order Now
          </Link>
          <Link to="/weddings" className="small-link">
            Wedding Cakes/Events
          </Link>
          <Link to="/merch" className="small-link">
            Merch
          </Link>
          <Link to="/gift-cards" className="small-link">
            Gift Cards
          </Link>
          <Link to="/faqs" className="small-link">
            FAQs
          </Link>
        </nav>
        <CartNavLink />
      </header>

      <div className="faqs-intro">
        <h1>Wedding Cakes / Events</h1>
        <p className="faqs-lead">
          An Angelle Sucre wedding cake will be your statement piece at your wedding. All
          cakes are made with seasonal ingredients and topped with fresh flowers.
        </p>
      </div>

      <div className="faqs-list">
        <section className="faq-item">
          <h2>Inquiries</h2>
          <p>
            To inquire about an Angelle Sucre custom cake or for any partnership, pop-up, and
            collaboration inquiries, please send an email to{' '}
            <a href="mailto:angelle@angellesucre.com">angelle@angellesucre.com</a> and
            we&apos;ll get back within the next few days. For cake orders, email{' '}
            <a href="mailto:orders@angellesucre.com">orders@angellesucre.com</a>.
          </p>
        </section>

        <section className="faq-item">
          <h2>Ordering</h2>
          <p>
            We recommend to place your order a month in advance to guarantee your desired
            cake. We need all custom cake orders to be finalized and invoiced two weeks
            before the desired fulfillment date — we&apos;re a small team. Giving us that
            extra time will allow us to create the cake of your dreams. Please note that we
            don&apos;t do themed or fondant cakes and like to keep them as natural looking as
            possible.
          </p>
        </section>

        <section className="faq-item">
          <h2>Allergies &amp; Cancellations</h2>
          <p>
            All cakes are made in a tree nut, dairy, gluten and soy facility. Please note:
            Cancellations made at least 10 days prior to the scheduled fulfillment date are
            eligible for a 50% refund of the total order value; no refunds or cancellations
            are allowed within 10 days of the scheduled fulfillment date. Unfortunately, we
            are unable to store orders overnight.
          </p>
        </section>
      </div>

      <section className="faqs-closing">
        <h2>Get in touch</h2>
        <p>
          Email{' '}
          <a href="mailto:orders@angellesucre.com">orders@angellesucre.com</a> for wedding
          and cake orders, or{' '}
          <a href="mailto:angelle@angellesucre.com">angelle@angellesucre.com</a> for
          collaborations and event inquiries, and we&apos;ll get back within the next few
          days.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="mailto:orders@angellesucre.com">
            Wedding and Cake Orders
          </a>
          <a className="button ghost" href="mailto:angelle@angellesucre.com">
            Collaborations and Event Inquiries
          </a>
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}

export default WeddingsPage
