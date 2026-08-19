import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'
import CartNavLink from './CartNavLink'
import SiteFooter from './SiteFooter'
import './App.css'

function GiftCardsPage() {
  return (
    <div className="site">
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

      <div className="shop-intro">
        <h1>Gift Cards</h1>
        <p>Be a sweet angel &lt;3 — give someone an Angelle Sucre celebration.</p>
      </div>

      <div className="shop-grid">
        <Link
          to="/order/gift-card"
          className="shop-card shop-card-link"
          aria-label="Order Gift Card"
        >
          <div
            className="shop-image"
            style={{ '--photo': 'url(/images/gift-card.png)' }}
          />
          <div className="shop-copy">
            <h3>Gift Card</h3>
            <p>Be a sweet angel &lt;3 — choose an amount for someone special</p>
            <div className="shop-row">
              <span className="shop-price">from $25</span>
              <span className="button primary small">Order</span>
            </div>
          </div>
        </Link>
      </div>
      <SiteFooter />
    </div>
  )
}

export default GiftCardsPage
