import React, { useState, useEffect } from 'react'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useSelector } from 'react-redux'

const Product = props => {

    const {cart, role} = useSelector(state => state)
    const [inCart, setInCart] = useState(false)

    useEffect(() => {
        
        const product = cart.filter(product => product.id === props.id)

        if(product.length > 0) setInCart(true)
        else setInCart(false)

    }, [cart, props.id])

    return (
        <div className="overflow-hidden border-2 border-red-700 rounded-lg shadow-lg">
            <div className="relative">
                <img style={{width: '100%', height: '250px'}} className="object-cover object-center" src={props.image} alt={props.name} />
                {
                    role === 'customer' && (
                        <button className="absolute right-0 bottom-0 cursor-pointer rounded-tl-lg text-white bg-red-700 p-2 focus:outline-none" onClick={props.onCartButtonClicked}>
                            {
                                inCart ? 'In Cart' :
                                <ShoppingCartIcon />
                            }
                        </button>
                    )
                }
            </div>

            <div className="py-1 px-2 border-t-2 border-red-700 flex items-center justify-between flex-wrap bg-red-700 text-white">
                <h3 className="font-bold text-lg">{props.name}</h3>
                <h4>Rp. {props.price}</h4>
            </div>
        </div>
    )
}

export default Product