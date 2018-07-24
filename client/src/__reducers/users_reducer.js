import {GET_USERS, NEW_USER,  CLEAR_ERRORS,
  USERS_ERRORS, GET_INSTRUCTORS, STUDENT_DATA} from '../__actions/types';

const initialState = {
  users: [],
  user: {},
  degree: {},
  courses : [],
  form:{},
  errors:{},
  instructors: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        errors: {}
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
    
    case STUDENT_DATA:
      return {
        ...state,
        errors: {},
        user: action.payload.user,
        degree: action.payload.degree,
        courses: action.payload.courses
      }
    default:
      return state;
  }
}