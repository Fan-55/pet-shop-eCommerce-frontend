import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../actions/userActions'

const Header = (props) => {
  console.log('Header render')
  const cartItems = useSelector(state => state.cart.cartItems)
  const itemsCount = cartItems.reduce((a, c) => a + c.quantity, 0)
  const currentUser = useSelector(state => state.userLogin.currentUser)

  const [hamburger, setHamburger] = useState(false)

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  const Dropdown = () => {
    return (
      <div className="dropdown">
        <button className="btn btn-link dropdown-toggle nav-link" type="button" id="user-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
          Hi, {currentUser.name}
        </button>
        <ul className="dropdown-menu" aria-labelledby="user-dropdown">
          <li><Link className="nav-link" to="/orders" onClick={() => setHamburger(!hamburger)}>訂單</Link></li>
          <li><Link className="nav-link" to="#logout" onClick={() => {
            logoutHandler()
            setHamburger(!hamburger)
          }}>登出</Link></li>
        </ul>
      </div>
    )
  }

  return (
    <header>
      <Link to="/" className="navbar-brand">毛小孩商城</Link>
      <input
        type="checkbox"
        className="navbar-toggle"
        id="navbar-toggle"
        checked={hamburger}
      />
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              className="nav-link"
              onClick={() => setHamburger(!hamburger)}
              to={{
                pathname: '/cart',
                state: {
                  from: props.location
                }
              }}>
              購物車 <strong>({itemsCount})</strong>
            </Link>
          </li>
          <li className="nav-item">
            {currentUser ?
              <Dropdown /> :
              <Link
                className="nav-link"
                to={{
                  pathname: '/login',
                  state: { from: props.location }
                }}
                onClick={() => setHamburger(!hamburger)}
              >會員登入</Link>
            }
          </li>
        </ul>
      </nav>
      <label htmlFor="navbar-toggle" className="navbar-toggle-label" onClick={() => setHamburger(!hamburger)}>
        <span className="hamburger"></span>
      </label>
    </header>
  )
}

export default Header