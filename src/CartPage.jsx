import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { buildCartEmailBody, useCart } from './CartContext'
import BrandMark from './BrandMark'
import CartNavLink from './CartNavLink'
import SiteFooter from './SiteFooter'
import {
  filterSlotsAfterNow,
  formatPickupSelection,
  getUpcomingPickupDates,
  getTimeSlotsForDate,
  toDateInputValue,
} from './pickupAvailability'
import './App.css'

function CartPage() {
  const { items, count, removeItem, clearCart } = useCart()
  const [pickupAgreed, setPickupAgreed] = useState(false)
  const upcomingDates = useMemo(() => getUpcomingPickupDates(30), [])
  const [pickupDate, setPickupDate] = useState(() =>
    upcomingDates[0] ? toDateInputValue(upcomingDates[0]) : '',
  )
  const [pickupTime, setPickupTime] = useState('')

  const selectedDate = useMemo(() => {
    if (!pickupDate) return null
    const [year, month, day] = pickupDate.split('-').map(Number)
    return new Date(year, month - 1, day)
  }, [pickupDate])

  const timeSlots = useMemo(() => {
    if (!selectedDate) return []
    return filterSlotsAfterNow(selectedDate, getTimeSlotsForDate(selectedDate))
  }, [selectedDate])

  useEffect(() => {
    if (!pickupTime) return
    if (!timeSlots.some((slot) => slot.value === pickupTime)) {
      setPickupTime('')
    }
  }, [pickupTime, timeSlots])

  const pickupLabel = formatPickupSelection(pickupDate, pickupTime)
  const canSend = Boolean(items.length && pickupAgreed && pickupDate && pickupTime)

  function sendAllOrders() {
    if (!canSend) return
    const subject = encodeURIComponent(
      count === 1 ? `Order inquiry: ${items[0].name}` : `Order inquiry: ${count} cakes`,
    )
    const body = encodeURIComponent(buildCartEmailBody(items, pickupLabel))
    window.location.href = `mailto:orders@angellesucre.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="site order-page">
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
        <h1>Cart</h1>
        <p>
          Review your cakes, then send one email with every order to
          orders@angellesucre.com.
        </p>
      </div>

      {items.length === 0 ? (
        <section className="section cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/order" className="button primary">
            Browse Cakes
          </Link>
        </section>
      ) : (
        <section className="section cart-list">
          {items.map((item) => (
            <article key={item.id} className="cart-item">
              <div
                className="cart-item-image"
                style={{ '--photo': `url(${item.image})` }}
                role="img"
                aria-label={item.name}
              />
              <div className="cart-item-copy">
                <h2>{item.name}</h2>
                <p>
                  {item.giftCard ? 'Amount' : 'Size'}: {item.sizeLabel} · {item.sizePrice}
                </p>
                {!item.giftCard ? (
                  <>
                    <p>Flavor: {item.flavor}</p>
                    {item.cream ? <p>Cake cream: {item.cream}</p> : null}
                    {item.filling ? (
                      <p>
                        {item.cream || !item.fillingLabel
                          ? 'Cake filling'
                          : item.fillingLabel}
                        : {item.filling}
                      </p>
                    ) : null}
                    <p>Nut allergy: {item.nutAllergy}</p>
                    {item.shape ? <p>Shape: {item.shape}</p> : null}
                  </>
                ) : null}
                <button
                  type="button"
                  className="small-link cart-remove"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}

          <div className="cart-pickup">
            <h2>Please select a date and time for your pickup:</h2>
            <p className="cart-pickup-address-note">
              The pickup address will be sent when we reach back to confirm your order.
            </p>
            <div className="cart-pickup-fields">
              <label className="cart-pickup-field">
                <span>Date</span>
                <select
                  value={pickupDate}
                  onChange={(event) => {
                    setPickupDate(event.target.value)
                    setPickupTime('')
                  }}
                >
                  <option value="">Pick a date</option>
                  {upcomingDates.map((date) => {
                    const value = toDateInputValue(date)
                    const label = date.toLocaleDateString(undefined, {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })
                    return (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    )
                  })}
                </select>
              </label>
              <label className="cart-pickup-field">
                <span>Time</span>
                <select
                  value={pickupTime}
                  onChange={(event) => setPickupTime(event.target.value)}
                  disabled={!timeSlots.length}
                >
                  <option value="">
                    {selectedDate ? 'Pick a slot' : 'Pick a date first'}
                  </option>
                  {timeSlots.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="cart-pickup-note">
              Please double check your selected pick up date before checking out and find
              our cancellation policy below.
            </p>
          </div>

          <label className="cart-agreement">
            <input
              type="checkbox"
              checked={pickupAgreed}
              onChange={(event) => setPickupAgreed(event.target.checked)}
            />
            <span>
              I agree to the descriptions on this site, arrive on time for pickup; late
              pickups incur a $5 fee per 15 minutes, with no refunds after the 15 minute
              period. Please communicate as soon as possible for any concerns!
            </span>
          </label>

          <div className="cart-actions">
            <button
              type="button"
              className="button primary"
              onClick={sendAllOrders}
              disabled={!canSend}
            >
              Send All Orders
            </button>
            <button type="button" className="button ghost" onClick={clearCart}>
              Clear Cart
            </button>
            <Link to="/order" className="button ghost">
              Add Another Cake
            </Link>
          </div>
          <p className="inquiry-hint">
            Opens one email to orders@angellesucre.com with every cake in your cart.
          </p>

          <p className="cart-cancellation-policy">
            Cancellations made at least 10 days prior to the scheduled fulfillment date are
            eligible for a 50% refund of the total order value; no refunds or cancellations
            are allowed within 10 days of the scheduled fulfillment date. Unfortunately, we
            are unable to store orders overnight.
          </p>
        </section>
      )}
      <SiteFooter />
    </div>
  )
}

export default CartPage
