import React, { useState, useEffect } from 'react'
import Product from '../../components/UI/Product'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Container from '../../components/UI/Container'
import { addToCart } from '../../actions/action'
import { useDispatch } from 'react-redux'
import Hero from '../../assets/hero.png'
import Axios from 'axios'

const HomePage = () => {
    const dispatch = useDispatch();

    const [products, setProducts] = useState([])

    useEffect(() => {

        Axios({
            method: 'POST',
            url: 'http://localhost:4000/product/get',
        })
            .then(response => {
                setProducts(response.data.products)
            })
    }, [])

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}}>

                <div className="flex lg:flex-row flex-col-reverse items-center lg:mb-0 mb-10">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold">Melangkah untuk Maju</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <img src={Hero} alt="hero" />
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10">
                {
                    products ? 
                    products.map((product, index) => <Product key={index} id={product.id} name={product.productName} price={product.price} image={product.image} onCartButtonClicked={() => dispatch(addToCart(product))}  />) :
                    <LoadingSpinner style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                }
                </div>
            </div>
        </Container>
    )
}

export default HomePage
