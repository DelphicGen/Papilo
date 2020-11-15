import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './tailwind.css'
import LoadingSpinner from './components/UI/LoadingSpinner'
import Footer from './components/UI/Footer'
import Navbar from './components/UI/Navbar'
import Flash from './components/UI/Flash'
import { useSelector } from 'react-redux'

const Login = React.lazy(() => import('./pages/auth/Login'))
const Register = React.lazy(() => import('./pages/auth/Register'))

const HomePage = React.lazy(() => import('./pages/customer/HomePage'))
const Cart = React.lazy(() => import('./pages/customer/Cart'))
const Checkout = React.lazy(() => import('./pages/customer/Checkout'))

const AddProduct = React.lazy(() => import('./pages/seller/AddProduct'))

const App = () => {

    const {role} = useSelector(state => state)

    let [routes, setRoutes] = useState((
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
          <Redirect to="/" />
        </Switch>
    ))

    useEffect(() => {
        if(!role) {
            setRoutes((
                <Switch>
                  <Route path="/" component={HomePage} exact />
                  <Route path="/register" component={Register} exact />
                  <Route path="/login" component={Login} exact />
                  <Redirect to="/" />
                </Switch>
            ))
        } else if(role === 'customer') {
            setRoutes((
                <Switch>
                    <Route path="/" component={HomePage} exact />
                    <Route path="/cart" component={Cart} exact />
                    <Route path="/checkout" component={Checkout} exact />
                    <Redirect to="/" />
                </Switch>
            ))
        } else if(role === 'seller') {
            setRoutes((
                <Switch>
                    <Route path="/" component={AddProduct} exact />
                </Switch>
            ))
        }
        
    }, [role])

    return (
        <Router>
            <Navbar />
            <Flash />
            <Suspense fallback={<LoadingSpinner style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />}>
                {routes}
            </Suspense>

            <Footer />
        </Router>
    )
}

export default App
