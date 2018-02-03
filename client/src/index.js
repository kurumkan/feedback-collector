import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import 'materialize-css/dist/css/materialize.min.css';

import rootReducer from './reducers'
import App from './components/App';

const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

window.axios = axios;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));