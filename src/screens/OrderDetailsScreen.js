import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchOrderDetails } from '../actions/orderAction'
import Message from '../components/Message'
import Spinner from '../components/Spinner'

const OrderDetailsScreen = (props) => {
  console.log('OrderDetailsScreen render')
  const orderId = props.match.params.id

  const { loading, order, error } = useSelector(state => state.orderDetails)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrderDetails(orderId))
  }, [dispatch, orderId])

  const render = () => {
    if (loading) return <Spinner />
    if (error) return <Message type="danger"> {error}</Message >
    if (order) {
      const offset = 8 //hrs
      const local_paid_at = order.orderContent.paid_at ? new Date(Date.parse(order.orderContent.paid_at) + offset * 60 * 60 * 1000).toISOString().slice(0, 19).split('T').join(' ') : null

      const itemCount = order.orderContent.OrderItems.reduce((a, c) => a + c.quantity, 0)
      const subtotal = order.orderContent.OrderItems.reduce((a, c) => a + c.price * c.quantity, 0)

      return (
        <div className="container order">
          <section id="order-checkout" className="payment-details order-checkout">
            <h4 className="payment-section-title">付款資訊</h4>
            <div className="order-checkout-details-wrapper">
              <div className="row">
                <span className="col-4">付款方式</span>
                <span className="col">{order.orderContent.payment_method}</span>
              </div>
              <div className="row">
                <span className="col-4">付款狀態</span>
                <span className={`col payment-status ${order.orderContent.payment_status ? 'true' : ''}`}>{order.orderContent.payment_status ? '已付款' : '尚未付款'}</span>
              </div>
              <div className="row">
                <span className="col-4">付款時間</span>
                <span className="col">{local_paid_at ? local_paid_at : '尚未付款'}</span>
              </div>
              <div className="row">
                <span className="col-4">商品總計</span>
                <span className="col">$ {order.orderContent.subtotal}</span>
              </div>
              <div className="row">
                <span className="col-4">運費</span>
                <span className="col">$ {order.orderContent.delivery_fee}</span>
              </div>
              <div className="row">
                <span className="col-4">訂單總計</span>
                <span className="col order-total">$ {order.orderContent.total}</span>
              </div>
            </div>
            {order.tradeInfo && (
              <div className="checkout-pay-form">
                <form name="Newebpay" method="post" action={order.tradeInfo.PayGateWay}>
                  <input type="hidden" name="MerchantID" value={order.tradeInfo.MerchantID} />
                  <input type="hidden" name="TradeInfo" value={order.tradeInfo.TradeInfo} />
                  <input type="hidden" name="TradeSha" value={order.tradeInfo.TradeSha} />
                  <input type="hidden" name="Version" value={order.tradeInfo.Version} />
                  <button type="submit" className="btn default-btn payment-btn">付款去</button>
                </form>
              </div>
            )}
          </section>
          <section id="order-items-details" className="cart-items">
            <h4 className="cart-section-title">訂單商品</h4>
            <div className="cart-header checkout">
              <span className="cart-img"></span>
              <span className="cart-title">商品</span>
              <span className="cart-price">單價</span>
              <span className="cart-counter">數量</span>
              <span className="cart-subtotal">總計</span>
            </div>
            {order.orderContent.OrderItems.map(i => (
              <div key={i.id} className="cart-item checkout">
                <img
                  className="cart-item-img"
                  src={i.Product.image}
                  alt={i.Product.name}
                />
                <span className="cart-item-title">{i.Product.name}</span>
                <span className="cart-item-price">${i.price}</span>
                <div className="cart-item-qty-wrapper">
                  <span className="cart-item-qty-title">數量: </span>
                  <span className="cart-item-quantity">{i.quantity}</span>
                </div>
                <div className="cart-item-subtotal-wrapper">
                  <span className="cart-item-subtotal-title">總計: </span>
                  <span className="cart-item-subtotal">${i.price * i.quantity}</span>
                </div>
              </div>))}

            <div className="cart-summary-subtotal checkout">
              <span>總金額({itemCount}項商品):</span>
              <span className="subtotal-price">${subtotal}</span>
            </div>

          </section>
          <section id="order-delivery-details" className="delivery-details">
            <h4 className="delivery-section-title">運送資訊</h4>
            <div className="order-delivery-details-wrapper">
              <div className="row">
                <span className="col-4">收件人姓名</span>
                <span className="col">{order.orderContent.recipient}</span>
              </div>
              <div className="row">
                <span className="col-4">收件地址</span>
                <span className="col">{order.orderContent.address}</span>
              </div>
              <div className="row">
                <span className="col-4">收件人電話</span>
                <span className="col">{order.orderContent.phone}</span>
              </div>
              <div className="row">
                <span className="col-4">運送方式</span>
                <span className="col">{order.orderContent.delivery_method}</span>
              </div>
              <div className="row">
                <span className="col-4">運送狀態</span>
                <span className="col">{order.orderContent.delivery_status ? '已出貨' : '尚未出貨'}</span>
              </div>
              <div className="row">
                <span className="col-4">出貨時間</span>
                <span className="col">{order.orderContent.delivered_at ? order.orderContent.delivered_at : '尚未出貨'}</span>
              </div>
            </div>
          </section>


        </div >
      )
    }
  }

  return (
    <>
      {render()}
    </>
  )
}

export default OrderDetailsScreen