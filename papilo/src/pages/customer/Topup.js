import React from 'react'
import Container from '../../components/UI/Container'
import Header from '../../components/UI/Header'
import Input from '../../components/Form/Input'
import { VALIDATOR_NUMBER, VALIDATOR_REQUIRE } from '../../util/validator'
import { useForm } from '../../hooks/form-hook'
import Button from '../../components/UI/Button'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { success } from '../../actions/action'

const Topup = props => {
    const dispatch = useDispatch();
    const [formState, inputHandler] = useForm({
        amount: {
            value: 0,
            isValid: false
        }
    }, false)
    
    const submitHandler = () => {
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/papilopay/topup',
            data: {
                amount: formState.inputs.amount.value,
            },
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                if(response.data.status === 'ok') {
                    dispatch(success('Topup successful'))
                    props.history.push('/', {forceRefresh:true})
                } else dispatch(success('Something went wrong'))
            })
    }

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}} className="flex items-center justify-center">
                <div className="w-fit-content">
                    <Header heading="Topup" />
                    <Input
                        id="amount"
                        type="number"
                        label="Topup Amount*"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]}
                        onInput={inputHandler}
                        errorText="Please enter a valid nominal."
                        width={300}
                        required />
                    <Button
                        width="w-full"
                        className="mt-10 py-2"
                        type="submit"
                        onClick={submitHandler}
                        disabled={!formState.isValid}>
                        TOPUP
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default Topup
