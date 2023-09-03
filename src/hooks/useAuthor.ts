import { ChangeEvent, useState } from 'react';
import { AuthorType } from '@types';

type AuthorList = AuthorType[];

export const useAuthor = () => {
  const [authorValue, setAuthorValue] = useState('');
  const [authorsList, setAuthorsList] = useState<AuthorList>([]);
  const [courseAuthors, setCourseAuthors] = useState<AuthorList>([]);

  const onChangeAuthorValue = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthorValue(e.target.value);
  };

  const getCurrentAuthor = (list: AuthorList, id: string) =>
    list.find((author) => author.id === id);

  const onCreateAuthor = () => {
    console.log(authorValue);
    if (!authorValue.trim().length) return;

    const isAuthorExist =
      Boolean(
        authorsList.filter((author) => author.name === authorValue).length
      ) ||
      Boolean(
        courseAuthors.filter((author) => author.name === authorValue).length
      );

    if (isAuthorExist) {
      // TODO: PrintERROR
      return;
    }

    setAuthorsList([
      ...authorsList,
      {
        id: crypto.randomUUID(),
        name: authorValue.trim(),
      },
    ]);
    setAuthorValue('');
  };

  const onAddAuthorToCourseList = (id: string) => {
    const currentAuthor = getCurrentAuthor(authorsList, id);

    if (currentAuthor) {
      const filteredAuthorsList = authorsList.filter(
        (author) => author !== currentAuthor
      );
      setAuthorsList(filteredAuthorsList);
    }

    setCourseAuthors([...courseAuthors, currentAuthor]);
  };

  const onDeleteFromCourseAuthors = (id: string) => {
    const currentAuthorCourse = getCurrentAuthor(courseAuthors, id);

    if (currentAuthorCourse) {
      const filteredCourseAuthorsList = courseAuthors.filter(
        (author) => author !== currentAuthorCourse
      );
      setCourseAuthors(filteredCourseAuthorsList);
    }

    setAuthorsList([...authorsList, currentAuthorCourse]);
  };

  return {
    authorValue,
    authorsList,
    courseAuthors,
    onChangeAuthorValue,
    onCreateAuthor,
    onAddAuthorToCourseList,
    onDeleteFromCourseAuthors,
  };
};
