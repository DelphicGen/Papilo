import React, { useState, useEffect, useCallback } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeRole, clearCart } from '../../actions/action'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Anchors = props => {

    const dispatch = useDispatch();
    const {role} = useSelector(state => state)
    const [anchors, setAnchors] = useState((
        <>
            <Link to="/login" >Login</Link>
            <Link to="/register" >Register</Link>
        </>
    ))

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        dispatch(clearCart())
        dispatch(removeRole())
    }, [dispatch])

    useEffect(() => {
        if(!role) {
            setAnchors((
                <>
                    <Link to="/login" className="mr-5" >Login</Link>
                    <Link to="/register" >Register</Link>
                </>
            ))
        } else if(role === 'customer') {
            setAnchors((
                <>
                    <Link to="/cart">
                        <ShoppingCartIcon className="mr-5" fontSize="large" />
                    </Link>
                    <Link to="/topup" className="mr-5">
                        Topup
                    </Link>
                    <Link to="/edit/profile">
                        <AccountCircleIcon className="mr-5" fontSize="large" />
                    </Link>
                    <button onClick={logout}>Logout</button>
                </>
            ))
        } else if(role === 'seller') {
            setAnchors((
                <>
                    <Link className="mr-5" to="/list">Your Products</Link>
                    <Link to="/edit/profile">
                        <AccountCircleIcon className="mr-5" fontSize="large" />
                    </Link>
                    <button onClick={logout}>Logout</button>
                </>
            ))
        } else if(role === 'transportCompany') {
            setAnchors((
                <>
                    <Link to="/edit/profile">
                        <AccountCircleIcon className="mr-5" fontSize="large" />
                    </Link>
                    <button onClick={logout}>Logout</button>
                </>
            ))
        }
    }, [logout, role])

    return (
        <>
            {anchors}
        </>
    )
}

export default Anchors
