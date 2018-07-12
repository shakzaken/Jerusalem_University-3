import {ADD_COMMENT,DELETE_COMMENT,GET_COMMENTS,
   GET_ALL_COMMENTS,COMMENTS_ERRORS
} from './types';
import {Config} from '../config/config';
import axios from 'axios';


const serverURL = Config.serverUrl;


export const getAllComments = () => dispatch => {
  axios.get(`${serverURL}/comments`)
    .then(res => {
      dispatch({
        type: GET_ALL_COMMENTS,
        payload: res.data
      })
    })
    .catch(err =>{
      dispatch({
        type: COMMENTS_ERRORS,
        payload: {errors: 'error getting all comments'}
      });
    });
}

export const addComment = (data,callback) => dispatch => {
  axios.post(`${serverURL}/comments`,data)
    .then(res =>{
      dispatch({
        type: ADD_COMMENT,
        payload:  res.data
      });
      callback();
    })
    .catch(err =>{
      dispatch({
        type: COMMENTS_ERRORS,
        payload: err
      });
    });
}

export const deleteComment = (id,callback) => dispatch => {
  axios.delete(`${serverURL}/comments/${id}`)
    .then(res =>{
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data
      });
      callback();
    })
    .catch(err =>{
      dispatch({
        type: COMMENTS_ERRORS,
        payload: err
      });
    });
}