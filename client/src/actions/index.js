import axios from 'axios';
import { FETCH_USER, FETCH_SERVEYS } from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const handleToken = (token) => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const sendServey = (values, history) => async dispatch => {
  const res = await axios.post('/api/serveys/', values);
  dispatch({
    type: FETCH_USER,
    user: res.data
  });
  history.push('/serveys');
};

export const fetchServeys = () => async dispatch => {
  const res = await axios.get('/api/serveys');
  dispatch({
    type: FETCH_SERVEYS,
    payload: res.data
  });
};
