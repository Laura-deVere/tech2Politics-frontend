import { SIGN_UP, SIGN_IN, SIGN_OUT } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SIGN_UP:
        console.log(action.payload)
            return { ...state, ...action.payload }
        case SIGN_IN:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}