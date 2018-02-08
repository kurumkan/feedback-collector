import { FETCH_SERVEYS } from "../actions/types";

const serveysReducer = (state = [], action) => {
  switch(action.type) {
    case FETCH_SERVEYS:
      return action.payload;
    default:
      return state;
  }
};

export default serveysReducer;

