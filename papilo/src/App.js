import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './tailwind.css'
import LoadingSpinner from './components/UI/LoadingSpinner'
import Footer from './components/UI/Footer'
import Navbar from './components/UI/Navbar'

const HomePage = React.lazy(() => import('./pages/HomePage'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Cart = React.lazy(() => import('./pages/Cart'))
const Checkout = React.lazy(() => import('./pages/Checkout'))

const App = () => {
    let routes = (
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/cart" component={Cart} exact />
          <Route path="/checkout" component={Checkout} exact />
          <Redirect to="/" />
        </Switch>
    )

    return (
        <Router>
            <Navbar />
            
            <Suspense fallback={<LoadingSpinner style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}>
                {routes}
            </Suspense>

            <Footer />
        </Router>
    )
}

export default App
