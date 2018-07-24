import {
  AUTH_ERRORS, CLEAR_ERRORS,
  LOGIN_USER,LOGOUT_USER,
  AUTH_GET_USER, INIT_AUTH,REGISTER_USER, USERS_ERRORS} from './types';
import {validateLogin,validateUser} from '../helpers/validations/usersValidations';
import {Config} from '../config/config';
import axios from 'axios';
import {setAuthToken} from '../helpers/authToken';

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
      let isAdmin = false;
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('user',JSON.stringify(res.data.user));
      setAuthToken(res.data.token);
      if(res.data.user.role === 'admin') { isAdmin = true; }

      dispatch({
        type: LOGIN_USER,
        payload: {
          user: res.data.user,
          token: res.data.token,
          isAdmin: isAdmin
        }
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
    type: CLEAR_ERRORS,
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


export const initAuthUser = () =>{
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  let isAdmin = false;
  if(user) {  
    if(token){
      axios.defaults.headers.common['Authorization'] = token;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
    if(user.role === 'admin') { isAdmin = true; }
    return {
      type: INIT_AUTH,
      payload: {user,token,isAdmin}
    };
  }else{
    return {
      type: 'TEST',
      payload: {}
    };   
  }
}


export const registerUser = function(postData,callback){
  let errors = validateUser(postData);
  if(Object.keys(errors).length > 0){
    return {
      type: USERS_ERRORS,
      payload: errors
    };
  }

  return dispatch => {
    axios.post(`${Config.serverUrl}/auth/register`,postData)
    .then(res => {
        dispatch({
        type: REGISTER_USER,
        payload: res.data
      });
      if(callback) callback();
    })
    .catch(err => {
      dispatch({
        type: USERS_ERRORS,
        payload: err.response.data
      });
    });  
  } 
};
