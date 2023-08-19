import React, { FC } from 'react';
import { CourseDetails } from '../common/course-detail/CourseDetails';
import { Course } from 'src/types';
import './CourseInfo.scss';
import { Button } from '../common/Button/Button';
import { getCourseDuration } from '../../helpers/getCourseDuration';

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
      <div className='course-info__wapper container-site container-site-info'>
        <h3 className='course-info__title'>{course.title}</h3>
        <div className='course-info__card'>
          <h4 className='course-info__title'>Description</h4>
          <div className='course-info__card-container'>
            <div className='course-info__left'>{course.description}</div>
            <div className='course-info__right'>
              <CourseDetails
                title={'ID:'}
                value={course.id}
                className='course-details--info'
              />
              <CourseDetails
                title={'Authors:'}
                value={course.authors}
                className='course-details--info course-details--authors'
              />
              <CourseDetails
                title={'Duration:'}
                value={getCourseDuration(course.duration)}
                className='course-details--info'
              />
              <CourseDetails
                title={'Created:'}
                value={course.creationDate}
                className='course-details--info'
              />
            </div>
          </div>
        </div>
        <Button
          text={buttonText}
          className={'course-info__btn'}
          onClick={onBackBtnClick}
        />
      </div>
    </div>
  );
};
