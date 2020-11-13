import { SIGN_UP, SIGN_IN, SIGN_OUT, ERROR } from './types';
import axios from '../apis/user';

export const signUp = (newUser) => async (dispatch) => {
    //do a sign in thing
    const options = {
            method: 'POST',
            url: '/signup',
            withCredentials: true,
            data: {
                email: newUser.email,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                location: newUser.location,
                website: newUser.website,
                linkedin: newUser.linkedin,
                summary: newUser.summary,
                expertise: newUser.expertise
            }
        }

       return await axios(options)
            .then((res) => {
                dispatch({
                    type: SIGN_UP,
                    payload: res.data
                })
            })
            .catch((err) => console.log(err));  
}

export const signIn = (email, password) => async (dispatch) => {
    let success;
    // /do a sign in thing
    const options = {
        method: "POST",
        withCredentials: true,
        url: '/login',
        data: {
            username: email,
            password: password
        }
    }

    await axios(options)
        .then((res) => {
            console.log(res)
            localStorage.setItem('token', res.data.token)
            success = true;
            dispatch({
                type: SIGN_IN,
                payload: res.data.user
            });
        })
        .catch((err) => {
            console.log(err.response);
            success = false;
            dispatch({
                type: ERROR,
                payload: { message: err.response.data }
            });
        });
    return success;    
}

export const signOut = (email) => async (dispatch) => {
    const options = {
        method: 'GET',
        withCredentials: true,
        url: '/logout',
        data: {
            username: email
        }
    }

    await axios(options)
        .then((res) => {
            localStorage.removeItem('token');
            dispatch({
                type: SIGN_OUT,
                payload: null
            })
        })
        .catch((err) => console.log(err))
}
