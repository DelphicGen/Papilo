import React from 'react'

const SocialMedia = props => {
    return (
        <button className="mr-0 md:mr-5 mt-5 sm:mt-0 flex items-center justify-center">
            {props.children}
            <span className="font-bold">{props.name}</span>
        </button>
    )
}

export default SocialMedia
