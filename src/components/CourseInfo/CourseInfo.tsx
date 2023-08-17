import React, { FC } from 'react';
import { CourseDetails } from '../common/course-detail/CourseDetails';
import { Course } from 'src/types';
import './CourseInfo.scss';
import { Button } from '../common/Button/Button';

type CourseInfoProps = {
  course: Course;
  onBack: () => void;
};

const buttonText = 'Back';

export const CourseInfo: FC<CourseInfoProps> = ({ course, onBack }) => {
  const onBackBtnClick = () => {
    onBack();
  };

  return (
    <div className='course-info'>
      <h3 className='course-info__title'>{course.title}</h3>
      <div className='course-info__card'>
        <h4 className='course-info__title'>Description</h4>
        <div className='course-info__card-container'>
          <div className='course-info__left'>{course.description}</div>
          <div className='course-info__right'>
            <CourseDetails title={'ID:'} value={course.id} />
            <CourseDetails
              title={'Authors:'}
              value={course.authors}
              className='course-details--authors'
            />
            <CourseDetails title={'Duration:'} value={course.duration} />
            <CourseDetails title={'Created:'} value={course.creationDate} />
          </div>
        </div>
      </div>
      <Button
        text={buttonText}
        className={'course-info__btn'}
        onClick={onBackBtnClick}
      />
    </div>
  );
};
