import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToCart } from '../actions/cartActions'
import { fetchProductDetails } from '../actions/productActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import Toast from '../utils/toast'
import { CART_ACTION_RESET } from '../constants/cartConstants'

export default function ProductDetailsScreen(props) {
  console.log('ProductDetailsScreen render')
  const productId = props.match.params.id
  const { loading, error, product } = useSelector(state => state.productDetails)
  const { cartItems, actionSuccess } = useSelector(state => state.cart)
  const [count, setCount] = useState(1)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProductDetails(productId))
  }, [dispatch, productId])

  useEffect(() => {
    if (actionSuccess) {
      dispatch({ type: CART_ACTION_RESET })
      Toast.fire({
        icon: 'success',
        title: `成功加入購物車`
      })
    }
  }, [dispatch, actionSuccess])


  const increment = () => setCount(count + 1)
  const decrement = () => {
    if (count <= 1) return
    setCount(count - 1)
  }
  const onChangeHandler = (e) => {
    // ^[1-9]\d*$ is regExp of positive integer. Ex. 1, 2, ...
    if (/^[1-9]\d*$/.test(e.target.value)) {
      setCount(Number(e.target.value))
    } else {
      setCount('')
    }
  }
  const onCartClickHandler = () => {
    let quantity = 1
    if (count !== '') {
      quantity = count
    }
    const isExistInCart = cartItems.find(i => i.id === product.id)
    const item = JSON.parse(JSON.stringify(product))
    item.quantity = isExistInCart ? (isExistInCart.quantity + quantity) : quantity
    dispatch(addToCart(item))
    setCount(1)
  }

  const renderProductDetails = () => {
    if (loading) {
      return <Spinner />
    } else if (error) {
      return <Message type="danger">{error}</Message>
    } else {
      return (
        <>
          <section id="product-details">
            <div className="container">
              <Link to="/" className="nav-back-link">回到首頁</Link>
              <div className="product-details-wrapper">
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.name} className="product-img" />
                </div>
                <div className="product-info-wrapper">
                  <span className="product-brand">{product.Brand.name}</span>
                  <h4 className="product-title">{product.name}</h4>
                  <p className="product-description">{product.description}</p>
                </div>
                <div className="product-summary-wrapper">
                  <span className="product-price">$ {product.price}</span>
                  <div className="product-action">
                    <div className="counter product-details-counter">
                      <span>數量</span>
                      <i className="fas fa-minus minus" onClick={decrement}></i>
                      <input
                        type="text"
                        value={count}
                        className="qty"
                        onChange={onChangeHandler}
                      />
                      <i className="fas fa-plus plus" onClick={increment}></i>
                    </div>
                    <button onClick={onCartClickHandler} className="add-to-cart-btn btn default-btn">加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )
    }
  }
  return renderProductDetails()
}