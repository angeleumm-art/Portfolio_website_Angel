import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { cakes } from './cakes'
import BrandMark from './BrandMark'
import CartNavLink from './CartNavLink'
import SiteFooter from './SiteFooter'
import './App.css'

const HIDDEN_ORDER_SLUGS = new Set(['soft-cream-cake', 'floral-cake', 'vintage-cake'])

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'soft-cream', label: 'Soft Cream' },
  { value: 'classic', label: 'Classic Sweet Cream' },
  { value: 'floral', label: 'Floral' },
  { value: 'fruit', label: 'Fruit' },
  { value: 'matcha', label: 'Matcha' },
  { value: 'cupcakes', label: 'Cupcakes' },
  { value: 'gift-cards', label: 'Gift Cards' },
]

const SORTS = [
  { value: 'best-sellers', label: 'Best Sellers' },
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'name-desc', label: 'Name Z–A' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
]

function getCakeCategories(cake) {
  const detail = (cake.detail || '').toLowerCase()
  const name = (cake.name || '').toLowerCase()
  const categories = new Set()

  if (cake.giftCard || cake.slug === 'gift-card') categories.add('gift-cards')
  if (cake.eventsOnly) categories.add('events')
  if (name.includes('cupcake') || detail.includes('cupcake')) categories.add('cupcakes')
  if (name.includes('matcha') || detail.includes('matcha')) categories.add('matcha')
  if (
    name.includes('strawberry') ||
    name.includes('raspberry') ||
    name.includes('cherry') ||
    name.includes('fig') ||
    detail.includes('strawberry') ||
    detail.includes('raspberry') ||
    detail.includes('cherry') ||
    detail.includes('fig') ||
    detail.includes('berry') ||
    detail.includes('fruit') ||
    detail.includes('grape')
  ) {
    categories.add('fruit')
  }
  if (detail.includes('classic sweet cream') || name.includes('vintage')) {
    categories.add('classic')
  } else if (detail.includes('soft cream') || detail.includes('soft sponge')) {
    categories.add('soft-cream')
  }
  if (
    detail.includes('floral') ||
    detail.includes('flower') ||
    detail.includes('lily') ||
    detail.includes('orchid') ||
    detail.includes('anthurium') ||
    detail.includes('tulip') ||
    detail.includes('carnation') ||
    detail.includes('chamomile') ||
    detail.includes('bloom') ||
    name.includes('floral') ||
    name.includes('lily') ||
    name.includes('orchids')
  ) {
    categories.add('floral')
  }

  return categories
}

function parsePrice(cake) {
  const match = String(cake.price || '').match(/(\d+)/)
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY
}

function bestSellerSortName(cake) {
  // Swap these two in Best Sellers order
  if (cake.slug === 'strawberry-matcha') return 'Whimsy Lily'
  if (cake.slug === 'whimsy-lily') return 'Strawberry Matcha'
  return cake.name
}

function OrderPage() {
  const [filter, setFilter] = useState('all')
  const [sort, setSort] = useState('best-sellers')

  const visibleCakes = useMemo(() => {
    const base = cakes.filter((cake) => !HIDDEN_ORDER_SLUGS.has(cake.slug))

    const filtered =
      filter === 'all'
        ? base
        : base.filter((cake) => getCakeCategories(cake).has(filter))

    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'best-sellers') {
        const aBest = a.bestSeller ? 0 : 1
        const bBest = b.bestSeller ? 0 : 1
        if (aBest !== bBest) return aBest - bBest
        if (a.bestSeller && b.bestSeller) {
          const aLast = a.bestSellerLast ? 1 : 0
          const bLast = b.bestSellerLast ? 1 : 0
          if (aLast !== bLast) return aLast - bLast
        }
        return bestSellerSortName(a).localeCompare(bestSellerSortName(b), undefined, {
          sensitivity: 'base',
        })
      }
      if (sort === 'name-asc') {
        return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      }
      if (sort === 'name-desc') {
        return b.name.localeCompare(a.name, undefined, { sensitivity: 'base' })
      }
      if (sort === 'price-asc') {
        return parsePrice(a) - parsePrice(b)
      }
      if (sort === 'price-desc') {
        return parsePrice(b) - parsePrice(a)
      }
      return 0
    })

    // Keep gift card at the end unless filtering to gift cards only
    if (filter !== 'gift-cards') {
      const gifts = sorted.filter((cake) => cake.slug === 'gift-card')
      const rest = sorted.filter((cake) => cake.slug !== 'gift-card')
      return [...rest, ...gifts]
    }

    return sorted
  }, [filter, sort])

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

      <p className="brand-logo">Angelle Sucre</p>

      <div className="shop-intro">
        <h1 className="cake-title-lora">Order Now</h1>
      </div>

      <div className="shop-controls">
        <label className="shop-control">
          Filter
          <select value={filter} onChange={(event) => setFilter(event.target.value)}>
            {FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="shop-control">
          Sort by
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visibleCakes.length === 0 ? (
        <p className="shop-empty">No cakes match this filter.</p>
      ) : (
        <div className="shop-grid">
          {visibleCakes.map((cake) => {
            const isEventsOnly = Boolean(cake.eventsOnly)
            const card = (
              <>
                <div className="shop-image" style={{ '--photo': `url(${cake.image})` }}>
                  {cake.bestSeller ? (
                    <span className="best-seller-tab">Best Seller</span>
                  ) : null}
                </div>
                <div className="shop-copy">
                  <h3>{cake.name}</h3>
                  <p>{cake.detail}</p>
                  {cake.note ? <p className="shop-inspo-note">{cake.note}</p> : null}
                  <div className="shop-row">
                    <span className="shop-price">{cake.price}</span>
                    {isEventsOnly ? (
                      <span className="shop-note">only available for events</span>
                    ) : (
                      <span className="button primary small">Order</span>
                    )}
                  </div>
                </div>
              </>
            )

            if (isEventsOnly) {
              return (
                <Link key={cake.slug} to="/weddings" className="shop-card shop-card-link">
                  {card}
                </Link>
              )
            }

            return (
              <Link
                key={cake.slug}
                to={`/order/${cake.slug}`}
                className="shop-card shop-card-link"
                aria-label={`Order ${cake.name}`}
              >
                {card}
              </Link>
            )
          })}
        </div>
      )}
      <SiteFooter />
    </div>
  )
}

export default OrderPage
