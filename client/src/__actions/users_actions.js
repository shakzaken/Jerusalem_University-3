import {GET_USERS,NEW_USER, START_LOADING,
  ERRORS,DELETE_USER,GET_INSTRUCTORS, 
  CLEAR_ERRORS,LOGIN_USER} from './types';
import {validateUser ,validateLogin} from '../helpers/validations/usersValidations';
import {Config} from '../config/config';
import axios from 'axios';

const serverURL = Config.serverUrl;

export const getUsers = () => dispatch =>{
  axios.get(`${Config.serverUrl}/users`)
    .then(result =>  dispatch({
        type: GET_USERS,
        payload: result.data.data
      }))
    .catch(err => console.log(err));
};

export const getInstructors = (callback) => dispatch =>{
  axios.get(`${Config.serverUrl}/users/instructors`)
    .then(result => { dispatch({
        type: GET_INSTRUCTORS,
        payload: result.data
      })
      callback();
    })
    .catch(err => console.log(err));
};

export const createUser = function(postData,callback){
  let errors = validateUser(postData);
  if(Object.keys(errors).length > 0){
    return {
      type: ERRORS,
      payload: errors
    };
  }

  return dispatch =>{
    
    axios.post(`${Config.serverUrl}/users`,postData)
    .then(res => {
        dispatch({
        type: NEW_USER,
        payload: res.data
      });
      callback();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: ERRORS,
        payload: {firstName:'server error'}
      });
    });  
  } 
};


export const deleteUser = (id,callback) => dispatch =>{
  axios.delete(`${Config.serverUrl}/users/${id}`)
      .then(res =>{ 
        dispatch({
          type: DELETE_USER,
          payload: {id}
      });
      callback();
    })
    .catch(err => dispatch({
      type: ERRORS,
      errors : {firstName: 'error deleting user'}
    }));
  
}


export const startLoading = () => {
  return {
    type: START_LOADING,
    payload: {}
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  }
}

