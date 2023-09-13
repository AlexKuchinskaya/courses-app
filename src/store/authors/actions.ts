import { AuthorType, AuthorsList } from '@types';
import { AuthorsActionTypes } from './types';
import { AppDispatch } from '@store/rootReducer';
import { addAuthor } from '@services/authorsServices';

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
  payload: AuthorType['id'];
};

export const saveAuthorsAction = (payload: AuthorsList): SaveAuthorsAction => {
  return {
    type: AuthorsActionTypes.SAVE_AUTHORS,
    payload,
  };
};

export const addAuthorAction = (authorName: string, token: string) => {
  return async (dispatch: AppDispatch) => {
    const newAuthor = await addAuthor(authorName, token);
    if (newAuthor) {
      dispatch({
        type: AuthorsActionTypes.ADD_AUTHOR,
        payload: newAuthor,
      });
    } else {
      console.error('error at add author');
    }
  };
};

export const deleteAuthorsAction = (
  payload: AuthorType['id']
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
