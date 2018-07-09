import {
   GET_DEGREES, NEW_DEGREE, START_LOADING,
   ERRORS ,DELETE_DEGREE,GET_DEGREE_COURSES, CLEAR_ERRORS,
  ADD_DEGREE_COURSES,DELETE_DEGREE_COURSES
} from '../__actions/types';

const initialState = {
  degreesList: [],
  degree: {},
  courses: [],
  loading: true,
  errors: {}
}

export default function(state = initialState, action) {
  switch (action.type) {

    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      }
    case GET_DEGREES:
      return {
        ...state,
        degreesList: action.payload,
        loading: false
      };
    case NEW_DEGREE:
      return {
        ...state,
        degree: action.payload
      };
    case DELETE_DEGREE:
      return {
        ...state,
        degree: action.payload
      };
    case ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case START_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_DEGREE_COURSES:
      return {
        ...state,
        loading: true,
        degree: action.payload.degree,
        courses: action.payload.courses
      }
    case ADD_DEGREE_COURSES:
      return state;
    case DELETE_DEGREE_COURSES:
      return state;
       
    default:
      return state;
  }
}