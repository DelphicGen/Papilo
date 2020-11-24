import React, { useEffect, useState } from 'react'
import Container from '../../components/UI/Container'
import { useForm } from '../../hooks/form-hook'
import Header from '../../components/UI/Header'
import Input from '../../components/Form/Input'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../../components/UI/Button'
import Axios from 'axios'
import { success, error } from '../../actions/action'

const EditProfile = props => {
    const {role} = useSelector(state => state)
    const dispatch = useDispatch();
    const [formState, inputHandler] = useForm({
        name: {
            value: '',
            isValid: true
        },
        address: {
            value: '',
            isValid: true
        },
        handphone: {
            value: '',
            isValid: true
        },
        city: {
            value: '',
            isValid: true
        }
    }, true)
    const [initialValue, setInitialValue] = useState({
        name: '',
        address: '',
        handphone: '',
        city: ''
    })

    useEffect(() => {
        let url = 'http://localhost:4000/'

        if(role === 'customer') url += 'customer/retrieve/data'
        else if(role === 'seller') url += 'seller/retrieve/data'
        else url += 'transport/retrieve/data'

        Axios({
            method: 'POST',
            url: url,
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response)
                if(role === 'customer') inputHandler('name', response.data.data.name, true)
                else if(role === 'seller') inputHandler('name', response.data.data.storeName, true)
                else inputHandler('name', response.data.data.companyName, true)
                
                inputHandler('address', response.data.data.address, true)
                inputHandler('handphone', response.data.data.handphone, true)
                inputHandler('city', response.data.data.city, true)
                setInitialValue(response.data.data)
            })
    }, [])

    const submitHandler = () => {
        let url = 'http://localhost:4000/'

        if(role === 'customer') url += 'customer/update'
        else if(role === 'seller') url += 'seller/update'
        else url += 'transport/update'

        Axios({
            method: 'POST',
            url: url,
            data: {
                name: formState.inputs.name.value,
                address: formState.inputs.address.value,
                handphone: formState.inputs.handphone.value,
                city: formState.inputs.city.value,
            },
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                if(response.data.status === 'ok') {
                    dispatch(success('Profile Updated'))
                    props.history.push('/')
                } else dispatch(error('Error Occured, Please Try Again'))
            })
    }

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}} className="flex items-center justify-center">
                <div className="w-fit-content">
                    <Header heading="Edit Profile" />

                    <Input
                        id="name"
                        type="text"
                        label={role === 'customer' ? 'Name' : (role === 'seller' ? 'Store\'s Name' : 'Company\'s Name')}
                        validators={[]}
                        onInput={inputHandler}
                        errorText=""
                        width={300}
                        value={initialValue.name ? initialValue.name : (initialValue.storeName ? initialValue.storeName : (initialValue.companyName && initialValue.companyName))}
                        required />
                    <Input
                        id="address"
                        type="text"
                        label="Address"
                        validators={[]}
                        onInput={inputHandler}
                        errorText=""
                        width={300}
                        value={initialValue.address && initialValue.address}
                        required />
                    <Input
                        id="handphone"
                        type="text"
                        label="Phone's Number"
                        validators={[]}
                        onInput={inputHandler}
                        errorText=""
                        width={300}
                        value={initialValue.handphone && initialValue.handphone}
                        required />
                    <Input
                        id="city"
                        type="text"
                        label="City"
                        validators={[]}
                        onInput={inputHandler}
                        errorText=""
                        width={300}
                        value={initialValue.city && initialValue.city}
                        required />

                    <Button
                        width="w-full"
                        className="mt-10 py-2"
                        type="submit"
                        onClick={submitHandler}
                        disabled={false}>
                        SUBMIT
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default EditProfile
