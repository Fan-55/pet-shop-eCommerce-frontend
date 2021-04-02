import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import { CART_ACTION_RESET } from '../constants/cartConstants'

const Counter = ({ qty, item }) => {
  console.log('Counter Render')

  const [count, setCount] = useState(qty)

  const dispatch = useDispatch()
  const increment = () => {
    setCount(count + 1)
    item.quantity = count + 1
    dispatch(addToCart(item))
    dispatch({ type: CART_ACTION_RESET })
  }
  const decrement = () => {
    if (count <= 1) return
    setCount(count - 1)
    item.quantity = count - 1
    dispatch(addToCart(item))
    dispatch({ type: CART_ACTION_RESET })
  }
  const onChangeHandler = (e) => {
    // ^[1-9]\d*$ is regExp of positive integer. Ex. 1, 2, ...
    if (/^[1-9]\d*$/.test(e.target.value)) {
      setCount(Number(e.target.value))
      item.quantity = Number(e.target.value)
      dispatch(addToCart(item))
      dispatch({ type: CART_ACTION_RESET })

    } else {
      setCount('')
      item.quantity = 1
      dispatch(addToCart(item))
      dispatch({ type: CART_ACTION_RESET })
    }
  }

  return (
    <div className="counter">
      <i className="fas fa-minus minus" onClick={decrement}></i>
      <input
        type="text"
        value={count}
        className="qty"
        onChange={onChangeHandler}
      />
      <i className="fas fa-plus plus" onClick={increment}></i>
    </div>
  )
}

export default Counter