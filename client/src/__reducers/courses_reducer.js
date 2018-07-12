import {
  GET_COURSES, NEW_COURSE, COURSES_START_LOADING , COURSES_ERRORS, COURSES_CLEAR_ERRORS,
  ADD_TOPIC,DELETE_TOPIC,GET_TOPICS,GET_COURSE_WITH_DATA,
  ADD_COMMENT,DELETE_COMMENT,GET_ALL_COMMENTS,GET_COMMENTS, DELETE_COURSE
} from '../__actions/types';

const initialState = {
  coursesList: [],
  course: {},
  loading: true,
  errors: {},
  topics: [],
  comments: []
}

export default function(state = initialState, action) {
  switch (action.type) {

    case GET_COURSE_WITH_DATA:
      return {
        ...state,
        course: action.payload.course,
        comments: action.payload.comments,
        topics: action.payload.topics,
        loading: false
      }
    case COURSES_CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      }
    case COURSES_ERRORS:
      return{
        ...state,
        errors: action.payload
      }
    case COURSES_START_LOADING:
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