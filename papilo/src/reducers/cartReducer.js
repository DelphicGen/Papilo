import * as actions from '../actions/type';

const initialState = []

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type){
        case actions.ADD_TO_CART:
            return [
                ...state,
                {
                    id: action.payload.product.id,
                    name: action.payload.product.name,
                    details: action.payload.product.details,
                    price: action.payload.product.price,
                    image: action.payload.product.image,
                    count: 1,
                    total: action.payload.product.price
                }
            ]
        case actions.CLEAR_CART:
            return initialState
        case actions.INCREMENT_COUNT:
            return state.map(product => product.id !== action.payload.id ? product : {...product, count : ++product.count, total : (product.count) * product.price})
        case actions.DECREMENT_COUNT:
            return state.map(product => product.id !== action.payload.id ? product : {...product, count : product.count === 0 ? 0 : --product.count, total : (product.count) * product.price}) 
        case actions.REMOVE_PRODUCT:
            return state.filter(product => product.id !== action.payload.id) 
        case '':
            return initialState
        default:
            return state;
    }
}

