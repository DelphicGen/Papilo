import React from 'react'

const Container = props => {
    return (
        <div className="px-10 md:px-16 lg:px-32 pb-10 pt-24">
            {props.children}
        </div>
    )
}

export default Container
