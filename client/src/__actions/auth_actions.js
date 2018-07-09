import {GET_USERS,NEW_USER, START_LOADING,
  ERRORS,DELETE_USER,GET_INSTRUCTORS, 
  CLEAR_ERRORS,LOGIN_USER,LOGOUT_USER} from './types';
import {validateLogin} from '../helpers/validations/usersValidations';
import {Config} from '../config/config';
import axios from 'axios';

const serverURL = Config.serverUrl;


export const loginUser = (data,callback) => dispatch => {
  let errors = validateLogin(data);
  if(Object.keys(errors).length > 0){
    return dispatch({
      type: ERRORS,
      payload : errors
    });
  }
  axios.post(`${serverURL}/auth/login`,data)
    .then(res =>{
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });
      callback();
    })
    .catch(error =>{
      console.log(error.response);
      return dispatch({
        type: ERRORS,
        payload: error.response.data.errors
      });
    });
  }

export const logout = (callback) =>{
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