import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'
import CartNavLink from './CartNavLink'
import SiteFooter from './SiteFooter'
import './App.css'

function MerchPage() {
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
        <h1>Merch</h1>
        <p>
          Limited Angelle Sucre merch coming soon! Follow @angellesucre on{' '}
          <a
            href="https://instagram.com/angellesucre"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>{' '}
          and{' '}
          <a
            href="https://www.tiktok.com/@angellesucre"
            target="_blank"
            rel="noreferrer"
          >
            Tiktok
          </a>{' '}
          for release dates &lt;3
        </p>
      </div>
      <SiteFooter />
    </div>
  )
}

export default MerchPage
