import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/form-hook';
import Container from '../../components/UI/Container';
import Header from '../../components/UI/Header';
import Input from '../../components/Form/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_NUMBER } from '../../util/validator';
import CustomSelect from '../../components/Form/CustomSelect';
import Button from '../../components/UI/Button';
import Axios from 'axios';
import { success, error } from '../../actions/action';

const AddProduct = () => {
    const dispatch = useDispatch();
    const [formState, inputHandler, resetHandler] = useForm({
        productName: {
            value: '',
            isValid: false
        },
        type: {
            value: '',
            isValid: false
        },
        stock: {
            value: null,
            isValid: false
        },
        price: {
            value: null,
            isValid: false
        }
    }, false)

    const [type, setType] = useState('')

    const typeHandler = (event) => {
        setType(event.target.value)
    }

    const submitHandler = event => {
        event.preventDefault()
        let url = 'http://localhost:4000/product/add'

        Axios({
            method: 'POST',
            url: url,
            data: {
                productName: formState.inputs.productName.value,
                stock: formState.inputs.stock.value,
                price: formState.inputs.price.value,
            },
            headers: {'Content-Type': 'application/json' }
        })
            .then(response => {
                if(response.data.status === 'created') {
                    dispatch(success('Product Added!'))
                    resetHandler()
                } else dispatch(error('Fail to add product'))
            })
    }

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}} className="flex items-center justify-center">
                <div className="w-fit-content">
                    <Header heading="Add Product" />

                    <CustomSelect id="type" label="Product's Type" value={type} items={['Baju', 'Celana', 'Tas', 'Sepatu', 'Aksesoris']} handleChange={typeHandler} />
                    
                    <Input
                        id="productName"
                        type="text"
                        label="Product Name*"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter your product's name."
                        width={300}
                        required />

                    <Input
                        id="stock"
                        type="number"
                        label="Stock *"
                        validators={[VALIDATOR_NUMBER()]}
                        onInput={inputHandler}
                        errorText="Please enter your product's stock."
                        width={300}
                        required />
                    <Input
                        id="price"
                        type="number"
                        label="Price*"
                        validators={[VALIDATOR_NUMBER()]}
                        onInput={inputHandler}
                        errorText="Please enter your product's price."
                        width={300}
                        required />

                    <Button
                        width="w-full"
                        className="mt-10 py-2"
                        type="submit"
                        onClick={submitHandler}
                        disabled={!formState.isValid || !type}>
                        LOGIN
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default AddProduct
