import {GET_USERS, NEW_USER, USERS_START_LOADING , CLEAR_ERRORS,
  USERS_ERRORS, DELETE_USER, GET_INSTRUCTORS, STUDENT_DATA,REGISTER_STUDENT} from '../__actions/types';

const initialState = {
  users: [],
  user: {},
  degree: {},
  courses : [],
  form:{},
  errors:{},
  instructors: [],
  loading: true
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case GET_INSTRUCTORS:
      return {
        ...state,
        instructors: action.payload,
      }
    case NEW_USER:
      return {
        ...state,
        user: action.payload,
      };
    case USERS_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      }
    case USERS_START_LOADING:
      return {
        ...state,
        loading: true
      }
    case STUDENT_DATA:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        degree: action.payload.degree,
        courses: action.payload.courses
      }
    default:
      return state;
  }
}