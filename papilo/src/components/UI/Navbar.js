import React, { useEffect, useCallback, useState } from 'react'
import Logo from '../../assets/footer/footer-logo.png'
import { Link } from 'react-router-dom'
import Anchors from './Anchors';
import { Search } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setQuery, search } from '../../actions/action';

const Navbar = () => {
    const dispatch = useDispatch();
    const {query, role} = useSelector(state => state)
    const [navVisible, setNavVisible] = useState(true)
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset)

    const handleScroll = useCallback(() => {
        const currentScrollPos = window.pageYOffset
        const visible = prevScrollPos > currentScrollPos
        if(currentScrollPos > 250){
            setNavVisible(visible)
        }

        setPrevScrollPos(currentScrollPos)
    }, [prevScrollPos])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    useEffect(() => {
        setNavVisible(true)
    }, [])

    return (
        <div className="flex items-center justify-between p-5 fixed top-0 w-full z-10 transition ease-in duration-300 bg-red-700 text-white" style={{ transform: !navVisible && 'translateY(-120px)' }}>
            
            <Link to="/">
                <img style={{height: '40px', width: 'auto'}} src={Logo} alt="logo papilo" />
            </Link>
            
            <div className="flex items-center">
                {
                    role === 'customer' && window.location.href === 'http://localhost:3000/' &&
                    <div className="relative mr-5">
                        <input style={{height: 39}} className="pl-2 text-red-700" placeholder="Search" value={query.query} onChange={e => dispatch(setQuery(e.target.value))} data-testid="search-input" />
                        <button className="bg-white absolute top-0 right-0 border-l-2 border-red-700 flex items-center px-2 cursor-pointer" style={{ height: 39 }} onClick={() => dispatch(search())}>
                            <Search color="secondary" />
                        </button>
                    </div>
                }
                <Anchors />
            </div>
        </div>
    )
}

export default Navbar
