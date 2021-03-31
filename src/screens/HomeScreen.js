import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { fetchProducts } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import { CART_ADD_ITEM_RESET } from '../constants/cartConstants'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import Toast from '../utils/toast'

const HomeScreen = (props) => {
  console.log('HomeScreen render')
  const dispatch = useDispatch()

  const { loading, error, products } = useSelector(state => state.products)
  const { cartItems, addedItem } = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    if (addedItem) {
      dispatch({ type: CART_ADD_ITEM_RESET })
      Toast.fire({
        icon: 'success',
        title: '成功加入購物車中'
      })
    }
  }, [dispatch, addedItem])

  const onCartClickHandler = (product) => {
    const isExistInCart = cartItems.find(i => i.id === product.id)
    if (isExistInCart) {
      Toast.fire({
        icon: 'info',
        title: '此商品已存在於購物車中'
      })
    } else {
      const item = JSON.parse(JSON.stringify(product))
      item.quantity = 1
      dispatch(addToCart(item))
    }
  }

  const renderHomeScreen = () => {
    if (loading) return <Spinner />
    if (error) return <Message type="danger">{error}</Message>
    if (products) return (
      <>
        <section className="banner">
          <div className="container">
            {
              <Carousel showArrows autoPlay showThumbs={false} showStatus={false} infiniteLoop interval="2000" stopOnHover>
                {products.map(p => (
                  <div key={p.id}>
                    <Link to={`/products/${p.id}`} className="banner-link">
                      <img src={p.image} alt={p.name} className="banner-img" />
                      <p className="legend">{p.name}</p>
                    </Link>
                  </div>
                ))}
              </Carousel>
            }
          </div>
        </section>
        <section id="product-list">
          <div className="container">
            <div className="product-list-wrapper">
              {products.map(product => (
                <div key={product.id} className="card">
                  <Link to={`/products/${product.id}`} className="card-img-wrapper">
                    <img src={product.image} alt={product.name} className="card-img" />
                    <span className="card-img-title">{product.name}</span>
                  </Link>
                  <div className="card-product-info-wrapper">
                    <Link to={`/products/${product.id}`} className="card-product-title">{product.name}</Link>
                    <div className="card-product-price-row">
                      <span className="price">$ {product.price}</span>
                      <i
                        className="fas fa-cart-plus cart"
                        onClick={() => { onCartClickHandler(product) }}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }
  return (
    <>
      {renderHomeScreen()}
    </>
  )
}

export default HomeScreen