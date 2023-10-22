import axios from 'axios';
import { setAlert } from './alert';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types';

// Login User action
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, password });
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/token/`, body, config
        );
        dispatch({type: LOGIN_SUCCESS, payload: response.data});
        dispatch(setAlert('Authenticated successfully', 'success'));
    } catch (err) {
        let message = err.response.data.detail;
        dispatch({type: LOGIN_FAIL});
        dispatch(setAlert(message, 'error'));
    }
};


// Signup User action
export const signup = ({ name, email, password, password2 }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name, email, password, password2 }); 
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/accounts/signup/`,
            body,
            config
        );
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        dispatch(login(email, password));
    } catch (err) {
        dispatch({type: SIGNUP_FAIL});
        let message = err.response.data.error;
        console.log(message);
        dispatch(setAlert(message, 'error'));
    }
};

export const logout = () => dispatch => {
    dispatch(setAlert('logout successful.', 'success'));
    dispatch({ type: LOGOUT });
}