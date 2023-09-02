export type Course = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string;
};

export type AuthorType = {
  id: string;
  name: string;
};

export type AuthorsList = AuthorType[];

export type ButtonTypes = 'button' | 'submit' | 'reset';

export type UserType = 'login' | 'registration';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
};

export type UserRegisterDto = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginDto = {
  name: string;
  email: string;
  password: string;
};

export type CourseType = {
  id?: string;
  title: string;
  description: string;
  creationDate?: string;
  duration: number;
  authors: string[];
};
