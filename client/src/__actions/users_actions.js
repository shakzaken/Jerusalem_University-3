import {GET_USERS,NEW_USER, 
  USERS_ERRORS,DELETE_USER,GET_INSTRUCTORS, 
  CLEAR_ERRORS,STUDENT_DATA
  ,REGISTER_STUDENT} from './types';
import {validateUser } from '../helpers/validations/usersValidations';
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
      type: USERS_ERRORS,
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
      dispatch({
        type: USERS_ERRORS,
        payload: err.response.data
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
      type: USERS_ERRORS,
      payload : {firstName: 'error deleting user'}
    }));
}


export const getStudentData = (id,callback) => dispatch => {
  axios.get(`${serverURL}/users/students/${id}`)
    .then(res => {
      dispatch({
        type: STUDENT_DATA,
        payload: res.data
      });
      if(callback)  callback(); 
    })
    .catch(err =>{
      console.log(err);
      dispatch({
        type: USERS_ERRORS,
        payload: err.response.data
      });
    });
}

export const registerStudent = (data,callback) => dispatch => {
  axios.post(`${serverURL}/users/students/register`,data)
    .then(res =>{
      dispatch({
        type: REGISTER_STUDENT,
        payload: res.data
      });
      callback();
    })
    .catch(err =>{
      dispatch({
        type: USERS_ERRORS,
        payload: err.response.data
      });
    })
} 


export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  }
}

