import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import expertiseReducer from './expertiseReducer';

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    expertiseList: expertiseReducer
});
