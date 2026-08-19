import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'angelle-sucre-cart'

function readStoredCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      addItem(item) {
        setItems((prev) => [
          ...prev,
          {
            ...item,
            id: `${item.slug}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          },
        ])
      },
      removeItem(id) {
        setItems((prev) => prev.filter((item) => item.id !== id))
      },
      clearCart() {
        setItems([])
      },
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function buildCartEmailBody(items, pickupSlot = '') {
  const blocks = items.map((item, index) => {
    if (item.giftCard) {
      return [
        `--- Item ${index + 1}: ${item.name} ---`,
        `Gift Card Amount: ${item.sizeLabel} (${item.sizePrice})`,
      ].join('\n')
    }

    const lines = [
      `--- Cake ${index + 1}: ${item.name} ---`,
      `Cake Size: ${item.sizeLabel} (${item.sizePrice})`,
      `Cake Flavor: ${item.flavor}`,
    ]
    if (item.cream) {
      lines.push(`Cake Cream: ${item.cream}`)
    }
    if (item.filling) {
      const fillingLabel =
        item.cream || !item.fillingLabel ? 'Cake Filling' : item.fillingLabel
      lines.push(`${fillingLabel}: ${item.filling}`)
    }
    lines.push(`Nut Allergy: ${item.nutAllergy}`)
    if (item.shape) {
      lines.push(`Cake Shape: ${item.shape}`)
    }
    return lines.join('\n')
  })

  return [
    `Hi Angelle,`,
    ``,
    `I would like to place the following order${items.length > 1 ? 's' : ''}:`,
    ``,
    ...blocks.flatMap((block, index) => (index === 0 ? [block] : [``, block])),
    ``,
    `Desired pickup date & time: ${pickupSlot || ''}`,
    `Additional notes:`,
    `Instagram/Phone # (Both Required):`,
    ``,
    `Pickup Agreement:`,
    `I agree to the descriptions on this site, arrive on time for pickup; late pickups incur a $5 fee per 15 minutes, with no refunds after the 15 minute period. Please communicate as soon as possible for any concerns!`,
  ].join('\n')
}
