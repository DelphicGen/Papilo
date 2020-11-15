import * as actions from '../actions/type';

const initialState = ''

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type){
        case actions.SAVE_ROLE:
            return action.payload.role
        case actions.REMOVE_ROLE:
            return initialState
        default:
            return state;
    }
}

