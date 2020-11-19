import React, { useState, useEffect } from 'react'
import Container from '../../components/UI/Container'
import Header from '../../components/UI/Header'
import CustomSelect from '../../components/Form/CustomSelect'
import Button from '../../components/UI/Button'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { success, error } from '../../actions/action';
import { clearCart } from '../../actions/action'

const Checkout = props => {
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state)
    // console.log(cart)
    let totalPrice = localStorage.getItem('totalPrice')
    let [papilopay, setPapilopay] = useState();
    const [transhipment, setTranshipment] = useState('Kargo Yes')
    const [payment, setPayment] = useState('PapiloPay')
    const submitHandler = event => {
        event.preventDefault()
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/papilopay/pay',
            data: {
                totalPrice: totalPrice,
                cart: cart
            },
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                if(response.data.status === 'ok') {
                    dispatch(clearCart())
                    dispatch(success('Order will be processed!'))
                    props.history.push('/')
                } else dispatch(error('Something went wrong'))
            })
    }

    const transhipmentHandler = (event) => {
        setTranshipment(event.target.value)
    }

    const paymentHandler = (event) => {
        setPayment(event.target.value)
    }

    useEffect(() => {
        
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/papilopay/get',
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                if(response.data.status === 'ok') {
                    setPapilopay(response.data.papilopay[0].amount)
                }
            })

    }, [])

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}}>
                <Header heading="Checkout" className="text-right" />

                <h3 className="font-bold text-lg md:text-xl mb-3">Papilopay: Rp. {papilopay}</h3>
                <h3 className="font-bold text-lg md:text-xl mb-5">Total: Rp. {totalPrice}</h3>

                <CustomSelect id="transhipment" label="Transhipment Method" value={transhipment} items={['Kargo Yes', 'Si Kilat', 'Yuveo', 'Roomm', 'Agivu']} handleChange={transhipmentHandler} />
                <CustomSelect id="payment" label="Payment Method" value={payment} items={['PapiloPay']} handleChange={paymentHandler} />

                <Button
                    width="w-full"
                    className="mt-10 py-2"
                    type="submit"
                    onClick={submitHandler}>
                    Pay
                </Button>
            </div>
        </Container>
    )
}

export default Checkout
