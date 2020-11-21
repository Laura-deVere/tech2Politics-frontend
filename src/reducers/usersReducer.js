import { FETCH_LATEST_USERS, GET_USER_MATCHES } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_LATEST_USERS:
            return {...state, ...action.payload }
        case GET_USER_MATCHES:
            return {...state, ...action.payload }    
        default:
            return state;
    }
}