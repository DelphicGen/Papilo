import * as actions from '../actions/type';

const initialState = {
    query: '',
    search: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type){
        case actions.SET_QUERY:
            return {
                query: action.payload.query,
                search: false
            }
        case actions.SEARCH:
            return {
                ...state,
                search: true
            }
        case actions.RESET_SEARCH:
            return {
                query: '',
                search: false
            }
        case '':
            return initialState
        default:
            return state;
    }
}