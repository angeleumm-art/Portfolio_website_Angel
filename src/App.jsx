import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'
import CartNavLink from './CartNavLink'
import SiteFooter from './SiteFooter'
import './App.css'

function App() {
  const gallery = [
    { image: '/images/cake-whimsy-lily.jpg', slug: 'whimsy-lily', name: 'Whimsy Lily' },
    {
      image: '/images/cake-vintage-raspberry.jpg',
      slug: 'vintage-raspberry',
      name: 'Vintage Raspberry',
    },
    { image: '/images/cake-spring-florals.jpg', slug: 'spring-florals', name: 'Spring Florals' },
    {
      image: '/images/cake-strawberry-matcha.jpg',
      slug: 'strawberry-matcha',
      name: 'Strawberry Matcha',
    },
    { image: '/images/cake-soft-chocolate.jpg', slug: 'soft-chocolate', name: 'Chocolate Baby' },
    {
      image: '/images/cake-raspberry-baby-chocolate.jpg',
      slug: 'raspberry-baby',
      name: 'Raspberry Baby',
    },
    {
      image: '/images/cake-strawberry-fields.jpg',
      slug: 'strawberry-fields',
      name: 'Strawberry Fields',
    },
    {
      image: '/images/cake-raspberry-fields.jpg',
      slug: 'raspberry-fields',
      name: 'Raspberry Fields',
    },
    {
      image: '/images/cake-spring-anthuriums.jpg',
      slug: 'spring-anthuriums',
      name: 'Spring Anthuriums',
    },
    { image: '/images/cake-orchids-cream.jpg', slug: 'pearl-princess', name: 'Pearl Princess' },
    {
      image: '/images/cake-black-orchids.jpg',
      slug: 'midnight-orchids',
      name: 'Midnight Orchids',
    },
    { image: '/images/cake-burgundy-figs.jpg', slug: 'burgundy-figs', name: 'Burgundy Figs' },
    { image: '/images/cake-pink-lily.jpg', slug: 'pink-lily', name: 'Pink Lily' },
    { image: '/images/cake-jellycat.jpg', slug: 'jellycat', name: 'Jellycat' },
    { image: '/images/cake-sweet-cherries.jpg', slug: 'sweet-cherries', name: 'Sweet Cherries' },
    { image: '/images/cake-ily.jpg', slug: 'ily', name: 'ILY' },
    { image: '/images/cake-vintage-love.jpg', slug: 'vintage-love', name: 'Vintage Love' },
    { image: '/images/cake-for-life.jpg', slug: 'for-life', name: 'For Life' },
    {
      image: '/images/cake-burgundy-bloom.jpg',
      slug: 'burgundy-bloom',
      name: 'Burgundy Bloom',
    },
    {
      image: '/images/cake-coquette-raspberry.jpg',
      slug: 'coquette-raspberry',
      name: 'Coquette Raspberry',
    },
    {
      image: '/images/cake-raspberry-cupcakes.jpg',
      slug: 'raspberry-cupcakes',
      name: 'Raspberry Cupcakes',
    },
    { image: '/images/cake-custom.jpg', slug: 'custom-cake', name: 'Custom Cake' },
    { image: '/images/cake-matchamisu.png', slug: 'matchamisu', name: 'Matchamisu' },
    { image: '/images/gallery-4.jpg', slug: 'tiramisu-cake', name: 'Tiramisu Cake' },
  ]

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

      <p className="brand-logo">Angelle Sucre</p>

      <section className="hero">
        <div className="hero-text">
          <div className="hero-photo-row">
            <Link to="/order" className="hero-photo-band">
              <img
                src="/images/picnic-angelle.png"
                alt="Angelle enjoying a matcha drink on a picnic blanket"
                className="hero-invite-image"
              />
              <img
                src="/images/picnic-cakes.png"
                alt="Angelle Sucre mini cakes on a picnic table with flowers"
                className="hero-invite-image"
              />
              <img
                src="/images/picnic-popup.png"
                alt="Two friends sharing Angelle Sucre cakes at a picnic"
                className="hero-invite-image"
              />
              <span className="hero-order-btn">Order Now</span>
            </Link>
          </div>
        </div>
      </section>

      <div className="page-lower">
      <div className="hero-actions">
        <a
          href="https://www.pinterest.com/angellesucre"
          className="button primary"
          target="_blank"
          rel="noreferrer"
        >
          Loved on Pinterest
        </a>
        <Link to="/order/custom-cake" className="button ghost">
          Start Custom Order
        </Link>
      </div>

      <section className="hero-collage" aria-label="Photo highlights">
        {gallery.slice(0, 4).map((item, index) => (
          <Link
            key={item.image}
            to={`/order/${item.slug}`}
            className={`pin pin-${index + 1} pin-link`}
            style={{ '--photo': `url(${item.image})` }}
            aria-label={`Order ${item.name}`}
          />
        ))}
      </section>

      <section className="story section about-page">
        <div className="about-copy">
          <h2>About Angelle Sucre</h2>
          <p>
            Angelle Sucre specializes in vintage floral soft cream cakes that blend aesthetic
            trends with French and Korean flavors. Angelle Sucre means Sweet Angel, and we hope
            to inspire others to &ldquo;be a sweet angel.&rdquo;
          </p>
          <p>
            My journey began with birthday cakes I baked for my family and
            friends toward the end of high school. That passion led me to decorate cakes
            at Paris Baguette and most recently completed my pastry internship at Jungsik,
            a three-Michelin-star restaurant in New York City. Through every step,
            I&apos;ve found the greatest joy in sharing my love for baking and creating
            meaningful moments for others through cakes. I&apos;m so grateful to SMU, the
            Dallas community, and everyone around the world for supporting this journey,
            and I can&apos;t wait to share what&apos;s next!
          </p>
          <p className="about-signoff">
            With love always,
            <br />
            Angelle &lt;3
            <br />
            <a
              className="about-handle"
              href="https://instagram.com/angelhhae"
              target="_blank"
              rel="noreferrer"
            >
              @angelhhae
            </a>
          </p>
        </div>

        <aside className="sweet-angel-cloud" aria-label="Be a sweet angel">
          <img
            src="/images/be-a-sweet-angel.png"
            alt="be a sweet angel"
            className="sweet-angel-image"
          />
        </aside>
      </section>

      <section id="gallery" className="section">
        <div className="section-title-row">
          <h2>Gallery</h2>
        </div>
        <div className="masonry">
          {gallery.map((item) => (
            <Link
              key={item.image}
              to={`/order/${item.slug}`}
              className="masonry-item masonry-item-link"
              style={{ '--photo': `url(${item.image})` }}
              aria-label={`Order ${item.name}`}
            />
          ))}
        </div>
      </section>
      </div>

      <section id="order" className="order section">
        <p className="brand-logo order-brand-logo">Angelle Sucre</p>
        <p>
          Add your cake to your cart, then send your order by email — we&apos;ll take it from
          there and make your celebration feel heavenly &lt;3.
        </p>
        <Link className="button primary" to="/order">
          Order Now
        </Link>
      </section>
      <SiteFooter />
    </div>
  )
}

export default App
