import {
  ADD_COMMENT,DELETE_COMMENT,GET_ALL_COMMENTS,COMMENTS_ERRORS
} from '../__actions/types';

const initialState = {
  commentsList: [],
  comment: {},
  errors: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return {
        ...state,
        commentsList: action.payload,
        errors: {}
      }
    case ADD_COMMENT:
      return {
        ...state,
        comment: action.payload
      }
    case DELETE_COMMENT:
      return {
        ...state
      }
    case COMMENTS_ERRORS:
      return{
        ...state,
        errors: action.payload
      };
    default:
      return state;
    
  }
}