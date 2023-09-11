import { Button } from '@components/common/Button/Button';
import { Input } from '@components/common/Input/Input';
import { ButtonTexts } from '@enums/buttonTexts';
import { getAuthors } from '@store/authors/selectors';
import { useAppDispatch, useAppSelector } from '@store/utils';
import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import './AuthorList.scss';
import { addAuthorAction } from '@store/authors/actions';
import { useAuthContext } from '@contexts/AuthContext';

type AuthorInput = string | undefined;

export const AuthorList: FC = () => {
  const authorsList = useAppSelector(getAuthors);
  const dispatch = useAppDispatch();
  const { authToken } = useAuthContext();

  const [authorValue, setAuthorValue] = useState<AuthorInput>(undefined);
  const [isAuthorValueError, setIsAuthorValueError] = useState(false);

  const handleChangeAuthorValue = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthorValue(e.target.value);
  };

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

    dispatch(addAuthorAction(authorValue, authToken));
    //dispatch(addAuthorsAction({ name: authorValue }));
    console.log('authorsList', authorsList);
    setAuthorValue('');
    setIsAuthorValueError(false);
  };

  return (
    <div className="author-list">
      <h3 className="author-list__title">Authors</h3>
      <div className="author-list__form">
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
          className="create-course__create-author"
          text={ButtonTexts.CreateAuthor}
          onClick={handleCreateAuthor}
        />
      </div>
    </div>
  );
};
