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
      return (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">訂單編號</th>
              <th>成立時間</th>
              <th>付款狀態</th>
              <th>付款方式</th>
              <th>運送狀態</th>
              <th>運送方式</th>
              <th>訂單金額</th>
              <th>明細</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => {
              const offset = 8 //hrs
              const createdAt = new Date(Date.parse(o.createdAt) + offset * 60 * 60 * 1000).toISOString().slice(0, 19).split('T').join(' ')
              return (
                <tr key={i}>
                  <td>{o.sn}</td>
                  <td>{createdAt}</td>
                  <td>{o.payment_method}</td>
                  <td>{o.payment_status ? '已付款' : '尚未付款'}</td>
                  <td>{o.delivery_method}</td>
                  <td>{o.delivery_status ? '已出貨' : '尚未出貨'}</td>
                  <td>${o.total}</td>
                  <td>
                    <Link to={{
                      pathname: `/orders/${o.id}`,
                      state: { from: props.location }
                    }}>
                      查看明細
                  </Link>
                  </td>
                  <td>{!o.payment_status && (
                    <button
                      className="btn btn-primary"
                      onClick={() => { deleteOrderHandler(o.id) }}
                    > 取消訂單</button>
                  )}</td>
                </tr>
              )
            })}
          </tbody>
        </table >
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
