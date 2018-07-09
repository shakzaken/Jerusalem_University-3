import {combineReducers} from 'redux';
import UsersReducer from './users_reducer';
import CoursesReducer from './courses_reducer';
import DegreeReducer from './degrees_reducer';
import AuthReducer from './auth_reducer';

const rootReducer = combineReducers({
  users: UsersReducer,
  courses: CoursesReducer,
  degrees: DegreeReducer,
  auth: AuthReducer
});

export default rootReducer;