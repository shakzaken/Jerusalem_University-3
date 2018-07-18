import {
  AUTH_ERRORS, 
  AUTH_CLEAR_ERRORS,LOGIN_USER,LOGOUT_USER,AUTH_GET_USER, REGISTER_STUDENT} from './types';
import {validateLogin} from '../helpers/validations/usersValidations';
import {Config} from '../config/config';
import axios from 'axios';

const serverURL = Config.serverUrl;


export const loginUser = (data,callback) => dispatch => {
  let errors = validateLogin(data);
  if(Object.keys(errors).length > 0){
    return dispatch({
      type: AUTH_ERRORS,
      payload : errors
    });
  }
  axios.post(`${serverURL}/auth/login`,data)
    .then(res =>{
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('user',JSON.stringify(res.data.user));
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });
      callback();
    })
    .catch(error =>{
      console.log(error);
      return dispatch({
        type: AUTH_ERRORS,
        payload: error.response.data.errors
      });
    });
  }

export const logout = (callback) =>{
  localStorage.clear();
  return {
    type: LOGOUT_USER,
    payload: {}
  }
}

export const clearErrors = () => {
  return {
    type: AUTH_CLEAR_ERRORS,
    payload: {}
  }
}

export const getUser = (id,callback) => dispatch => {
  axios.get(`${serverURL}/users/${id}`)
    .then(res =>{
      localStorage.setItem('user',JSON.stringify(res.data));
      dispatch({
        type: AUTH_GET_USER,
        payload: res.data
      });
      if(callback) callback();
    })
    .catch(error =>{
      console.log(error);
      return dispatch({
        type: AUTH_ERRORS,
        payload: {error: 'Error getting user'}
      });
    });
  }
