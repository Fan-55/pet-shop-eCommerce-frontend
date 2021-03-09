import { Link, BrowserRouter, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <header>
          <Link to="/" className="navbar-brand">毛小孩星球</Link>
          <input type="checkbox" className="navbar-toggle" id="navbar-toggle" />
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link className="nav-link" to="/cart">購物車</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">會員登入</Link>
              </li>
            </ul>
          </nav>
          <label htmlFor="navbar-toggle" className="navbar-toggle-label">
            <span className="hamburger"></span>
          </label>
        </header>
        <main>
          <Route path="/products/:id" exact component={ProductDetailsScreen}></Route>
          <Route path="/" exact component={HomeScreen}></Route>
        </main>
      </BrowserRouter>

      <footer>
        <p>毛小孩星球 &copy; 2020 </p>
      </footer>

    </div>
  )
}