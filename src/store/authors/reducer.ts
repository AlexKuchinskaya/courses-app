import { AuthorsList } from '@types';
import { AuthorsAction } from './actions';
import { AuthorsActionTypes } from './types';

export const authorsInitialState = [] as AuthorsList;

export const authorReducer = (
  state = authorsInitialState,
  action: AuthorsAction
) => {
  switch (action.type) {
    case AuthorsActionTypes.SAVE_AUTHORS:
      return action.payload;

    default:
      return state;
  }
};
