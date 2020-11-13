import React, { useState, useEffect } from 'react'
import Product from '../components/UI/Product'
import Item from '../assets/products/item.png'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import Container from '../components/UI/Container'
import { addToCart } from '../actions/action'
import { useSelector, useDispatch } from 'react-redux'
import Hero from '../assets/hero.png'

const HomePage = () => {
    const {cart} = useSelector(state => state);
    const dispatch = useDispatch();

    const [products, setProducts] = useState([
        {
            id: '1',
            name: 'Lorem ipsum',
            details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            price: 50000,
            image: Item
        },
        {
            id: '2',
            name: 'Lorem ipsum',
            details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            price: 50000,
            image: Item
        },
        {
            id: '3',
            name: 'Lorem ipsum',
            details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            price: 50000,
            image: Item
        },
        {
            id: '4',
            name: 'Lorem ipsum',
            details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            price: 50000,
            image: Item
        },
        {
            id: '5',
            name: 'Lorem ipsum',
            details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            price: 50000,
            image: Item
        },
        {
            id: '6',
            name: 'Lorem ipsum',
            details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            price: 50000,
            image: Item
        },
        {
            id: '7',
            name: 'Lorem ipsum',
            details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            price: 50000,
            image: Item
        },
        {
            id: '8',
            name: 'Lorem ipsum',
            details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            price: 50000,
            image: Item
        },
        {
            id: '9',
            name: 'Lorem ipsum',
            details: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            price: 50000,
            image: Item
        }
    ])

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
                    products.map((product, index) => <Product key={index} id={product.id} name={product.name} details={product.details} price={product.price} image={product.image} onCartButtonClicked={() => dispatch(addToCart(product))}  />) :
                    <LoadingSpinner style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                }
                </div>
            </div>
        </Container>
    )
}

export default HomePage
