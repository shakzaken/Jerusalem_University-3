import {  AUTH_CLEAR_ERRORS,LOGIN_USER,
  AUTH_ERRORS, LOGOUT_USER} from '../__actions/types';

const initialState = {
  user: getUser(),
  errors:{},
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
    case AUTH_ERRORS:
      return {
        ...state,
        errors: action.payload
      }
    case AUTH_CLEAR_ERRORS:
      return {
        ...state,
        errors: {}
      }
    default:
      return state;
  }
}


function getUser(){
  const user = JSON.parse(localStorage.getItem('user'));
  if(user) return user;
  else return {};
}


