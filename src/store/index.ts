import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';
import { coursesInitialState } from './courses/reducer';
import { authorsInitialState } from './authors/reducer';
import { applyMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export const appInitialState = {
  courses: coursesInitialState,
  authors: authorsInitialState,
};

const store = createStore(
  rootReducer,
  appInitialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
