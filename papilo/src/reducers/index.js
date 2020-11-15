import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import alertReducer from './alertReducer'
import roleReducer from './roleReducer'

export default combineReducers({
    cart: cartReducer,
    alert: alertReducer,
    role: roleReducer,
})