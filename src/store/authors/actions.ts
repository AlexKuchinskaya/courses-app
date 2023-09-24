import { AuthorType, AuthorsList } from '@types';
import { AuthorsActionTypes } from './types';
import { AppDispatch } from '@store/rootReducer';
import { addAuthor } from '@services/authorsServices';
import { API_PATH } from '@enums/pathApi';

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

const getAllAuthors = async () => {
  const response = await fetch(`${API_PATH}/authors/all`, {
    method: 'GET',
  });
  const responseToJson = await response.json();
  return responseToJson.result as AuthorsList;
};

export const saveAuthorsAction = () => {
  return async (dispatch: AppDispatch) => {
    const authors = await getAllAuthors();
    dispatch({
      type: AuthorsActionTypes.SAVE_AUTHORS,
      payload: authors,
    });
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
