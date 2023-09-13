import React, { FC } from 'react';
import './CourseAuthors.scss';
import { AuthorItem } from '../AuthorItem/AuthorItem';
import { AuthorType, AuthorsList } from '@types';

type CourseAuthorsProps = {
  courseAuthors: AuthorsList;
  onClickDeleteAuthor: (author: AuthorType) => void;
};

export const CourseAuthors: FC<CourseAuthorsProps> = ({
  courseAuthors,
  onClickDeleteAuthor,
}) => {
  return (
    <div className="course__authors">
      <h3 className="course__authors__title">Course Authors</h3>
      <ul className="course-authors__list">
        {courseAuthors.length ? (
          courseAuthors.map((author) => {
            return (
              <li
                className="course__authors__item"
                key={`course-author-${author.id}`}
              >
                <AuthorItem
                  name={author.name}
                  onClickDeleteAuthor={() => onClickDeleteAuthor(author)}
                />
              </li>
            );
          })
        ) : (
          <li className="course__authors__item">
            <p className="course-authors__empty">Author list is empty</p>
          </li>
        )}
      </ul>
    </div>
  );
};
