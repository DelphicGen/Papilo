import React, { useState, useEffect } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useSelector } from 'react-redux'

const Product = props => {

    const {cart} = useSelector(state => state)
    const [inCart, setInCart] = useState(false)

    useEffect(() => {
        
        const product = cart.filter(product => product.id === props.id)

        if(product.length > 0) setInCart(true)
        else setInCart(false)

    }, [cart, props.id])

    return (
        <div>
            <div className="relative">
                <img style={{width: '100%', height: '250px'}} className="object-cover object-center" src={props.image} alt={props.name} />
                <button className="absolute right-0 bottom-0 cursor-pointer rounded-tl-lg text-white bg-gray-800 p-2" onClick={props.onCartButtonClicked}>
                    {
                        inCart ? 'In Cart' :
                        <ShoppingCartIcon />
                    }
                </button>
            </div>

            <h3 className="font-bold text-lg">{props.name}</h3>
            <h4 className="text-red-700">Rp. {props.price}</h4>
        </div>
    )
}

export default Product