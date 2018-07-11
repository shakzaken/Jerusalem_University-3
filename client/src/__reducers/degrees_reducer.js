import {
   GET_DEGREES, NEW_DEGREE, DEGREES_START_LOADING,
   DEGREES_ERRORS ,DELETE_DEGREE,GET_DEGREE_COURSES, CLEAR_ERRORS,
  ADD_DEGREE_COURSES,DELETE_DEGREE_COURSES
} from '../__actions/types';

const initialState = {
  degreesList: [],
  degree: {},
  courses: [],
  homeLoading: true,
  pageLoading: true,
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
        homeLoading: false
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
    case DEGREES_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case DEGREES_START_LOADING:
      return {
        ...state,
        homeLoading: true,
        pageLoading: true
      }
    case GET_DEGREE_COURSES:
      return {
        ...state,
        pageLoading: action.payload.loading,
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