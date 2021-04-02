import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import Toast from '../utils/toast'
import Counter from '../components/Counter'
import { removeFromCart } from '../actions/cartActions'
import { CART_ACTION_RESET } from '../constants/cartConstants'
import Message from '../components/Message'

const CartScreen = (props) => {
  console.log('CartScreen render')
  const { cartItems, actionSuccess } = useSelector(state => state.cart)
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
    }
  }

  useEffect(() => {
    if (actionSuccess) {
      dispatch({ type: CART_ACTION_RESET })
      Toast.fire({
        title: '成功刪除',
        icon: 'success'
      })
    }
  }, [dispatch, actionSuccess])



  const renderCartScreen = () => {
    if (!cartItems.length) {
      return (
        <Message type="info">購物車內沒有商品 <Link to="/">去選購</Link></Message>
      )
    }
    const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    const itemCount = cartItems.reduce((a, c) => a + c.quantity, 0)
    return (
      <section id="cart">
        <div className="container">
          <Link
            to={{
              pathname: props.location.state ? props.location.state.from.pathname : '/'
            }}
            className="nav-back-link"
          >回到上一頁</Link>
          <div className="cart-list-wrapper">
            <div className="cart-header">
              <span className="cart-img"></span>
              <span className="cart-title">商品</span>
              <span className="cart-price">單價</span>
              <span className="cart-counter">數量</span>
              <span className="cart-subtotal">總計</span>
              <span className="cart-action">操作</span>
            </div>
            {
              cartItems.map(i => (
                <div key={i.id} className="cart-item">
                  <img
                    className="cart-item-img"
                    src={i.image}
                    alt={i.name}
                  />
                  <Link
                    className="cart-item-title"
                    to={`/products/${i.id}`}
                  >{i.name}</Link>
                  <span className="cart-item-price">${i.price}</span>
                  <Counter item={i} qty={i.quantity} />
                  <span className="cart-item-subtotal">${i.price * i.quantity}</span>
                  <div className="cart-item-action">
                    <button
                      className="cart-item-delete-btn btn-link btn"
                      onClick={() => onDeleteCartItemHandler(i.id)}
                    >刪除</button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="order-placement">
            <div className="cart-summary-subtotal">
              <span>總金額({itemCount}項商品):</span>
              <span className="subtotal-price">${subtotal}</span>
            </div>
            <Link to="/checkout" className="place-order-link">
              <button className="place-order-btn">去買單</button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      {renderCartScreen()}
    </>
  )
}

export default CartScreen