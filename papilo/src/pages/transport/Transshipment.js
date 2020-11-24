import React, { useEffect, useState } from 'react'
import Container from '../../components/UI/Container'
import Header from '../../components/UI/Header'
import Axios from 'axios';
import CustomTable from '../../components/UI/CustomTable';

const Transshipment = () => {
    const columns = ['Alamat Pengiriman', 'Shipping Type', 'Fee', 'Order Date', 'Status', 'Confirm', 'Delete']
    const [transshipment, setTransshipment] = useState([])
    useEffect(() => {
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/shipping/get',
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response)
                setTransshipment(response.data.transshipment)
            })
    }, []);

    const deleteOrder = (id) => {
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/shipping/delete',
            data: {
                id: id,
            },
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response)
                setTransshipment(response.data.transshipment)
            })
    }

    const confirm = (id) => {
        Axios({
            method: 'POST',
            url: 'http://localhost:4000/shipping/confirm',
            data: {
                id: id,
            },
            headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
        })
            .then(response => {
                console.log(response)
                setTransshipment(response.data.transshipment)
            })
    }

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}}>
                <Header heading="Your Order" className="text-right" />
                {
                    transshipment.length > 0 && <CustomTable columns={columns} rows={transshipment} confirm={confirm} deleteOrder={deleteOrder}  />
                }
            </div>
        </Container>
    )
}

export default Transshipment
