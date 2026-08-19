import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { getCakeBySlug } from './cakes'
import { useCart } from './CartContext'
import BrandMark from './BrandMark'
import CartNavLink from './CartNavLink'
import SiteFooter from './SiteFooter'
import './App.css'

const SIZES = [
  { label: '6"', price: '$110' },
  { label: '8"', price: '$120' },
]
const FLAVORS = [
  'Vanilla',
  'Matcha (+$10)',
]
const FILLINGS = [
  'Soft Cream',
  'Strawberries +$5',
  'Raspberries +$5',
  'Mixed Berries (strawberries, raspberries, & blueberries) +$5',
  'Nutella +$5',
]
const CAKE_CREAMS = [
  'Soft Cream',
  'Strawberry Soft Cream',
  'Nutella Soft Cream',
  'Chocolate Soft Cream',
  'Pistachio Soft Cream',
  'Classic Sweet Cream',
]
const CAKE_CREAM_SLUGS = new Set(['raspberry-cupcakes'])
const SHAPES = ['Round', 'Heart']

function CakeCustomizePage() {
  const { slug } = useParams()
  const cake = getCakeBySlug(slug)
  const navigate = useNavigate()
  const { addItem } = useCart()

  const [size, setSize] = useState('6"')
  const [flavor, setFlavor] = useState(FLAVORS[0])
  const [cream, setCream] = useState(CAKE_CREAMS[0])
  const [filling, setFilling] = useState(FILLINGS[0])
  const [nutAllergy, setNutAllergy] = useState('No')
  const [shape, setShape] = useState('Round')
  const [addedNote, setAddedNote] = useState('')
  const [activePhoto, setActivePhoto] = useState(0)

  useEffect(() => {
    setActivePhoto(0)
  }, [slug])

  const sizes = cake?.sizes?.length ? cake.sizes : SIZES
  const isGiftCard = Boolean(cake?.giftCard)
  const flavors = isGiftCard
    ? []
    : cake?.flavors?.length
      ? cake.flavors
      : FLAVORS
  const usesCakeCreamOnly = Boolean(cake && CAKE_CREAM_SLUGS.has(cake.slug))
  const creamOptions = cake?.creams?.length
    ? cake.creams
    : usesCakeCreamOnly
      ? cake?.fillings?.length
        ? cake.fillings
        : CAKE_CREAMS
      : []
  const fillingOptions = isGiftCard || usesCakeCreamOnly
    ? []
    : Array.isArray(cake?.fillings)
      ? cake.fillings
      : FILLINGS
  const photos =
    cake?.images?.length > 0
      ? cake.images
      : cake?.image
        ? [cake.image]
        : []
  const selectedPhoto = photos[Math.min(activePhoto, photos.length - 1)] || cake?.image
  const selectedPhotoCaption = Array.isArray(cake?.photoCaptions)
    ? cake.photoCaptions[Math.min(activePhoto, cake.photoCaptions.length - 1)]
    : cake?.photoCaption
  const selectedSize = sizes.find((option) => option.label === size) || sizes[0]
  const shapes = cake?.shapesBySize?.[selectedSize.label]
    ? cake.shapesBySize[selectedSize.label]
    : Array.isArray(cake?.shapes)
      ? cake.shapes
      : SHAPES
  const selectedFlavor = flavors.includes(flavor) ? flavor : flavors[0]
  const selectedCream = creamOptions.includes(cream) ? cream : creamOptions[0]
  const selectedFilling = fillingOptions.includes(filling)
    ? filling
    : fillingOptions[0]
  const selectedShape = shapes.includes(shape) ? shape : shapes[0]

  function addToCart(event) {
    event.preventDefault()
    if (!cake) return
    addItem({
      slug: cake.slug,
      name: cake.name,
      image: cake.image,
      giftCard: isGiftCard,
      sizeLabel: selectedSize.label,
      sizePrice: selectedSize.price,
      flavor: isGiftCard ? null : selectedFlavor,
      cream: isGiftCard || !creamOptions.length ? null : selectedCream,
      filling: isGiftCard || !fillingOptions.length ? null : selectedFilling,
      nutAllergy: isGiftCard ? null : nutAllergy,
      shape: isGiftCard ? null : selectedShape || null,
    })
    setAddedNote(`${cake.name} added to cart.`)
    navigate('/cart')
  }

  if (!cake) {
    return <Navigate to="/order" replace />
  }

  if (cake.eventsOnly) {
    return <Navigate to="/weddings" replace />
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

      <div className="cake-customize">
        <div className="cake-customize-media">
          <div
            className="cake-customize-photo"
            style={{ '--photo': `url(${selectedPhoto})` }}
            role="img"
            aria-label={cake.name}
          >
            {'photoCaption' in cake || Array.isArray(cake.photoCaptions) ? (
              selectedPhotoCaption ? (
                <span className="cake-photo-caption">{selectedPhotoCaption}</span>
              ) : null
            ) : (
              <span className="cake-photo-caption">
                Cake in photo shown is a 6&quot; heart
              </span>
            )}
          </div>
          {photos.length > 1 ? (
            <div className="cake-photo-thumbs" role="group" aria-label="Cake photos">
              {photos.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  className={`cake-photo-thumb${index === activePhoto ? ' is-active' : ''}`}
                  style={{ '--photo': `url(${photo})` }}
                  aria-label={`Show photo ${index + 1}`}
                  aria-pressed={index === activePhoto}
                  onClick={() => setActivePhoto(index)}
                />
              ))}
            </div>
          ) : null}
          {cake.otherLooks?.length ? (
            <section className="other-looks" aria-label={cake.otherLooksTitle || 'Other looks'}>
              <h2>{cake.otherLooksTitle || 'Other looks'}</h2>
              <div className="other-looks-grid">
                {cake.otherLooks.map((look, index) => {
                  const src = typeof look === 'string' ? look : look.src
                  const caption = typeof look === 'string' ? '' : look.caption
                  return (
                    <figure key={src} className="other-looks-item">
                      <div
                        className="other-looks-card"
                        style={{ '--photo': `url(${src})` }}
                        role="img"
                        aria-label={
                          caption || `${cake.otherLooksTitle || 'Look'} ${index + 1}`
                        }
                      />
                      {caption ? (
                        <figcaption className="other-looks-caption">{caption}</figcaption>
                      ) : null}
                    </figure>
                  )
                })}
              </div>
            </section>
          ) : null}
        </div>

        <div className="cake-customize-panel">
          <p className="eyebrow">{selectedSize.price}</p>
          <h1 className="cake-title-lora">{cake.name}</h1>
          <p className="cake-customize-detail">{cake.detail}</p>
          {cake.note ? <p className="cake-customize-note">{cake.note}</p> : null}

          <form className="cake-options" onSubmit={addToCart}>
            <fieldset>
              <legend>{isGiftCard ? 'Gift Card Amount' : 'Cake Size'}</legend>
              <div className="option-row">
                {sizes.map((option) => (
                  <label key={option.label} className="option-chip">
                    <input
                      type="radio"
                      name="size"
                      value={option.label}
                      checked={selectedSize.label === option.label}
                      onChange={() => setSize(option.label)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              <p className="size-price-note">
                {selectedSize.note ||
                  (isGiftCard
                    ? `Gift card amount: ${selectedSize.price}`
                    : `${selectedSize.label} starts at ${selectedSize.price}`)}
              </p>
            </fieldset>

            {!isGiftCard ? (
              <>
                <label className="option-select">
                  Cake Flavor
                  <select
                    value={selectedFlavor}
                    onChange={(event) => setFlavor(event.target.value)}
                  >
                    {flavors.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                {creamOptions.length > 0 ? (
                  <label className="option-select">
                    Cake Cream
                    <select
                      value={selectedCream}
                      onChange={(event) => setCream(event.target.value)}
                    >
                      {creamOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}

                {fillingOptions.length > 0 ? (
                  <label className="option-select">
                    Cake Filling
                    <select
                      value={selectedFilling}
                      onChange={(event) => setFilling(event.target.value)}
                    >
                      {fillingOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}

                <fieldset>
                  <legend>Nut Allergy</legend>
                  <div className="option-row">
                    {['Yes', 'No'].map((option) => (
                      <label key={option} className="option-chip">
                        <input
                          type="radio"
                          name="nutAllergy"
                          value={option}
                          checked={nutAllergy === option}
                          onChange={() => setNutAllergy(option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {shapes.length > 0 ? (
                  <fieldset>
                    <legend>Cake Shape</legend>
                    <div className="option-row">
                      {shapes.map((option) => (
                        <label key={option} className="option-chip">
                          <input
                            type="radio"
                            name="shape"
                            value={option}
                            checked={selectedShape === option}
                            onChange={() => setShape(option)}
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ) : null}
              </>
            ) : null}

            <button type="submit" className="button primary">
              Add To Cart
            </button>
            {addedNote ? <p className="inquiry-status">{addedNote}</p> : null}
            <p className="inquiry-hint">
              Add items to your cart, then send every order together by email.
            </p>
            {!isGiftCard ? (
              <>
                {cake?.floral ? (
                  <p className="order-timing-note">
                    Florals are seasonal and subject to availability; if unavailable, similar
                    florals will be substituted to complement the requested color scheme :)
                  </p>
                ) : null}
                <div className="cake-care">
                  <h2>Cake Care</h2>
                  <p>
                    <span className="cake-care-label">Storage:</span> Keep refrigerated if
                    not serving within 1–2 hours of pickup. For buttercream cakes, bring to
                    room temperature 1½ hours before serving. Soft cream cakes should remain
                    refrigerated until shortly before serving. Keep away from heat, direct
                    sunlight, and strong-smelling foods.
                  </p>
                  <p>
                    <span className="cake-care-label">Floral Cakes:</span> Flowers are not
                    edible. Fresh flowers are placed in water-filled pipettes beneath the cream
                    to keep them fresh. Remove all flowers and pipettes before cutting and
                    serving.
                  </p>
                  <p>
                    <span className="cake-care-label">Transportation:</span> Keep on a flat,
                    stable surface with the A/C on during warm weather. For tiered cakes, place
                    on the floor behind the passenger seat. Drive slowly and avoid sudden stops,
                    sharp turns, and bumps.
                  </p>
                  <p>
                    <span className="cake-care-label">Freshness:</span> For best quality, enjoy
                    as close to pickup as possible. Cakes can be refrigerated for up to 36 hours
                    after pickup.
                  </p>
                </div>
              </>
            ) : null}
          </form>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

export default CakeCustomizePage
