import {GET_COURSES,NEW_COURSE, 
        DELETE_COURSE,ADD_TOPIC,
        DELETE_TOPIC,CLEAR_ERRORS,
         GET_TOPICS, GET_COMMENTS, GET_COURSE_WITH_DATA, COURSES_ERRORS
} from './types';
import {Config} from '../config/config';
import axios from 'axios';
import {validateCourse} from '../helpers/validations/course_validations';
import {validateTopic} from '../helpers/validations/topic_validation';

const serverURL = Config.serverUrl;

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  }
}


export const getCourseWithData = (id,callback) => dispatch =>{
  axios.get(`${serverURL}/courses/${id}`)
    .then(res =>{
      dispatch({
        type: GET_COURSE_WITH_DATA,
        payload: res.data
      });
      if(callback) callback();
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
        dispatch({
          type: COURSES_ERRORS,
          payload: err.response.data
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

  let errors = validateTopic(data);
  if(Object.keys(errors).length > 0){
    return dispatch({
      type: COURSES_ERRORS,
      payload: errors
    });
  }

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
        payload: err.response.data
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

