import {GET_ERRORS,SET_CURRENT_USER} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
//Register User

export const registerUser = (userData,history) => dispatch => {
    axios.post('/api/users/register',userData)
    .then(res => history.push('/login'))
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload : err.response.data
        });
    });
};


//Login - Get User Token

export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login',userData)
    .then(res => {
        //Save to local storage
        const {token} = res.data;
        //Set token to local storage
        localStorage.setItem('jwtToken',token);
        //Set token to auth header
        setAuthToken(token);
        //Decode token to get user data
        const decoded = jwt_decode(token);
        //Set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload : err.response.data
        });
    });
};


//set Logged in user
export const setCurrentUser = (decoded) =>{
    return{
        type: SET_CURRENT_USER,
        payload : decoded
    }
}

//LogOut
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    //Remove auth header
    setAuthToken(false);
    //Set current user to {} so isAuthenticated is false
    dispatch(setCurrentUser({}));
    window.location.href = '/login';
}