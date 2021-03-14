import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToCart } from '../actions/cartActions'
import { fetchProductDetails } from '../actions/productActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import Toast from '../utils/toast'

export default function ProductDetailsScreen(props) {
  console.log('ProductDetailsScreen render')
  const productId = props.match.params.id
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProductDetails(productId))
  }, [dispatch, productId])

  const { loading, error, product } = useSelector(state => state.productDetails)
  const cartItems = useSelector(state => state.cartItems)
  const [count, setCount] = useState(1)
  const increment = () => setCount(count + 1)
  const decrement = () => {
    if (count <= 1) return
    setCount(count - 1)
  }
  const onCartClickHandler = () => {
    const existedItem = cartItems.find(i => i.id === product.id)
    const item = JSON.parse(JSON.stringify(product))
    item.quantity = existedItem ? (existedItem.quantity + count) : count
    dispatch(addToCart(item))
    Toast.fire({
      icon: 'success',
      title: `成功加入${count}項此商品至購物車`
    })
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
              <Link to="/">回到首頁</Link>
              <div className="product-details-wrapper">
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="product-info-wrapper">
                  <span className="product-brand">{product.Brand.name}</span>
                  <h4 className="product-title">{product.name}</h4>
                  <p className="product-description">{product.description}</p>
                  <div className="product-price-wrapper">
                    <span className="product-price">$ {product.price}</span>
                    <div className="product-counter">
                      <button onClick={decrement}><i className="fas fa-minus"></i></button>
                      <span>{count}</span>
                      <button onClick={increment}><i className="fas fa-plus"></i></button>
                      <button type="button" onClick={onCartClickHandler}>加入購物車</button>
                    </div>
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