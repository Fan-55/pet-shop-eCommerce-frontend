import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../actions/userActions'

export default function Header(props) {
  console.log('Header render')
  const cartItems = useSelector(state => state.cartItems)
  const itemsCount = cartItems.reduce((a, c) => a + c.quantity, 0)
  const currentUser = useSelector(state => state.userLogin.currentUser)

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Link to="/" className="navbar-brand">毛小孩星球</Link>
      <input type="checkbox" className="navbar-toggle" id="navbar-toggle" />
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link className="nav-link" to="/cart">購物車 <strong>({itemsCount})</strong></Link>
          </li>
          <li className="nav-item">
            {currentUser ?
              <Link className="nav-link" to="/user/dashboard">Hi, {currentUser.name}</Link> :
              <Link className="nav-link" to="/login">會員登入</Link>
            }
          </li>
          {currentUser &&
            <li className="nav-item">
              <Link className="nav-link" to="#logout" onClick={logoutHandler}>登出</Link>
            </li>
          }

        </ul>
      </nav>
      <label htmlFor="navbar-toggle" className="navbar-toggle-label">
        <span className="hamburger"></span>
      </label>
    </header>
  )
}
