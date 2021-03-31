import { BrowserRouter, Route } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import HomeScreen from './screens/HomeScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import CartScreen from './screens/CartScreen'
import Header from './components/Header'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import CheckoutScreen from './screens/CheckoutScreen'
import OrderDetailsScreen from './screens/OrderDetailsScreen'
import OrderListScreen from './screens/OrderListScreen'

export default function App() {
  console.log('App render')
  return (
    <>
      <BrowserRouter>
        <Route path="/" component={Header} />
        <main>
          <Route path="/" exact component={HomeScreen} />
          <Route path="/products/:id" exact component={ProductDetailsScreen} />
          <Route path="/register" exact component={RegisterScreen} />
          <Route path="/login" exact component={LoginScreen} />
          <Route path="/cart" exact component={CartScreen} />
          <PrivateRoute path="/checkout" exact component={CheckoutScreen} />
          <PrivateRoute path="/orders" exact component={OrderListScreen} />
          <PrivateRoute path="/orders/:id" exact component={OrderDetailsScreen} />
        </main>
      </BrowserRouter>

      <footer>
        <p>毛小孩商城 &copy; 2021 </p>
      </footer>

    </>
  )
}