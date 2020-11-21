import { 
    SIGN_UP, 
    SIGN_IN, 
    SIGN_OUT, 
    LOGGED_IN, 
    ERROR, 
    GET_EXP_LIST, 
    FETCH_LATEST_USERS,
    GET_USER_MATCHES 
} from './types';
import axios from '../apis/user';
import jwtDecode from 'jwt-decode';

export const isUserLoggedIn = (loggedIn) => {
    console.log('running')
    return {
        type: LOGGED_IN,
        payload: {
           currentUser: loggedIn
        }
    }
}

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
                payload: res.data.message
            });
            console.log(res);
           postUserIdeaToExpertiseList(res.data.userId, res.data.expertise);
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
            dispatch(isUserLoggedIn(true));
            success = true;
            dispatch({
                type: SIGN_IN,
                payload: {
                    ...jwtDecode(res.data.token),
                    authToken: res.data.token
                }
            });
        })
        .catch((err) => {
            isUserLoggedIn(false);
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
            isUserLoggedIn(false);
            dispatch({
                type: SIGN_OUT,
                payload: {
                    user: null, 
                    authToken: null, 
                    iat: null, 
                    exp: null
                }
            })
        })
        .catch((err) => console.log(err))
}

/// Users List
export const getUserMatches = (userExpertiseList) => async (dispatch) => {
    console.log(userExpertiseList)
    const options = {
        method: 'GET',
        url: '/user/matches',
        params: {
            expertise: userExpertiseList
        }
    }

    await axios(options)
        .then(res => {
            console.log(res);
            dispatch({
                type: GET_USER_MATCHES,
                payload: {
                    userMatches: res.data
                }
            });
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: ERROR,
                payload: err.data
            })
        })
}

export const getLatestUsersList = () => async (dispatch) => {
    const options = {
        method: 'GET',
        url: '/users/latest'
    }

    await axios(options)
    .then(res => {
        console.log(res);
        dispatch({
            type: FETCH_LATEST_USERS,
            payload: {
                latestUsers: res.data
            }
        })
    })
    .catch(err => {
        dispatch({
            type: ERROR,
            payload: { error: err.response.data }
        });
    })
}

// Expertise List
export const getExpertiseList = () => async (dispatch) => {
    const options = {
        method: 'GET',
        url: '/expertise'
    }

    await axios(options)
        .then((res) => {
            dispatch({
                type: GET_EXP_LIST,
                payload: res.data
            });
        });
}

export const postUserIdeaToExpertiseList = (userId, expertise) => {
    
    expertise.forEach( async (expertiseId) => {
       
        const options = {
            method: 'PUT',
            url: `/expertise/${expertiseId}`,
            data: {
                id: expertiseId,
                userId: userId
            }
        }

        await axios(options)
        .then((res) => {
            // localStorage.removeItem('token');
            // dispatch({
            //     type: SIGN_OUT,
            //     payload: null
            // })
            // console.log(res);
        })
        .catch((err) => console.log(err)) 
        
    });
}
