import React from 'react'

const Header = (props) => {
    return (
        <h2 className={`text-center text-2xl mb-5 sm:text-3xl font-bold ${props.className}`}>{props.heading}</h2>
    )
}

export default Header
