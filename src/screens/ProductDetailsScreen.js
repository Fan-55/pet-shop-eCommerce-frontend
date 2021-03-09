import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProductDetails } from '../actions/productActions'
import Spinner from '../components/Spinner'
import Message from '../components/Message'
import Counter from '../components/Counter'

export default function ProductDetailsScreen(props) {
  const productId = props.match.params.id
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProductDetails(productId))
  }, [dispatch, productId])

  const { loading, error, product } = useSelector(state => state.productDetails)

  return (
    <>
      {loading ? <Spinner /> : error ? <Message type="danger">{error}</Message> : (
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
                    <Counter />
                    <button type="button">加入購物車</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
