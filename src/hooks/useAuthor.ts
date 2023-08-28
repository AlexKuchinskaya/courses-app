import { ChangeEvent, useState } from 'react';

type Author = {
  idAuthor: string;
  authorName: string;
};

type AuthorList = Author[];

export const useAuthor = () => {
  const [authorValue, setAuthorValue] = useState('');
  const [authorsList, setAuthorsList] = useState<AuthorList>([]);
  const [courseAuthors, setCourseAuthors] = useState<AuthorList>([]);

  const onChangeAuthorValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setAuthorValue(evt.target.value);
  };

  const getCurrentAuthor = (list: AuthorList, id: string) =>
    list.find((author) => author.idAuthor === id);

  const onCreateAuthor = () => {
    console.log(authorValue);
    if (!authorValue.trim().length) return;

    const isAuthorExist =
      Boolean(
        authorsList.filter((author) => author.authorName === authorValue).length
      ) ||
      Boolean(
        courseAuthors.filter((author) => author.authorName === authorValue)
          .length
      );

    if (isAuthorExist) {
      // TODO: PrintERROR
      return;
    }

    setAuthorsList([
      ...authorsList,
      {
        idAuthor: crypto.randomUUID(),
        authorName: authorValue.trim(),
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
