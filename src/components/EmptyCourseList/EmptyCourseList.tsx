import React, { FC } from 'react';
import './EmptyCourseList.scss';
import { ButtonTexts } from 'src/helpers/utils';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const EmptyCourseList: FC = () => {
  const { user } = useAuthContext();

  return (
    <div className="course-empty">
      <h3 className="course-empty__title">Your List Is Empty</h3>
      <p className="course-empty__description">
        Please use ’Add New Course’ button to add your first course
      </p>
      {user?.role === 'admin' ? (
        <Link className="button" to={'/courses/add'}>
          {ButtonTexts.AddNewCourse}
        </Link>
      ) : (
        <div className="course-empty__non-admin">
          You don't have permissions to create a course. Please log in as ADMIN
        </div>
      )}
    </div>
  );
};
