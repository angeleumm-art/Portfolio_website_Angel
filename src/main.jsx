import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AboutPage from './AboutPage.jsx'
import OrderPage from './OrderPage.jsx'
import CakeCustomizePage from './CakeCustomizePage.jsx'
import CartPage from './CartPage.jsx'
import WeddingsPage from './WeddingsPage.jsx'
import MerchPage from './MerchPage.jsx'
import GiftCardsPage from './GiftCardsPage.jsx'
import FaqsPage from './FaqsPage.jsx'
import { CartProvider } from './CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/:slug" element={<CakeCustomizePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/weddings" element={<WeddingsPage />} />
          <Route path="/merch" element={<MerchPage />} />
          <Route path="/gift-cards" element={<GiftCardsPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
