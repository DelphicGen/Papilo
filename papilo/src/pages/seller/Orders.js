import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import Container from '../../components/UI/Container';
import Header from '../../components/UI/Header';
import CustomTable from '../../components/UI/CustomTable'

const Orders = () => {
    const columns = ['Product', 'Quantity', 'Order Date']
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/order/get',
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                // console.log(response.data.orderDetails)
                console.log(response)
                setOrders(response.data.orderDetails)
            })
    }, [])

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}}>
                <Header heading="Your Order" className="text-right" />
                {
                    orders.length > 0 && <CustomTable orderList={true} columns={columns} rows={orders}  />
                }
            </div>
        </Container>
    )
}

export default Orders
