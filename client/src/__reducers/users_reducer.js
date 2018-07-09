import {GET_USERS, NEW_USER, START_LOADING , CLEAR_ERRORS,
  ERRORS, DELETE_USER, GET_INSTRUCTORS} from '../__actions/types';

const initialState = {
  users: [],
  user: {},
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
    case ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      }
    case START_LOADING:
      return {
        ...state,
        loading: true,
        formErrors: {}
      }
    default:
      return state;
  }
}