import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import BrandMark from './BrandMark'
import CartNavLink from './CartNavLink'
import SiteFooter from './SiteFooter'
import './App.css'

const EVENT_PHOTOS = [
  {
    id: 'popup-crew',
    src: '/images/popup-spring-crew.jpg',
    label: 'The Angelle Sucre team at the spring pop-up',
  },
  {
    id: 'popup-guest',
    src: '/images/popup-spring-guest.jpg',
    label: 'A guest with a strawberry matcha',
  },
  {
    id: 'popup-serving',
    src: '/images/popup-spring-serving.jpg',
    label: 'Serving matcha at the pop-up',
  },
  {
    id: 'popup-matcha-bar',
    src: '/images/popup-spring-matcha-bar.jpg',
    label: 'The matcha bar, set with fresh ranunculus',
  },
  {
    id: 'popup-cake-drink',
    src: '/images/popup-spring-cake-drink.jpg',
    label: 'A fig and chamomile mini cake with a lemon matcha',
  },
  {
    id: 'popup-lemon-matcha',
    src: '/images/popup-spring-lemon-matcha.jpg',
    label: 'Honey lemon matcha',
  },
]

function AboutPage() {
  const [reelPlaying, setReelPlaying] = useState(false)
  const reelRef = useRef(null)

  function playReel() {
    setReelPlaying(true)
    const video = reelRef.current
    if (!video) return
    video.play().catch(() => {
      // user can still use native controls
    })
  }

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

      <section id="about" className="story section about-page">
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

      <div className="page-lower about-founder-band">
        <section className="section about-video-section" aria-label="Event highlight">
          <div className="about-video-column">
            <div className={`about-reel${reelPlaying ? ' is-playing' : ''}`}>
              <video
                ref={reelRef}
                className="about-highlight-video"
                src="/videos/about-highlight.MOV"
                poster="/images/about-reel-cover.png"
                controls={reelPlaying}
                playsInline
                preload="none"
                onEnded={() => setReelPlaying(false)}
                onPause={(event) => {
                  if (event.currentTarget.currentTime === 0) {
                    setReelPlaying(false)
                  }
                }}
              >
                Your browser does not support the video tag.
              </video>
              {!reelPlaying && (
                <>
                  <img
                    className="about-reel-cover"
                    src="/images/about-reel-cover.png"
                    alt="Angelle at a picnic with matcha and yellow tulips"
                  />
                  <button
                    type="button"
                    className="about-reel-play"
                    onClick={playReel}
                    aria-label="Play video"
                  >
                    <span className="about-reel-play-icon" aria-hidden="true">
                      <svg viewBox="0 0 64 64" className="about-reel-heart">
                        <path
                          className="about-reel-heart-fill"
                          d="M32 56S8 40 8 22.5C8 14.5 14 9 21.5 9c4.6 0 8.1 2.3 10.5 5.8C34.4 11.3 37.9 9 42.5 9 50 9 56 14.5 56 22.5 56 40 32 56 32 56Z"
                        />
                        <path
                          className="about-reel-heart-play"
                          d="M28 24.5v15l13-7.5-13-7.5Z"
                        />
                      </svg>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="about-video-copy">
            <p className="about-video-caption">The Founder, Angelle</p>
            <p className="about-video-sub">born and raised in Dallas, TX</p>
            <p className="about-video-note">
              Watch Angelle make her favorite &ldquo;honey honey&rdquo; matcha for her
              upcoming pop up in May 2026!
            </p>
            <div className="about-follow">
              <p className="about-follow-label">FOLLOW OUR JOURNEY ON</p>
              <div className="about-follow-social" aria-label="Social media">
                <a
                  href="https://instagram.com/angellesucre"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram @angellesucre"
                  className="about-follow-link"
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
                    <circle
                      cx="12"
                      cy="12"
                      r="4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@angellesucre"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok @angellesucre"
                  className="about-follow-link"
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
                  className="about-follow-link"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6.1 9.1-.1-.8-.2-2 0-2.9.2-.8 1.3-5.4 1.3-5.4s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.3-4.5-4.3-3.1 0-4.9 2.3-4.9 4.7 0 .9.4 1.9.8 2.4.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.3.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2.1-1.3 2.8 1 .3 2 .5 3.1.5 5.5 0 10-4.5 10-10S17.5 2 12 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section id="past-events" className="section past-events">
        <div className="section-title-row">
          <h2>A Sweet Spring with Angelle Sucre</h2>
          <p className="section-caption">Photos from May 2026 event</p>
        </div>

        <div className="event-grid">
          {EVENT_PHOTOS.map((photo) => (
            <article key={photo.id} className="event-card">
              <img src={photo.src} alt={photo.label || 'Past event'} />
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  )
}

export default AboutPage
