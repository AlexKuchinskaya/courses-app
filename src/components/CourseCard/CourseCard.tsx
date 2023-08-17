import React, { FC } from 'react';
import { Button } from '../common/Button/Button';
import './CourseCard.scss';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { getCourseCreationDate } from '../../helpers/getCourseCreationDate';
import { AuthorMock } from '../../mocks';
import { CourseDetails } from '../common/course-detail/CourseDetails';
import { Course } from 'src/types';

const buttonText = 'Show course';
type CourseCardProps = {
  course: Course;
  authors: AuthorMock[];
  showCourseInfo: (arg: Course) => void;
};

// delete btn
// edit btn
export const CourseCard: FC<CourseCardProps> = ({
  course,
  authors,
  showCourseInfo,
}) => {
  const showCourseBtnClick = () => {
    showCourseInfo(course);
  };

  return (
    <div className='course-card'>
      <h3 className='course-card__title'>{course.title}</h3>
      <div className='course-card__container'>
        <div className='course-card__left'>
          <p className='course-card__description'>{course.description}</p>
        </div>
        <div className='course-card__right'>
          <div className='course-card__info'>
            <CourseDetails
              title={'Authors:'}
              value={course.authors}
              className='course-details--authors'
            />

            <CourseDetails
              title={'Duration:'}
              value={getCourseDuration(course.duration)}
            />

            <CourseDetails
              title={'Created:'}
              value={getCourseCreationDate(course.creationDate)}
            />
            {/* <div className='course-card__details'>
              <span className='course-card__details-header'>Authors:</span>
              <div className='course-card__details-value'>
                {getListAuthors(course.authors)}
              </div>
            </div>

            <div className='course-card__details'>
              <span className='course-card__details-header'>Duration:</span>
              <div className='course-card__details-value'>
                {getCourseDuration(course.duration)}
              </div>
            </div>

            <div className='course-card__details'>
              <span className='course-card__details-header'>Created:</span>
              <div className='course-card__details-value'>
                {getCourseCreationDate(course.creationDate)}
              </div>
            </div> */}
          </div>
          <Button
            text={buttonText}
            className={'course-card__btn'}
            onClick={showCourseBtnClick}
          />
        </div>
      </div>
    </div>
  );
};
