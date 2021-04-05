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

  const cartItems = useSelector(state => state.cart.cartItems)
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
  const itemCount = cartItems.reduce((a, c) => a + c.quantity, 0)
  const subtotal = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

  return (
    <div>
      {loading && <Spinner />}
      {!cartItems.length ? (<Message type="danger"><Link to="/">請加入商品至購物車</Link></Message>) : (
        <div className="container checkout">
          {renderApiError()}
          <section id="cart-items" className="cart-items">
            <h4 className="cart-section-title">訂單商品</h4>
            <div className="cart-header checkout">
              <span className="cart-img"></span>
              <span className="cart-title">商品</span>
              <span className="cart-price">單價</span>
              <span className="cart-counter">數量</span>
              <span className="cart-subtotal">總計</span>
            </div>
            {
              cartItems.map(i => (
                <div key={i.id} className="cart-item checkout">
                  <img
                    className="cart-item-img"
                    src={i.image}
                    alt={i.name}
                  />
                  <span className="cart-item-title">{i.name}</span>
                  <span className="cart-item-price">${i.price}</span>
                  <div className="cart-item-qty-wrapper">
                    <span className="cart-item-qty-title">數量: </span>
                    <span className="cart-item-quantity">{i.quantity}</span>
                  </div>
                  <div className="cart-item-subtotal-wrapper">
                    <span className="cart-item-subtotal-title">總計: </span>
                    <span className="cart-item-subtotal">${i.price * i.quantity}</span>
                  </div>
                </div>
              ))
            }
            <div className="cart-summary-subtotal checkout">
              <span>總金額({itemCount}項商品):</span>
              <span className="subtotal-price">${subtotal}</span>
            </div>
          </section>

          <form onSubmit={onSubmit} className="checkout-details-form">
            <div id="delivery-details" className="delivery-details">
              <h4 className="delivery-section-title">運送資訊</h4>
              <div className="delivery-details-wrapper">
                <span className="form-hint">*必填欄位</span>
                <div className="mb-3">
                  <label className="form-label" htmlFor="recipient">*收件人姓名</label>
                  <input
                    className={`form-control${errors.recipient ? ' is-invalid' : ''} name`}
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
                    className={`form-control${errors.phone ? ' is-invalid' : ''} phone`}
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
                  <textarea
                    className={`form-control${errors.address ? ' is-invalid' : ''} address`}
                    type="text"
                    id="address"
                    placeholder="請輸入收件地址"
                    onChange={(e) => setAddress(e.target.value)}
                    onBlur={(e) => setTouched({ ...touched, address: true })}
                    value={address}
                    rows="3"
                  />
                  <div className="invalid-feedback">
                    {errors.address}
                  </div>
                </div>
                <div className="delivery-method">
                  <span className="delivery-method-title">*運送方式:</span>
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
            </div>
            <div id="payment-details" className="payment-details">
              <h4 className="payment-section-title">付款方式</h4>
              <div className="payment-details-wrapper">
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
            </div>
            <button type="submit" className="btn default-btn checkout-btn">下訂單</button>
          </form>
        </div>
      )
      }
    </div >
  )
}

export default CheckoutScreen