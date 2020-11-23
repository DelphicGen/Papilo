import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import alertReducer from './alertReducer'
import roleReducer from './roleReducer'
import queryReducer from './queryReducer'

export default combineReducers({
    cart: cartReducer,
    alert: alertReducer,
    role: roleReducer,
    query: queryReducer
})