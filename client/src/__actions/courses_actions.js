import {GET_COURSES,NEW_COURSE, COURSES_START_LOADING,COURSES_CLEAR_ERRORS,
        DELETE_COURSE,ADD_TOPIC,
        DELETE_TOPIC,
         GET_TOPICS, GET_COMMENTS, GET_COURSE_WITH_DATA, COURSES_ERRORS
} from './types';
import {Config} from '../config/config';
import axios from 'axios';
import {validateCourse} from '../helpers/validations/course_validations';

const serverURL = Config.serverUrl;

export const clearErrors = () => {
  return {
    type: COURSES_CLEAR_ERRORS,
    payload: {}
  }
}


export const getCourseWithData = (id) => dispatch =>{
  axios.get(`${serverURL}/courses/${id}`)
    .then(res =>{
      dispatch({
        type: GET_COURSE_WITH_DATA,
        payload: res.data
      });
    })
    .catch(err =>{
      console.log(err);
      dispatch({
        type: COURSES_ERRORS,
        payload: {general: 'Server error'}
      });
    });
}


export const getCourses = (callback) => dispatch =>{
  axios.get(`${serverURL}/courses`)
    .then(result =>{
      dispatch({
        type: GET_COURSES,
        payload: result.data.data
      });
      if(callback) callback();
    })
    .catch(err => console.log(err));
};


export const createCourse = function(postData,callback){
  let errors = validateCourse(postData);
  if(Object.keys(errors).length > 0){
    return {
      type: COURSES_ERRORS,
      payload: errors
    };
  }
  return dispatch =>{
    axios.post(`${serverURL}/courses`,postData)
      .then(res => {
          dispatch({
          type: NEW_COURSE,
          payload: res.data
        });
        callback();
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: COURSES_ERRORS,
          payload: {name:'server error'}
        });
      });  
  } 
};

export const deleteCourse = (id,callback) => dispatch =>{
  axios.delete(`${serverURL}/courses/${id}`)
      .then(res =>{ 
        dispatch({
          type: DELETE_COURSE,
          payload: {id}
      });
      callback();
    })
    .catch(err => dispatch({
      type: COURSES_ERRORS,
      errors : {name: 'error deleting course'}
    }));
  
}


export const startLoading = () => {
  return {
    type: COURSES_START_LOADING,
    payload: {}
  }
}

export const getTopics = (id) => dispatch => {
  axios.get(`${serverURL}/courses/topics/${id}`)
    .then(res =>{
      dispatch({
        type: GET_TOPICS,
        payload: res.data
      });
    })
    .catch(err =>{
      dispatch({
        type: COURSES_ERRORS,
        payload: {errors: 'error getting topics'}
      });
    });
}

export const addTopic = (data,callback) => dispatch => {
  axios.post(`${serverURL}/courses/topics`,data)
    .then(res =>{
      dispatch({
        type: ADD_TOPIC,
        payload: res.data
      });
      callback();
    })
    .catch(err =>{
      dispatch({
        type: COURSES_ERRORS,
        payload: {errros: 'error in adding a topic'}
      });
    });
}

export const deleteTopic = (id,callback) => dispatch => {
  axios.delete(`${serverURL}/courses/topics/${id}`)
    .then(res =>{
      dispatch({
        type: DELETE_TOPIC,
        payload: res.data
      });
      callback();
    })
    .catch(err => {
      dispatch({
        type: COURSES_ERRORS,
        payload: err
      });
    });
}

export const getComments = (id) => dispatch => {
  axios.get(`${serverURL}/courses/comments/${id}`)
    .then(res => {
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      })
    })
    .catch(err =>{
      dispatch({
        type: COURSES_ERRORS,
        payload: {errors: 'error getting comments'}
      });
    });
}

