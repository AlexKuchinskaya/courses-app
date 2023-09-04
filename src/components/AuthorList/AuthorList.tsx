import { AuthorItem } from '@components/CreateCourse/components/AuthorItem/AuthorItem';

import { Button } from '@components/common/Button/Button';
import { Input } from '@components/common/Input/Input';
import { ButtonTexts } from '@enums/buttonTexts';
import { getAuthors } from '@store/authors/selectors';
import { useAppDispatch, useAppSelector } from '@store/utils';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import './AuthorList.scss';
import { addAuthorsAction, deleteAuthorsAction } from '@store/authors/actions';
import { AuthorType, AuthorsList as Authors } from '@types';

type AuthorInput = string | null;
export const AuthorList: FC = () => {
  const authorsList = useAppSelector(getAuthors);
  const dispatch = useAppDispatch();

  const [authorValue, setAuthorValue] = useState<AuthorInput>(null);
  const [isAuthorValueError, setIsAuthorValueError] = useState(false);

  //const [courseAuthors, setCourseAuthors] = useState<AuthorList>([]);

  const handleChangeAuthorValue = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthorValue(e.target.value);
  };

  const getCurrentAuthor = (list: Authors, id: string) =>
    list.find((author) => author.id === id);

  const handleCreateAuthor = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(authorValue);
    if (!authorValue.trim().length) {
      setIsAuthorValueError(true);
      return;
    }

    const isAuthorExist = Boolean(
      authorsList.filter((author) => author.name === authorValue).length
    );

    if (isAuthorExist) {
      // TODO: PrintERROR
      return;
    }

    dispatch(addAuthorsAction({ name: authorValue }));
    console.log('authorsList', authorsList);
    setAuthorValue('');
    setIsAuthorValueError(false);
  };

  const handleAddAuthorToCourseList = (id: string) => {
    /* const currentAuthor = getCurrentAuthor(authorsList, id);

    if (currentAuthor) {
      const filteredAuthorsList = authorsList.filter(
        (author) => author !== currentAuthor
      );
      setAuthorsList(filteredAuthorsList);
    }

    setCourseAuthors([...courseAuthors, currentAuthor]); */
    console.log('add to course')
  };

  const handleDeleteFromAuthorsList = (author: AuthorType) => {
    /* const currentAuthorCourse = getCurrentAuthor(courseAuthors, id);

    if (currentAuthorCourse) {
      const filteredCourseAuthorsList = courseAuthors.filter(
        (author) => author !== currentAuthorCourse
      );
      setCourseAuthors(filteredCourseAuthorsList);
    } */

    dispatch(deleteAuthorsAction(author));
  };

  return (
    <div className="author-list">
      <h3 className="author-list__title">Authors</h3>
      <form className="author-list__form" onSubmit={handleCreateAuthor}>
        <Input
          type="text"
          className="author-list__input"
          required={false}
          name="Author Name"
          value={authorValue}
          error={isAuthorValueError}
          onChange={handleChangeAuthorValue}
        />
        <Button
          type="submit"
          className="create-course__create-author"
          text={ButtonTexts.CreateAuthor}
        />
      </form>
      <div className="author-list__list-container">
        {authorsList.map((author) => {
          return (
            <AuthorItem
              key={author.id}
              name={author.name}
              onClickDeleteAuthor={() => handleDeleteFromAuthorsList(author)}
              onClickAddAuthor={() => handleAddAuthorToCourseList(author.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
