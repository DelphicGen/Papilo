import React, { useState } from 'react'
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../util/validator'
import Input from '../../components/Form/Input'
import Button from '../../components/UI/Button'
import { useForm } from '../../hooks/form-hook'
import Container from '../../components/UI/Container'
import { NavLink } from 'react-router-dom'
import Header from '../../components/UI/Header'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { success, error, saveRole } from '../../actions/action';
import CustomRadio from '../../components/Form/CustomRadio'

const Login = props => {
    const dispatch = useDispatch();
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
    const [role, setRole] = useState('')

    const submitHandler = event => {
        event.preventDefault()
        let url = 'http://localhost:4000/'

        if(role === 'Customer') url += 'customer/login'
        else if(role === 'Seller') url += 'seller/login'
        else url += 'transport/login'

        Axios({
            method: 'POST',
            url: url,
            data: {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
            },
            headers: {'Content-Type': 'application/json' }
        })
            .then(response => {
                if(response.data.status === 'ok') {
                    dispatch(success('Login successful'))
                    localStorage.setItem('token', response.data.token)
                    // localStorage.setItem('papilopay', response.data.papilopay)
                    dispatch(saveRole(response.data.role))
                    props.history.push('/')
                } else dispatch(error('Wrong credentials'))
            })
    }
    const handleRole = (e) => {
        setRole(e.target.value)
    }

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}} className="flex items-center justify-center">
                <div className="w-fit-content">
                    <Header heading="Login" />
                    <p className="text-center">
                        Belum punya akun ?  
                        <NavLink to ="/register" className="text-red-700"> Register</NavLink>
                    </p>

                    <Input
                        id="email"
                        type="email"
                        label="Email*"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
                        onInput={inputHandler}
                        errorText="Please enter a valid email address."
                        width={300}
                        datatestid="email"
                        required />

                    <Input
                        id="password"
                        type="password"
                        label="Password*"
                        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(8)]}
                        onInput={inputHandler}
                        errorText="Password should has at least 8 characters."
                        width={300}
                        className="mb-5"
                        datatestid="password"
                        required />

                    <CustomRadio label="Role" name="role" value={role} handleChange={handleRole} options={['Customer', 'Seller', 'Transport Company']} />

                    <Button
                        width="w-full"
                        className="mt-10 py-2"
                        type="submit"
                        onClick={submitHandler}
                        disabled={!formState.isValid || !role}>
                        LOGIN
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default Login
