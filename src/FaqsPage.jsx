import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'
import CartNavLink from './CartNavLink'
import SiteFooter from './SiteFooter'
import './App.css'

function FaqsPage() {
  return (
    <div className="site faqs-page">
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
        <h1>Frequently Asked Questions</h1>
        <p className="faqs-lead">
          A few common questions before you place your Angelle Sucre order.
        </p>
      </div>

      <div className="faqs-list">
        <section className="faq-item">
          <h2>How far in advance should I order?</h2>
          <p>
            We recommend ordering at least one month in advance to secure your preferred date
            and design. Rush orders may be available depending on the season and design. If
            your date is unavailable online, email us to inquire about availability.
          </p>
        </section>

        <section className="faq-item">
          <h2>Do you accommodate allergies?</h2>
          <p>
            Please share any allergies or dietary restrictions when inquiring. We can advise
            what accommodations are possible for nuts, dairy, gluten, and other allergens.
          </p>
        </section>

        <section className="faq-item">
          <h2>Can someone else pick up my cake?</h2>
          <p>
            Yes! Someone else may pick up your order as long as they provide the name/phone
            number on the order. All orders must be picked up in person.
          </p>
        </section>

        <section className="faq-item">
          <h2>Do you offer delivery?</h2>
          <p>
            Delivery is available for orders $500+ within a reasonable distance for an
            additional fee through a third-party delivery service. Email{' '}
            <a href="mailto:orders@angellesucre.com">orders@angellesucre.com</a> to inquire
            about your location. For deliveries arranged through Angelle Sucre, we remain
            responsible for the cake until it reaches the venue. A two-hour delivery window
            is required due to unpredictable Dallas traffic.
          </p>
        </section>

        <section className="faq-item">
          <h2>How should I store my cake?</h2>
          <p>
            If you are not serving your cake within 1–2 hours of pickup, keep it
            refrigerated. For overnight storage, keep it away from strong-smelling foods,
            such as onions and garlic, which may affect the cake&apos;s flavor.
          </p>
          <p>
            For buttercream cakes, remove from the refrigerator at least 1½ hours before
            serving for the best texture. For soft cream cakes, keep refrigerated and remove
            shortly before serving. Never leave cakes in heat or direct sunlight, as the
            cream can soften and flowers may wilt.
          </p>
          <p>
            Fresh flowers are placed in bright green water-filled pipettes beneath the
            buttercream to help keep them fresh.
          </p>
        </section>

        <section className="faq-item">
          <h2>How should I travel with my cake?</h2>
          <p>
            Keep your cake on a flat, stable surface. For regular cakes, the passenger-side
            floor is ideal. Three-tier cakes should be placed on the floor behind the
            passenger seat, secured between the front and back seats.
          </p>
          <p>
            Never place a tiered cake on your lap or car seat. We recommend having a
            passenger monitor the cake during transportation. Drive slowly and avoid bumps,
            sudden stops, and sharp turns. During warm weather, keep the A/C on high.
          </p>
        </section>

        <section className="faq-item">
          <h2>How long will my cake last?</h2>
          <p>
            For the best freshness and flower quality, we recommend enjoying your cake as
            close to pickup as possible. Cakes may be refrigerated for up to 36 hours after
            pickup.
          </p>
        </section>

        <section className="faq-item">
          <h2>Can you write on the cake?</h2>
          <p>
            We do not write directly on soft cream cakes. For buttercream cakes, we typically
            recommend placing writing on the cake board. Please email{' '}
            <a href="mailto:orders@angellesucre.com">orders@angellesucre.com</a> to discuss
            your options.
          </p>
        </section>
      </div>

      <section className="faqs-closing">
        <h2>Still have a question?</h2>
        <p>
          DM @angellesucre or email{' '}
          <a href="mailto:orders@angellesucre.com">orders@angellesucre.com</a> and we will
          help you plan the perfect cake.
        </p>
        <a
          className="button primary"
          href="https://instagram.com/angellesucre"
          target="_blank"
          rel="noreferrer"
        >
          Message On Instagram
        </a>
      </section>
      <SiteFooter />
    </div>
  )
}

export default FaqsPage
