import * as actions from './type'

// Cart
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

// Alert
export const success = message => ({
    type: actions.ALERT_SUCCESS,
    payload: {
        message
    }
})

export const error = message => ({
    type: actions.ALERT_ERROR,
    payload: {
        message
    }
})

// Auth
export const saveRole = (role) => ({
    type: actions.SAVE_ROLE,
    payload: {
        role
    }
})

export const removeRole = () => ({
    type: actions.REMOVE_ROLE,
    payload: {}
})

// Query
export const setQuery = (query) => ({
    type: actions.SET_QUERY,
    payload: {
        query
    }
})

export const search = () => ({
    type: actions.SEARCH,
    payload: {}
})

export const resetSearch = () => ({
    type: actions.RESET_SEARCH,
    payload: {}
})