import { AuthorType, AuthorsList } from '@types';
import { AuthorsActionTypes } from './types';

type SaveAuthorsAction = {
  type: AuthorsActionTypes.SAVE_AUTHORS;
  payload: AuthorsList;
};

type AddAuthorsAction = {
  type: AuthorsActionTypes.ADD_AUTHOR;
  payload: AuthorType;
};

type DeleteAuthorsAction = {
  type: AuthorsActionTypes.DELETE_AUTHOR;
  payload: AuthorType;
};

export const saveAuthorsAction = (payload: AuthorsList): SaveAuthorsAction => {
  return {
    type: AuthorsActionTypes.SAVE_AUTHORS,
    payload,
  };
};

export const addAuthorsAction = (payload: AuthorType): AddAuthorsAction => {
  return {
    type: AuthorsActionTypes.ADD_AUTHOR,
    payload,
  };
};

export const deleteAuthorsAction = (
  payload: AuthorType
): DeleteAuthorsAction => {
  return {
    type: AuthorsActionTypes.DELETE_AUTHOR,
    payload,
  };
};

export type AuthorsAction =
  | SaveAuthorsAction
  | AddAuthorsAction
  | DeleteAuthorsAction;
