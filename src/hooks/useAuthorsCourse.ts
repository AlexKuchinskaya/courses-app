import { AuthorsList } from 'src/types';

export const useAuthorsCourse = () => {
  const getListAuthors = (
    authors: AuthorsList,
    authorsId: string[]
  ): string[] => {
    let authorsList = [];
    authorsId.forEach((el) => {
      authorsList = [...authorsList, getAuthorById(authors, el)];
    });

    return authorsList;
  };

  const getAuthorById = (authors: AuthorsList, id: string): string => {
    return authors.find((el) => el.id === id)?.name;
  };

  return { getListAuthors };
};
