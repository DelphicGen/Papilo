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

const EditProduct = props => {
    const dispatch = useDispatch();
    const productName = localStorage.getItem('productName')
    const stock = localStorage.getItem('stock')
    const price = localStorage.getItem('price')
    const prevType = localStorage.getItem('type')
    const id = localStorage.getItem('id')

    const [formState, inputHandler] = useForm({
        productName: {
            value: productName,
            isValid: true
        },
        stock: {
            value: stock,
            isValid: true
        },
        price: {
            value: price,
            isValid: true
        }
    }, true)

    const [type, setType] = useState(prevType)

    const typeHandler = (event) => {
        setType(event.target.value)
    }

    const submitHandler = event => {
        event.preventDefault()
        let url = 'http://localhost:4000/product/edit'

        Axios({
            method: 'POST',
            url: url,
            data: {
                productName: formState.inputs.productName.value,
                type: type,
                stock: formState.inputs.stock.value,
                price: formState.inputs.price.value,
                id: id
            },
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                // console.log(response)
                if(response.data.status === 'ok') {
                    dispatch(success('Product Edited!'))
                    props.history.push('/', {forceRefresh:true})
                } else dispatch(error('Fail to edit product'))
            })
    }

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}} className="flex items-center justify-center">
                <div className="w-fit-content">
                    <Header heading="Edit Product" />
                    <Input
                        id="productName"
                        type="text"
                        label="Product Name*"
                        validators={[VALIDATOR_REQUIRE()]}
                        onInput={inputHandler}
                        errorText="Please enter your product's name."
                        width={300}
                        value={formState.inputs.productName.value}
                        valid={true}
                        required />

                    <CustomSelect id="type" label="Product's Type" value={prevType} items={['Baju', 'Celana', 'Tas', 'Sepatu', 'Aksesoris']} handleChange={typeHandler} />

                    <Input
                        id="stock"
                        type="number"
                        label="Stock *"
                        validators={[VALIDATOR_NUMBER()]}
                        onInput={inputHandler}
                        errorText="Please enter your product's stock."
                        width={300}
                        value={formState.inputs.stock.value}
                        valid={true}
                        required />
                    <Input
                        id="price"
                        type="number"
                        label="Price*"
                        validators={[VALIDATOR_NUMBER()]}
                        onInput={inputHandler}
                        errorText="Please enter your product's price."
                        width={300}
                        value={formState.inputs.price.value}
                        valid={true}
                        required />

                    <Button
                        width="w-full"
                        className="mt-10 py-2"
                        type="submit"
                        onClick={submitHandler}
                        disabled={!formState.isValid || !type}>
                        SAVE
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default EditProduct
