import * as actions from './type'

export const addToCart = product => ({
    type: actions.ADD_TO_CART,
    payload: {
        product
    }
})

export const clearCart = () => ({
    type: actions.CLEAR_CART,
    payload: {}
})

export const incrementCount = (id) => ({
    type: actions.INCREMENT_COUNT,
    payload: {
        id
    }
})

export const decrementCount = (id) => ({
    type: actions.DECREMENT_COUNT,
    payload: {
        id
    }
})

export const removeProduct = (id) => ({
    type: actions.REMOVE_PRODUCT,
    payload: {
        id
    }
})