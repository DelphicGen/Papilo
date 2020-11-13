import React, { useEffect, useCallback, useState } from 'react'
import Logo from '../../assets/footer/footer-logo.png'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom'

const Navbar = () => {
    
    const [navVisible, setNavVisible] = useState(true)
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)

    const handleScroll = useCallback(() => {
        const currentScrollPos = window.pageYOffset
        const visible = prevScrollPos > currentScrollPos

        if(currentScrollPos > 0){
            setNavVisible(visible)
        }

        setPrevScrollPos(currentScrollPos)
    }, [prevScrollPos])

    useEffect(() => {
        setNavVisible(true)
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <div className="flex items-center justify-between p-5 fixed top-0 w-full z-10 transition ease-in duration-300 bg-red-700 text-white" style={{ transform: !navVisible && 'translateY(-120px)' }}>
            
            <Link to="/">
                <img style={{height: '40px', width: 'auto'}} src={Logo} alt="logo papilo" />
            </Link>
            
            <div>
                <Link to="/cart">
                    <ShoppingCartIcon fontSize="large" className="mr-5" />
                </Link>
                {/* <Link to="/" >Login</Link> */}
            </div>
        </div>
    )
}

export default Navbar
