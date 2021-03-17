import { BrowserRouter, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ProductDetailsScreen from './screens/ProductDetailsScreen'
import CartScreen from './screens/CartScreen'
import Header from './components/Header'
import LoginScreen from './screens/LoginScreen'

export default function App() {
  console.log('App render')
  return (
    <div>
      <BrowserRouter>
        <Route path="/" component={Header}></Route>
        <main>
          <Route path="/products/:id" exact component={ProductDetailsScreen}></Route>
          <Route path="/cart" exact component={CartScreen}></Route>
          <Route path="/login" exact component={LoginScreen}></Route>
          <Route path="/" exact component={HomeScreen}></Route>
        </main>
      </BrowserRouter>

      <footer>
        <p>毛小孩星球 &copy; 2020 </p>
      </footer>

    </div>
  )
}