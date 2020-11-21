import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import expertiseReducer from './expertiseReducer';
import usersReducer from './usersReducer';

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    expertiseList: expertiseReducer,
    users: usersReducer
});
