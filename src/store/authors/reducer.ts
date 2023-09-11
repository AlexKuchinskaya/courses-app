import { AuthorsList } from '@types';
import { AuthorsAction } from './actions';
import { AuthorsActionTypes } from './types';
import { removeAuthorFromList } from '@store/utils';

export const authorsInitialState = [] as AuthorsList;

export const authorReducer = (
  state = authorsInitialState,
  action: AuthorsAction
) => {
  switch (action.type) {
    case AuthorsActionTypes.SAVE_AUTHORS:
      return action.payload;
    case AuthorsActionTypes.ADD_AUTHOR:
      return [...state, action.payload];
    case AuthorsActionTypes.DELETE_AUTHOR:
      return removeAuthorFromList(state, action.payload);
    default:
      return state;
  }
};
