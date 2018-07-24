import {
   GET_COURSES, NEW_COURSE,
   COURSES_ERRORS, CLEAR_ERRORS,GET_TOPICS
  ,GET_COURSE_WITH_DATA, DELETE_COURSE
} from '../__actions/types';

const initialState = {
  coursesList: [],
  course: {},
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
        errors: {}
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      }
    case COURSES_ERRORS:
      return{
        ...state,
        errors: action.payload
      }
    case GET_COURSES:
      return {
        ...state,
        coursesList: action.payload,
        errors: {}
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
        errors: {}
      }
    default:
      return state;
  }
}