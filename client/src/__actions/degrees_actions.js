import {GET_DEGREES,NEW_DEGREE,CLEAR_ERRORS,
  DELETE_DEGREE, DEGREES_ERRORS, GET_DEGREE_COURSES,
   DELETE_DEGREE_COURSES, ADD_DEGREE_COURSES} from './types';
import {Config} from '../config/config';
import axios from 'axios';
import {validateDegree} from '../helpers/validations/degree_validations';

const serverURL = Config.serverUrl;


export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  }
}

export const getDegrees = () => dispatch =>{
  axios.get(`${serverURL}/degrees`)
    .then(result =>  dispatch({
        type: GET_DEGREES,
        payload: result.data.data
      }))
    .catch(err => console.log(err));
};


export const createDegree = function(postData,callback){
  let errors = validateDegree(postData);
  if(Object.keys(errors).length > 0){
    return {
      type: DEGREES_ERRORS,
      payload: errors
    };
  }
  return dispatch =>{
    axios.post(`${serverURL}/degrees`,postData)
    .then(res => {
        dispatch({
        type: NEW_DEGREE,
        payload: res.data
      });
      callback();
    })
    .catch(err => {
      dispatch({
        type: DEGREES_ERRORS,
        payload: err.response.data
      });
    });  
  } 
};


export const deleteDegree = (id,callback) => dispatch =>{
  axios.delete(`${serverURL}/degrees/${id}`)
      .then(res =>{ 
        dispatch({
          type: DELETE_DEGREE,
          payload: {id}
      });
      callback();
    })
    .catch(err => dispatch({
      type: DEGREES_ERRORS,
      payload : {errors: 'error deleting degree'}
    }));
  
}


export const getDegreeWithCourses = (id,callback) => dispatch =>{

  axios.get(`${serverURL}/degrees/${id}`)
    .then(res => { 
      dispatch({
        type: GET_DEGREE_COURSES,
        payload: res.data
      });
      if(callback) callback();
    })
    .catch(err => console.log(err));
};

export const addCourseToDegree = (data,callback) => dispatch => {
  axios.post(`${serverURL}/degrees/courses`,data)
    .then(res => {
      dispatch({
        type: ADD_DEGREE_COURSES,
        payload: res.data 
      });
      callback();
    })
    .catch(err => {
      dispatch({
        type: DEGREES_ERRORS,
        payload: err.response.data
      });
    });
}

export const deleteCourseFromDegree = (id,callback) => dispatch => {
  axios.delete(`${serverURL}/degrees/courses/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_DEGREE_COURSES,
        payload: res.data
      });
      callback();
    })
    .catch(err =>{
      dispatch({
        type: DEGREES_ERRORS,
        payload: {errors: 'Error deleting course from degree'}
      })
    });
}