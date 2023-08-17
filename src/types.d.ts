export type Course = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string;
};

export type AuthorsType = {
  id: string;
  name: string;
};

export type AuthorsList = AuthorsType[];
