import React, { useState, useEffect } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Anchors = () => {
    const {role} = useSelector(state => state)
    const [anchors, setAnchors] = useState((
        <>
            <Link to="/login" >Login</Link>
            <Link to="/register" >Register</Link>
        </>
    ))

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
                        <ShoppingCartIcon fontSize="large" />
                    </Link>
                </>
            ))
        }
    }, [role])

    return (
        <>
            {anchors}
        </>
    )
}

export default Anchors
