import React, { useState, useEffect } from 'react'
import Container from '../../components/UI/Container'
import Header from '../../components/UI/Header'
import CustomSelect from '../../components/Form/CustomSelect'
import Button from '../../components/UI/Button'
import Axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { success, error } from '../../actions/action';
import { clearCart } from '../../actions/action'
import { VALIDATOR_REQUIRE } from '../../util/validator'
import Input from '../../components/Form/Input'
import { useForm } from '../../hooks/form-hook'

const Checkout = props => {

    const [formState, inputHandler] = useForm({
        address: {
            value: '',
            isValid: false
        },
    }, false)

    const dispatch = useDispatch();
    const {cart} = useSelector(state => state)
    let totalPrice = localStorage.getItem('totalPrice')
    let [papilopay, setPapilopay] = useState();
    const [transshipment, setTransshipment] = useState('Kargo Yes')
    const [payment, setPayment] = useState('PapiloPay')

    const submitHandler = event => {
        event.preventDefault()
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/papilopay/pay',
            data: {
                totalPrice: totalPrice,
                cart: cart,
                address: formState.inputs.address.value,
                transshipment: transshipment
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
        setTransshipment(event.target.value)
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

                <CustomSelect id="transshipment" label="Transhipment Method" value={transshipment} items={['Kargo Yes', 'Si Kilat', 'Yuveo', 'Roomm', 'Agivu']} handleChange={transhipmentHandler} />
                <CustomSelect id="payment" label="Payment Method" value={payment} items={['PapiloPay']} handleChange={paymentHandler} />

                <Input
                    id="address"
                    type="text"
                    label="Receiver Address*"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                    errorText="Please enter the receiver's address"
                    width={300}
                    className="mb-5"
                    required />

                <Button
                    width="w-full"
                    className="mt-10 py-2"
                    type="submit"
                    onClick={submitHandler}
                    disabled={!formState.isValid}
                >
                    Pay
                </Button>
            </div>
        </Container>
    )
}


export default Checkout
