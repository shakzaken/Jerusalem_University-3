import {CLEAR_ERRORS,LOGIN_USER,
  AUTH_ERRORS, LOGOUT_USER,AUTH_GET_USER, INIT_AUTH} from '../__actions/types';


const initialState = {
  user: {},
  errors:{},
  token: '',
  isAuth: false,
  isAdmin: false
}

export default function(state = initialState, action) {
  switch (action.type) {

    case INIT_AUTH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuth: true,
        isAdmin: action.payload.isAdmin,
        errors: {}
      }

    case LOGOUT_USER:
      return {
        ...state,
        token: '',
        user: {},
        isAuth: false,
        isAdmin: false,
        errors: {}
      }

    case LOGIN_USER:
      return{
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuth: true,
        isAdmin: action.payload.isAdmin
      }
    case AUTH_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      }
    case AUTH_GET_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;
  }
}







