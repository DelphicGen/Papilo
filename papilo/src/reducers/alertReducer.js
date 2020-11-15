import * as actions from '../actions/type';

const initialState = {
    type: '',
    message: ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type){
        case actions.ALERT_SUCCESS:
            return {
                type: 'Success',
                message: action.payload.message
            }
        case actions.ALERT_ERROR:
            return {
                type: 'Error',
                message: action.payload.message
            }
        case '':
            return initialState
        default:
            return state;
    }
}