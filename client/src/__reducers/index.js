import {combineReducers} from 'redux';
import UsersReducer from './users_reducer';
import CoursesReducer from './courses_reducer';
import DegreeReducer from './degrees_reducer';
import AuthReducer from './auth_reducer';
import CommentsReducer from './comments_reducer';

const rootReducer = combineReducers({
  users: UsersReducer,
  courses: CoursesReducer,
  degrees: DegreeReducer,
  auth: AuthReducer,
  comments: CommentsReducer
});

export default rootReducer;