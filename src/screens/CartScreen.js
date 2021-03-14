import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import Toast from '../utils/toast'
import Counter from '../components/Counter'
import { removeFromCart } from '../actions/cartActions'

export default function CartScreen(props) {
  console.log('CartScreen render')
  const cartItems = useSelector(state => state.cartItems)
  const dispatch = useDispatch()
  const onDeleteCartItemHandler = async (itemId) => {
    const result = await Swal.fire({
      title: '確認刪除此商品?',
      showDenyButton: true,
      showConfirmButton: true,
      denyButtonText: '取消',
      confirmButtonText: '刪除'
    })
    if (result.isConfirmed) {
      dispatch(removeFromCart(itemId))
      Toast.fire({
        title: '成功刪除',
        icon: 'success'
      })
    }
  }

  const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  const shippingPrice = 80
  const total = subtotal + shippingPrice

  return (
    <div>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} className="cart-item-list">
            <div className="cart-list-img-wrapper">
              <img src={item.image} alt={item.name} />
            </div>
            <Link to={`/products/${item.id}`} className="card-list-title">{item.name}</Link>
            <div className="card-list-price">$ {item.price}</div>
            <Counter qty={item.quantity} item={item} />
            <div className="cart-item-delete">
              <i
                className="far fa-trash-alt"
                onClick={() => { onDeleteCartItemHandler(item.id) }}
              ></i>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-checkout">
        <div className="price-subtotal">小記: {subtotal}</div>
        <div className="price-shipping">運費: {shippingPrice}</div>
        <div className="price-total">總計: {total}</div>
        <Link to="/login?redirect=shipping">
          <button type="button">買單</button>
        </Link>
      </div>
    </div>
  )
}
