import React, { FC } from 'react';
import './AuthorItem.scss';
import { Button } from '@components/common/Button/Button';
import { DeleteIcon } from '@components/assets/DeleteIcon';
import { AddIcon } from '@components/assets/AddIcon';

type AuthorItemType = {
  name: string;
  onClickDeleteAuthor: () => void;
  onClickAddAuthor?: () => void;
};

export const AuthorItem: FC<AuthorItemType> = ({
  name,
  onClickDeleteAuthor,
  onClickAddAuthor,
}) => {
  return (
    <div className="authors-item">
      <div className="authors-item__name">{name}</div>
      <Button
        className={'authors-item__btn'}
        icon={<DeleteIcon />}
        onClick={onClickDeleteAuthor}
      />
      {onClickAddAuthor && (
        <Button
          className={'authors-item__btn'}
          icon={<AddIcon />}
          onClick={onClickAddAuthor}
        />
      )}
    </div>
  );
};
