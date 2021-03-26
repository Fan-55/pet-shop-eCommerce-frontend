import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { createOrder } from '../actions/orderAction'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import Message from '../components/Message'
import Spinner from '../components/Spinner'

const CheckoutScreen = (props) => {
  console.log('CheckoutScreen render')
  const [recipient, setRecipient] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  useEffect(() => {
    if (!recipient && touched.recipient) {
      setErrors(prevErrors => ({ ...prevErrors, recipient: '請輸入收件人姓名欄位' }))
    } else {
      setErrors(prevErrors => ({ ...prevErrors, recipient: null }))
    }
  }, [recipient, touched.recipient])

  useEffect(() => {
    if (!phone && touched.phone) {
      setErrors(prevErrors => ({ ...prevErrors, phone: '請輸入收件人電話欄位' }))
    } else {
      setErrors(prevErrors => ({ ...prevErrors, phone: null }))
    }
  }, [phone, touched.phone])

  useEffect(() => {
    if (!address && touched.address) {
      setErrors(prevErrors => ({ ...prevErrors, address: '請輸入收件地址欄位' }))
    } else {
      setErrors(prevErrors => ({ ...prevErrors, address: null }))
    }
  }, [address, touched.address])

  useEffect(() => {
    if (!deliveryMethod && touched.deliveryMethod) {
      setErrors(prevErrors => ({ ...prevErrors, deliveryMethod: '請選擇運送方式' }))
    } else {
      setErrors(prevErrors => ({ ...prevErrors, deliveryMethod: null }))
    }
  }, [deliveryMethod, touched.deliveryMethod])

  useEffect(() => {
    if (!paymentMethod && touched.paymentMethod) {
      setErrors(prevErrors => ({ ...prevErrors, paymentMethod: '請選擇付款方式' }))
    } else {
      setErrors(prevErrors => ({ ...prevErrors, paymentMethod: null }))
    }
  }, [paymentMethod, touched.paymentMethod])

  const dispatch = useDispatch()
  const onSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    if (!recipient) errors.recipient = '請輸入收件人姓名欄位'
    if (!phone) errors.phone = '請輸入收件人電話欄位'
    if (!address) errors.address = '請輸入收件地址欄位'
    if (!deliveryMethod) errors.deliveryMethod = '請選擇運送方式'
    if (!paymentMethod) errors.paymentMethod = '請選擇付款方式'
    if (Object.keys(errors).length) {
      setErrors(errors)
    } else {
      dispatch(createOrder({ recipient, phone, address, deliveryMethod, paymentMethod, cartItems }))
    }
  }

  const cartItems = useSelector(state => state.cartItems)
  const { loading, order, error: apiError } = useSelector(state => state.createOrder)

  useEffect(() => {
    if (order) {
      dispatch({ type: ORDER_CREATE_RESET })
      props.history.push(`/orders/${order.id}`)
    } else if (apiError && typeof apiError === 'object') {
      if (Object.keys(apiError).length) {
        setErrors(apiError)
      }
    }
  }, [apiError, order, dispatch, props.history])

  const renderApiError = () => {
    if (typeof apiError === 'string') {
      return <Message type="danger">{apiError}</Message>
    }
  }

  return (
    <div>
      {loading && <Spinner />}
      {!cartItems.length ? (<Message type="danger"><Link to="/">請加入商品至購物車</Link></Message>) : (
        <div className="container">
          {renderApiError()}
          <section id="cart-items">
            <h1>訂單商品</h1>
            <ul>
              {cartItems.map(item => (
                <li key={item.id} className="cart-item-list">
                  <div className="cart-list-img-wrapper">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <Link to={`/products/${item.id}`} className="card-list-title">{item.name}</Link>
                  <div className="card-list-price">$ {item.price}</div>
                  <div className="card-list-quantity">$ {item.quantity}</div>
                  <div className="card-list-subtotal">$ {item.quantity * item.price}</div>
                </li>
              ))}
            </ul>
          </section>

          <section id="checkout-details">
            <form onSubmit={onSubmit}>
              <div className="delivery-details">
                <h1>運送資訊</h1>
                <span>*必填欄位</span>
                <div className="mb-3">
                  <label className="form-label" htmlFor="recipient">*收件人姓名</label>
                  <input
                    className={`form-control${errors.recipient ? ' is-invalid' : ''}`}
                    type="text"
                    id="recipient"
                    placeholder="請輸入收件人姓名"
                    onChange={(e) => setRecipient(e.target.value)}
                    onBlur={(e) => setTouched({ ...touched, recipient: true })}
                    value={recipient}
                  />
                  <div className="invalid-feedback">
                    {errors.recipient}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="phone">*收件人電話</label>
                  <input
                    className={`form-control${errors.phone ? ' is-invalid' : ''}`}
                    type="text"
                    id="phone"
                    placeholder="請輸入收件人電話"
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={(e) => setTouched({ ...touched, phone: true })}
                    value={phone}
                  />
                  <div className="invalid-feedback">
                    {errors.phone}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="address">*收件地址</label>
                  <input
                    className={`form-control${errors.address ? ' is-invalid' : ''}`}
                    type="text"
                    id="address"
                    placeholder="請輸入收件地址"
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={(e) => setTouched({ ...touched, address: true })}
                    value={address}
                  />
                  <div className="invalid-feedback">
                    {errors.address}
                  </div>
                </div>
                <div className="delivery-method">
                  <div className="form-check">
                    <input
                      className={`form-check-input${errors.deliveryMethod ? ' is-invalid' : ''}`}
                      type="radio"
                      name="delivery-method"
                      id="delivery-method1"
                      value="宅配到府"
                      onChange={e => {
                        setDeliveryMethod(e.target.value)
                        setTouched({ ...touched, deliveryMethod: true })
                      }}
                    />
                    <label className="form-check-label" htmlFor="delivery-method1">宅配到府</label>
                  </div>
                  <div className="form-check">
                    <input
                      className={`form-check-input${errors.deliveryMethod ? ' is-invalid' : ''}`}
                      type="radio"
                      name="delivery-method"
                      id="delivery-method2"
                      value="超商取貨"
                      onChange={e => {
                        setDeliveryMethod(e.target.value)
                        setTouched({ ...touched, deliveryMethod: true })
                      }}
                      disabled
                    />
                    <label className="form-check-label" htmlFor="delivery-method2">
                      超商取貨(尚未開放)
              </label>
                  </div>
                  <div className="invalid-feedback" style={{ display: 'block' }}>
                    {errors.deliveryMethod}
                  </div>
                </div>
              </div>
              <div className="payment-details">
                <h1>付款方式</h1>
                <div className="payment-method">
                  <div className="form-check">
                    <input
                      className={`form-check-input${errors.paymentMethod ? ' is-invalid' : ''}`}
                      type="radio"
                      name="payment-method"
                      id="payment-method1"
                      value="信用卡"
                      onChange={e => {
                        setPaymentMethod(e.target.value)
                        setTouched({ ...touched, paymentMethod: true })
                      }}
                    />
                    <label className="form-check-label" htmlFor="payment-method1">信用卡</label>
                  </div>
                  <div className="invalid-feedback" style={{ display: 'block' }}>
                    {errors.paymentMethod}
                  </div>
                </div>
              </div>
              <button type="submit">下一步</button>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default CheckoutScreen