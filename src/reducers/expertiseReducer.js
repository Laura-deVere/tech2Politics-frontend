import { GET_EXP_LIST } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case GET_EXP_LIST:
            console.log(action);
            return [...action.payload]
        default:
            return state;
    }
}