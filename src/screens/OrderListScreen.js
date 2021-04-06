import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

import { fetchOrders, deleteOrder } from '../actions/orderAction'
import { ORDER_DELETE_RESET } from '../constants/orderConstants'
import Toast from '../utils/toast'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

const OrderListScreen = (props) => {
  console.log('OrderList render')
  const { loading, orders, error } = useSelector(state => state.orders)
  const { loading: deleteOrderLoading, success: deleteOrderSuccess, error: deleteOrderError } = useSelector(state => state.deleteOrder)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  useEffect(() => {
    if (deleteOrderSuccess) {
      dispatch({ type: ORDER_DELETE_RESET })
      dispatch(fetchOrders())
      Toast.fire({
        title: '成功取消訂單',
        icon: 'success'
      })
    }
  }, [dispatch, deleteOrderSuccess])

  const deleteOrderHandler = async (orderId) => {
    const result = await Swal.fire({
      title: '確認取消此筆訂單?',
      showDenyButton: true,
      showConfirmButton: true,
      denyButtonText: '返回',
      confirmButtonText: '確認'
    })
    if (result.isConfirmed) {
      dispatch(deleteOrder(orderId))
    }
  }

  const renderOrderList = () => {
    if (loading || deleteOrderLoading) return <Spinner />
    if (error || deleteOrderError) return <Message type="danger">{error}</Message>
    if (orders) {
      if (!orders.length) return <Message type="info" dismiss={false}>沒有訂單 <Link to="/">去選購</Link></Message>
      return (
        <section id="order-list" className="order-list">
          {orders.map((o, i) => {
            const offset = 8 //hrs
            const createdAt = new Date(Date.parse(o.createdAt) + offset * 60 * 60 * 1000).toISOString().slice(0, 19).split('T').join(' ')
            return (
              <div key={i} className="order-item">
                <div className="item">
                  <span className="item-title">訂單編號</span>
                  <div className="item-value-wrapper">
                    <Link
                      to={{
                        pathname: `/orders/${o.id}`,
                        state: { from: props.location }
                      }}
                      className="item-value"
                    >{o.sn}</Link>
                    <span>(點擊查看明細)</span>
                  </div>
                </div>

                <div className="item">
                  <span className="item-title">成立時間</span>
                  <div className="item-value-wrapper">
                    <span className="item-value">{createdAt}</span>
                  </div>
                </div>

                <div className="item">
                  <span className="item-title">付款方式</span>
                  <div className="item-value-wrapper">
                    <span className="item-value">{o.payment_method}</span>
                  </div>
                </div>

                <div className="item">
                  <span className="item-title">付款狀態</span>
                  <div className="item-value-wrapper">
                    <span className="item-value">{o.payment_status ? '已付款' : '尚未付款'}</span>
                  </div>
                </div>

                <div className="item">
                  <span className="item-title">運送方式</span>
                  <div className="item-value-wrapper">
                    <span className="item-value">{o.delivery_method}</span>
                  </div>
                </div>

                <div className="item">
                  <span className="item-title">運送狀態</span>
                  <div className="item-value-wrapper">
                    <span className="item-value">{o.delivery_status ? '已出貨' : '尚未出貨'}</span>
                  </div>
                </div>

                <div className="item">
                  <span className="item-title">訂單金額</span>
                  <div className="item-value-wrapper">
                    <span className="item-value">${o.total}</span>
                  </div>
                </div>

                <div className="item">
                  <span className="item-title">操作</span>
                  <div className="item-value-wrapper">
                    <span className="item-value">{!o.payment_status && (
                      <button
                        className="btn btn-link"
                        onClick={() => { deleteOrderHandler(o.id) }}
                      > 取消訂單</button>
                    )}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </section >
      )
    }
  }

  return (
    <div className="container">
      {renderOrderList()}
    </div>
  )
}

export default OrderListScreen
