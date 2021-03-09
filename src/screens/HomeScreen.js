import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { fetchProducts } from '../actions/productActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

export default function HomeScreen(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const { loading, error, products } = useSelector(state => state.products)

  return (
    <>
      {loading ? <Spinner /> : error ? <Message type="danger">{error}</Message> : (
        <>
          <section className="banner">
            <div className="container">
              {
                <Carousel showArrows autoPlay showThumbs={false} showStatus={false} infiniteLoop interval="2000" stopOnHover={false}>
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
                  <div to={`/products/${product.id}`} key={product.id} className="card">
                    <Link to={`/products/${product.id}`} className="card-img-wrapper">
                      <img src={product.image} alt={product.name} className="card-img" />
                      <h4 className="card-img-title">{product.name}</h4>
                    </Link>
                    <div className="card-product-info-wrapper">
                      <Link to={`/products/${product.id}`} className="card-product-title">{product.name}</Link>
                      <div className="card-product-price-row">
                        <span className="price">$ {product.price}</span>
                        <i className="fas fa-cart-plus cart"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
