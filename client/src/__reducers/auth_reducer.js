import {GET_USERS, NEW_USER, START_LOADING , CLEAR_ERRORS,LOGIN_USER,
  ERRORS, DELETE_USER, GET_INSTRUCTORS, LOGOUT_USER} from '../__actions/types';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  errors:{},
  loading: true,
  token: localStorage.getItem('token')
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGOUT_USER:
      return {
        ...state,
        token: '',
        user: {}
      }

    case LOGIN_USER:
      return{
        ...state,
        user: action.payload.user,
        token: action.payload.token
      }
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
        loading: true
      }
    default:
      return state;
  }
}


