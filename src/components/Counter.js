import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'

export default function Counter({ qty, item }) {
  console.log('Counter Render')

  const dispatch = useDispatch()
  const increment = () => {
    item.quantity++
    dispatch(addToCart(item))
  }
  const decrement = () => {
    if (item.quantity <= 1) return
    item.quantity--
    dispatch(addToCart(item))
  }

  return (
    <div className="counter">
      <button onClick={decrement}>
        <i className="fas fa-minus"></i>
      </button>
      <span className="qty">{qty}</span>
      <button onClick={increment}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  )
}