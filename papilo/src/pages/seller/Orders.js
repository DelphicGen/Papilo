import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Container from '../../components/UI/Container';
import Header from '../../components/UI/Header';

const Orders = () => {
    const columns = []
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/order/get',
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response.data.orders)
                setOrders(response.data.orders)
            })
    }, [])

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}}>
                <Header heading="Your Order" className="text-right" />
                {/* <CustomTable deleteProduct={deleteProduct} columns={columns} rows={products} /> */}
            </div>
        </Container>
    )
}

export default Orders
