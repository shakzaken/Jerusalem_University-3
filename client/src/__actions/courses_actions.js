import {GET_COURSES,NEW_COURSE, START_LOADING,CLEAR_ERRORS,
        ERRORS,DELETE_COURSE,ADD_TOPIC,
        DELETE_TOPIC,ADD_COMMENT,DELETE_COMMENT,
         GET_TOPICS, GET_COMMENTS, GET_ALL_COMMENTS
} from './types';
import {Config} from '../config/config';
import axios from 'axios';
import {validateCourse} from '../helpers/validations/course_validations';

const serverURL = Config.serverUrl;

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  }
}


export const getCourses = (callback) => dispatch =>{
  axios.get(`${serverURL}/courses`)
    .then(result =>{
      dispatch({
        type: GET_COURSES,
        payload: result.data.data
      });
      callback();
    })
    .catch(err => console.log(err));
};


export const createCourse = function(postData,callback){
  let errors = validateCourse(postData);
  if(Object.keys(errors).length > 0){
    return {
      type: ERRORS,
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
          type: ERRORS,
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
      type: ERRORS,
      errors : {name: 'error deleting course'}
    }));
  
}


export const startLoading = () => {
  return {
    type: START_LOADING,
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
        type: ERRORS,
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
        type: ERRORS,
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
        type: ERRORS,
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
        type: ERRORS,
        payload: {errors: 'error getting comments'}
      });
    });
}

export const getAllComments = () => dispatch => {
  axios.get(`${serverURL}/courses/comments/`)
    .then(res => {
      dispatch({
        type: GET_ALL_COMMENTS,
        payload: res.data
      })
    })
    .catch(err =>{
      dispatch({
        type: ERRORS,
        payload: {errors: 'error getting all comments'}
      });
    });
}

export const addComment = (data,callback) => dispatch => {
  axios.post(`${serverURL}/courses/comments`,data)
    .then(res =>{
      dispatch({
        type: ADD_COMMENT,
        payload:  res.data
      });
      callback();
    })
    .catch(err =>{
      dispatch({
        type: ERRORS,
        payload: err
      });
    });
}

export const deleteComment = (id,callback) => dispatch => {
  axios.delete(`${serverURL}/courses/comments/${id}`)
    .then(res =>{
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data
      });
      callback();
    })
    .catch(err =>{
      dispatch({
        type: ERRORS,
        payload: err
      });
    });
}