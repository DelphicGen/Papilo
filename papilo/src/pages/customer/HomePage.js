import React, { useState, useEffect } from 'react'
import Product from '../../components/UI/Product'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Container from '../../components/UI/Container'
import { addToCart, resetSearch } from '../../actions/action'
import { useDispatch, useSelector } from 'react-redux'
import Hero from '../../assets/hero.png'
import axios from 'axios'
import Shirt from '../../assets/products/shirt.jpg'
import Pants from '../../assets/products/pants.jpg'
import Shoes from '../../assets/products/shoes.png'
import Bag from '../../assets/products/bag.jpg'
import Accessory from '../../assets/products/accessory.jpg'
import { motion } from 'framer-motion';
import Papilo from '../../test-api/api'

const hero = {
    hidden: {
        opacity: 0,
        x: '100vw'
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { 
          duration: 1
        }
    }
}

const heroText = {
    hidden: {
        opacity: 0,
        x: '-100vw'
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { 
          duration: 1
        }
    }
}

const HomePage = () => {
    const dispatch = useDispatch();
    
    const {query} = useSelector(state => state)
    const [products, setProducts] = useState([])
    

    useEffect(() => {

        axios({
            method: 'POST',
            url: 'http://localhost:4000/product/get',
        })
            .then(response => {
                console.log(response)
                setProducts(response.data.products)
            })
        // const getData = async () => {
        //     const products = await Papilo.getAllProducts();
        //     // console.log(products.data.products)
        //     setProducts(products.data.products);
        // };
    
        // getData();
    }, [])
    
    useEffect(() => {
        if(query.search){
            let url
            if(query.query.length === 0) url = 'http://localhost:4000/product/get'
            else url = 'http://localhost:4000/product/search'

            axios({
                method: 'POST',
                url: url,
                data: {
                    query: query.query
                },
                headers: {'Content-Type': 'application/json', 'auth-token': localStorage.getItem('token') }
            })
                .then(response => {
                    setProducts(response.data.products)
                    dispatch(resetSearch())
                })
        }
        
    }, [dispatch, query, query.search])

    return (
        <Container>
            <div style={{minHeight: 'calc(100vh - 216px)'}}>

                <div className="flex lg:flex-row flex-col-reverse items-center lg:mb-0 mb-10">
                    <motion.div variants={heroText} initial="hidden" animate="visible" className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold">Melangkah untuk Maju</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </motion.div>
                    <motion.img variants={hero} initial="hidden" animate="visible" src={Hero} alt="hero" />
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10">
                {
                    products ? 
                    products.map((product, index) => <Product key={index} id={product.id} name={product.productName} price={product.price} image={product.type === 'Baju' ? Shirt : (product.type === 'Celana' ? Pants : (product.type === 'Tas' ? Bag : (product.type === 'Sepatu' ? Shoes : Accessory)))} onCartButtonClicked={() => dispatch(addToCart(product))}  />) :
                    <LoadingSpinner style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                }
                </div>
            </div>
        </Container>
    )
}

export default HomePage
