import {
  GET_COURSES, NEW_COURSE, START_LOADING , ERRORS, CLEAR_ERRORS,
  ADD_TOPIC,DELETE_TOPIC,GET_TOPICS,
  ADD_COMMENT,DELETE_COMMENT,GET_ALL_COMMENTS,GET_COMMENTS, DELETE_COURSE
} from '../__actions/types';

const initialState = {
  coursesList: [],
  course: {},
  loading: true,
  errors: {},
  topics: []
}

export default function(state = initialState, action) {
  switch (action.type) {

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      }
    case ERRORS:
      return{
        ...state,
        errors: action.payload
      }
    case START_LOADING:
      return {
        ...state,
        loading: true 
      }
    case GET_COURSES:
      return {
        ...state,
        coursesList: action.payload,
        loading: false
      };
    case NEW_COURSE:
      return {
        ...state,
        course: action.payload
      };
    case DELETE_COURSE:
      return{
        ...state,
      };
    case GET_TOPICS:
      return{
        ...state,
        topics: action.payload.topics,
        course: action.payload.course,
        loading: false
      }
    default:
      return state;
  }
}