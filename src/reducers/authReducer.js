import { SIGN_UP, SIGN_IN, SIGN_OUT, LOGGED_IN, UPDATE_USER } from '../actions/types';

const INITIAL_STATE = {
    user: null, 
    authToken: null, 
    iat: null, 
    exp: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_USER: 
            console.log(action.payload)
            return { ...state, ...action.payload }
        case LOGGED_IN:
            console.log(action)
            return { ...state, ...action.payload }
        case SIGN_UP:
            return { ...state, ...action.payload }
        case SIGN_IN:
            return { ...state, ...action.payload }
        case SIGN_OUT:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}