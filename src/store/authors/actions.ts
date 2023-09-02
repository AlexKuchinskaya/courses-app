import { AuthorsList } from '../../types';
import { AuthorsActionTypes } from './types';

type SaveAuthorsAction = {
  type: AuthorsActionTypes.SAVE_AUTHORS;
  payload: AuthorsList;
};

export const saveAuthorsAction = (payload: AuthorsList): SaveAuthorsAction => {
  return {
    type: AuthorsActionTypes.SAVE_AUTHORS,
    payload,
  };
};

export type AuthorsAction = SaveAuthorsAction;
