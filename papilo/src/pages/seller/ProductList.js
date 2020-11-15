import React, { useEffect, useState } from 'react'
import Container from '../../components/UI/Container'
import Header from '../../components/UI/Header'
import CustomTable from '../../components/UI/CustomTable'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button'

const ProductList = () => {
    const columns = ['Product', 'Type', 'Stock', 'Price', 'Edit', 'Delete']
    const [products, setProducts] = useState([])

    useEffect(() => {
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/seller/product/get',
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                setProducts(response.data.products)
            })
    }, []);

    const deleteProduct = (id) => {
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/product/delete',
            data: {
                id: id,
            },
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                setProducts(response.data.products)
            })
    }

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}}>
                <Header heading="Dashboard" className="text-right" />
                <Link className="ml-auto w-fit-content block" to="/add">
                    <Button className="px-5 py-2">
                        Add
                    </Button>
                </Link>
                <CustomTable deleteProduct={deleteProduct} columns={columns} rows={products} />
            </div>
        </Container>
    )
}

export default ProductList
