import { Link } from 'react-router-dom'
import { useCart } from './CartContext'

function CartNavLink() {
  const { count } = useCart()
  return (
    <Link to="/cart" className="small-link cart-top-link">
      Cart{count > 0 ? ` (${count})` : ''}
    </Link>
  )
}

export default CartNavLink
