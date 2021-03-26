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

      return (
        <div className="container">
          <section id="order-items-details">
            <h3>訂單商品</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">編號</th>
                  <th scope="col">商品</th>
                  <th scope="col"></th>
                  <th scope="col">單價</th>
                  <th scope="col">數量</th>
                  <th scope="col">小記</th>
                </tr>
              </thead>
              <tbody>
                {order.orderContent.OrderItems.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <div className="cart-list-img-wrapper">
                        <img src={item.Product.image} alt={item.Product.name} />
                      </div>
                    </td>
                    <td>{item.Product.name}</td>
                    <td>$ {item.price}</td>
                    <td>{item.quantity}</td>
                    <td>$ {item.quantity * item.price}</td>
                  </tr>))}
                <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>商品總計</td>
                  <td>${order.orderContent.subtotal}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section id="order-delivery-details">
            <h3>運送資訊</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">收件人姓名</th>
                  <td>{order.orderContent.recipient}</td>
                </tr>
                <tr>
                  <th scope="row">收件地址</th>
                  <td>{order.orderContent.address}</td>
                </tr>
                <tr>
                  <th scope="row">收件人電話</th>
                  <td>{order.orderContent.phone}</td>
                </tr>
                <tr>
                  <th scope="row">運送方式</th>
                  <td>{order.orderContent.delivery_method}</td>
                </tr>
                <tr>
                  <th scope="row">運送狀態</th>
                  <td>{order.orderContent.delivery_status ? '已出貨' : '尚未出貨'}</td>
                </tr>
                <tr>
                  <th scope="row">出貨時間</th>
                  <td>{order.orderContent.delivered_at ? order.orderContent.delivered_at : '尚未出貨'}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section id="order-payment-details">
            <h3>付款資訊</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">付款方式</th>
                  <td>{order.orderContent.payment_method}</td>
                </tr>
                <tr>
                  <th scope="row">付款狀態</th>
                  <td>{order.orderContent.payment_status ? '已付款' : '尚未付款'}</td>
                </tr>
                <tr>
                  <th scope="row">付款時間</th>
                  <td>{local_paid_at ? local_paid_at : '尚未付款'}</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section id="order-checkout">
            <h3>訂單金額</h3>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">商品總計</th>
                  <td>$ {order.orderContent.subtotal}</td>
                </tr>
                <tr>
                  <th scope="row">運費</th>
                  <td>$ {order.orderContent.delivery_fee}</td>
                </tr>
                <tr>
                  <th scope="row">訂單總計</th>
                  <td>$ {order.orderContent.total}</td>
                </tr>
              </tbody>
            </table>
            {order.tradeInfo && (
              <div className="checkout-pay-form">
                <form name="Newebpay" method="post" action={order.tradeInfo.PayGateWay}>
                  <input type="hidden" name="MerchantID" value={order.tradeInfo.MerchantID} />
                  <input type="hidden" name="TradeInfo" value={order.tradeInfo.TradeInfo} />
                  <input type="hidden" name="TradeSha" value={order.tradeInfo.TradeSha} />
                  <input type="hidden" name="Version" value={order.tradeInfo.Version} />
                  <button type="submit" className="btn btn-primary">付款去</button>
                </form>
              </div>
            )}
          </section>
        </div>
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