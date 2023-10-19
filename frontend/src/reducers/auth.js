import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
};

export default function(state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.access);
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: payload.access
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            }
        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null
            }
        default: 
            return state;
    }
}