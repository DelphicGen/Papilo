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
const EditProfile = React.lazy(() => import('./pages/auth/EditProfile'))

const HomePage = React.lazy(() => import('./pages/customer/HomePage'))
const Cart = React.lazy(() => import('./pages/customer/Cart'))
const Checkout = React.lazy(() => import('./pages/customer/Checkout'))

const Orders = React.lazy(() => import('./pages/seller/Orders'))
const ProductList = React.lazy(() => import('./pages/seller/ProductList'))
const AddProduct = React.lazy(() => import('./pages/seller/AddProduct'))
const EditProduct = React.lazy(() => import('./pages/seller/EditProduct'))

const Transshipment = React.lazy(() => import('./pages/transport/Transshipment'))

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
                    <Route path="/edit/profile" component={EditProfile} exact />
                    <Redirect to="/" />
                </Switch>
            ))
        } else if(role === 'seller') {
            setRoutes((
                <Switch>
                    <Route path="/" component={Orders} exact />
                    <Route path="/list" component={ProductList} exact />
                    <Route path="/add" component={AddProduct} exact />
                    <Route path="/edit" component={EditProduct} exact />
                    <Route path="/edit/profile" component={EditProfile} exact />
                </Switch>
            ))
        } else if(role === 'transportCompany') {
            setRoutes((
                <Switch>
                    <Route path="/" component={Transshipment} exact />
                    <Route path="/edit/profile" component={EditProfile} exact />
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
