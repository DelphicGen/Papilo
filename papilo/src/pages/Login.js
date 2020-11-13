import React from 'react'
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../util/validator'
import Input from '../components/Form/Input'
import Button from '../components/UI/Button'
import { useForm } from '../hooks/form-hook'
import Container from '../components/UI/Container'
import { Link } from 'react-router-dom'
import Header from '../components/UI/Header'

const Login = () => {
    const [formState, inputHandler] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)

    const submitHandler = event => {
        event.preventDefault()
        // const requestBody = JSON.stringify({
        //     email: formState.inputs.email.value,
        //     password: formState.inputs.password.value
        // })
    }

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}} className="flex items-center justify-center">
                <div className="w-fit-content">
                    <Header heading="Login" />
                    <p className="text-center">
                        Belum punya akun ?  
                        <Link to ="/register" className="text-red-700"> Register</Link>
                    </p>
                    <Input
                        id="email"
                        type="email"
                        label="Email*"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                        errorText="Mohon masukkan email yang valid."
                        width={300}
                        required />

                    <Input
                        id="password"
                        type="password"
                        label="Password*"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
                        onInput={inputHandler}
                        errorText="Password minimal 8 karakter."
                        width={300}
                        required />

                    <Button
                        width="w-full"
                        className="mt-10 py-2"
                        type="submit"
                        onClick={submitHandler}
                        disabled={!formState.isValid}>
                        LOGIN
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default Login
