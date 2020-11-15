import React, { useState } from 'react'
import Container from '../../components/UI/Container'
import Header from '../../components/UI/Header'
import CustomSelect from '../../components/Form/CustomSelect'
import { useForm } from '../../hooks/form-hook'
import Button from '../../components/UI/Button'

const Checkout = () => {
    let totalPrice = localStorage.getItem('totalPrice')
    const [transhipment, setTranshipment] = useState('JNE')
    const [payment, setPayment] = useState('COD')

    // const [formState, inputHandler] = useForm({
    //     transhipment: {
    //         value: '',
    //         isValid: false
    //     },
    //     payment: {
    //         value: '',
    //         isValid: false
    //     },
    // }, false)

    const submitHandler = event => {
        event.preventDefault()
        // const requestBody = JSON.stringify({
        //     email: formState.inputs.email.value,
        //     password: formState.inputs.password.value
        // })
    }

    const transhipmentHandler = (event) => {
        setTranshipment(event.target.value)
    }

    const paymentHandler = (event) => {
        setPayment(event.target.value)
    }

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}}>
                <Header heading="Checkout" className="text-right" />

                <h3 className="font-bold text-lg md:text-xl">Total: Rp. {totalPrice}</h3>

                <CustomSelect id="transhipment" label="Transhipment Method" value={transhipment} items={['JNE']} handleChange={transhipmentHandler} />
                <CustomSelect id="payment" label="Payment Method" value={payment} items={['COD', 'PapiloPay']} handleChange={paymentHandler} />

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
