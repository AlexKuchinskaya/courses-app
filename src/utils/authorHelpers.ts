import { AuthorsList } from '@types';

const getAuthorById = (authors: AuthorsList, id: string): string => {
  return authors.find((el) => el.id === id)?.name;
};

const getListAuthors = (
  authors: AuthorsList,
  authorsId: string[]
): string[] => {
  console.log('authorsId', authorsId)
  let authorsList = [];
  authorsId.forEach((el) => {
    authorsList = [...authorsList, getAuthorById(authors, el)];
  });

  return authorsList;
};

export const authorsHelper = {
  getAuthorById,
  getListAuthors,
};
