import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import serveysReducer from './serveysReducer';

export default combineReducers({
  auth: authReducer,
  form,
  serveys: serveysReducer
});
