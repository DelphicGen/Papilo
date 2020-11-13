import React from 'react'
import './LoadingSpinner.css'

const LoadingSpinner = props => (
    <div className={`spinner ${props.button ? 'w-6 h-6' : 'w-10 h-10'}`} style={props.style}>
        <div className={`double-bounce1 ${props.color || 'bg-red-700'}`}></div>
        <div className={`double-bounce2 ${props.color || 'bg-red-700'}`}></div>
    </div>
)

export default LoadingSpinner