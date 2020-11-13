import React, { useEffect, useState } from 'react'
import Container from '../components/UI/Container'
import CustomTable from '../components/UI/CustomTable'
import { clearCart } from '../actions/action'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../components/UI/Button'
import { Link } from 'react-router-dom'
import Header from '../components/UI/Header'

const Cart = () => {

    const {cart} = useSelector(state => state)
    const dispatch = useDispatch()
    const columns = ['Products', 'Name', 'Price', 'Quantity', 'Remove', 'Total']
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        let temp = 0;

        cart?.forEach(product => {
            temp += product.price * product.count
        })

        setTotalPrice(temp)
        localStorage.setItem('totalPrice', temp)

    }, [cart])

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}}>
                <Header heading="Cart" className="text-right" />
                <CustomTable columns={columns} rows={cart} />
                <div className="mt-10 block w-fit-content ml-auto">
                    <h3 className="font-bold text-lg md:text-xl">Total: Rp. {totalPrice}</h3>
                    <Link to="/checkout">
                        <Button className="py-1 px-2 font-bold sm:mt-5 border-2 border-red-700" disabled={cart.length === 0 || totalPrice === 0}>CHECKOUT</Button>
                    </Link>
                    <Button onClick={() => dispatch(clearCart())} className="py-1 px-2 font-bold sm:mt-5" secondary={true}>Clear Cart</Button>
                </div>
            </div>
        </Container>
    )
}

export default Cart
