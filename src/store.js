import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {}; //empty object

const middleware = [thunk]; // empty middle ware

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware),
);
//this takes three things
//root reduce,initial state,apply fucking middleware


// const store = createStore(() => [], {}, applyMiddleware());

export default store;
