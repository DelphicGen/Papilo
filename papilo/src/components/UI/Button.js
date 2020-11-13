import React from 'react'

const Button = props => {
    const buttonClass = `${props.secondary ? 'border-2 border-red-700 text-red-700' : 'bg-red-700 text-white'} over:shadow-btn focus:outline-none block ${props.width && props.width} ${props.className} ${props.disabled ? 'btn-disabled' : ''}`

    return (
        <button
            className={buttonClass}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button