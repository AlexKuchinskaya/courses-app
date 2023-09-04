import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { coursesReducer } from './courses/reducer';
import { authorReducer } from './authors/reducer';

export const rootReducer = combineReducers({
  courses: coursesReducer,
  authors: authorReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
