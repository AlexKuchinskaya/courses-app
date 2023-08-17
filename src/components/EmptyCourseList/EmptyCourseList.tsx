import React, { FC } from 'react';
import { Button } from '../common/Button/Button';
import './EmptyCourseList.scss';

const buttonText = 'Add new course';

export const EmptyCourseList: FC = () => {
  const onAddNewCourseBtnClick = () => {
    console.log('Add new course');
  };

  return (
    <div className='course-empty'>
      <h3 className='course-empty__title'>Your List Is Empty</h3>
      <p className='course-empty__description'>
        Please use ’Add New Course’ button to add your first course
      </p>
      <Button text={buttonText} onClick={onAddNewCourseBtnClick} />
    </div>
  );
};