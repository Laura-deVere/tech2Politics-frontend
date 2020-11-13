import { SIGN_UP, SIGN_IN, SIGN_OUT } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case SIGN_UP:
            return { ...state, ...action.payload }
        case SIGN_IN:
            return { ...state, user: { ...action.payload } }
        case SIGN_OUT:
            return { ...state, user: action.payload }
        default:
            return state;
    }
}