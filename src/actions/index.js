import { SIGN_UP, SIGN_IN, SIGN_OUT } from './types';
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
            // dispatch({
            //     type: SIGN_IN,
            //     payload: 
            // })
        })
        .catch(err => console.log(err))
//    dispatch({
//        type: SIGN_IN,
//        payload: user
//    })
}
