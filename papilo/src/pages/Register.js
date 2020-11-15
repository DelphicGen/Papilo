import React, { useState } from 'react'
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../util/validator'
import Input from '../components/Form/Input'
import Button from '../components/UI/Button'
import { useForm } from '../hooks/form-hook'
import Container from '../components/UI/Container'
import { Link } from 'react-router-dom'
import Header from '../components/UI/Header'
import Axios from 'axios'
import { useDispatch } from 'react-redux';
import { success, error, saveRole } from '../actions/action';
import CustomRadio from '../components/Form/CustomRadio'

const Register = props => {

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

    const [role, setRole] = useState()
    const [storeName, setStoreName] = useState()
    const [companyName, setCompanyName] = useState()

    const submitHandler = event => {
        event.preventDefault()
        let url = 'http://localhost:4000/'

        if(role === 'Customer') url += 'customer/register'
        else if(role === 'Seller') url += 'seller/register'
        else url += 'transport/register'

        Axios({
            method: 'POST',
            url: url,
            data: {
                email: formState.inputs.email.value,
                password: formState.inputs.password.value,
                storeName: role === 'Seller' && storeName,
                companyName: role === 'Transport Company' && companyName,
            },
            headers: {'Content-Type': 'application/json' }
        })
            .then(response => {
                console.log(response)
                if(response.data.status === 'ok') {
                    dispatch(success('You are now registered'))
                    // localStorage.setItem('role', response.data.role)
                    dispatch(saveRole(response.data.role))
                    props.history.push('/')
                } else dispatch(error('Email is taken'))
            })
    }

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}} className="flex items-center justify-center">
                <div className="w-fit-content">
                    <Header heading="Register" />
                    <p className="text-center">
                        Sudah punya akun ?  
                        <Link to ="/login" className="text-red-700"> Login</Link>
                    </p>

                    <CustomRadio label="Role" name="role" value={role} handleChange={(e) => setRole(e.target.value)} options={['Customer', 'Seller', 'Transport Company']} />

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
                    {
                        role === 'Seller' && (
                            <Input
                                id="store"
                                type="text"
                                label="Store Name*"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter your store's name."
                                width={300}
                                value={storeName}
                                handleChange={(e) => setStoreName(e.target.value)}
                                className="mb-5"
                                required />
                        )
                    }

{
                        role === 'Transport Company' && (
                            <Input
                                id="company"
                                type="text"
                                label="Company Name*"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter your company's name."
                                width={300}
                                value={companyName}
                                handleChange={(e) => setCompanyName(e.target.value)}
                                className="mb-5"
                                required />
                        )
                    }

                    <Button
                        width="w-full"
                        className="mt-10 py-2"
                        type="submit"
                        onClick={submitHandler}
                        disabled={!formState.isValid || !role || (role === 'Seller' && !storeName) || (role === 'Transport Company' && !companyName)}>
                        REGISTER
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default Register
