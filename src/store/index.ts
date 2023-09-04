import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './rootReducer';
import { coursesInitialState } from './courses/reducer';
import { authorsInitialState } from './authors/reducer';

const appInitialState = {
  courses: coursesInitialState,
  authors: authorsInitialState,
};

const store = createStore(rootReducer, appInitialState, composeWithDevTools());

export default store;
