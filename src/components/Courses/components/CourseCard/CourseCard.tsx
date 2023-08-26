import React, { FC } from 'react';
import { Button } from '../../../common/Button/Button';
import './CourseCard.scss';
import { getCourseDuration } from '../../../../helpers/getCourseDuration';
import { getCourseCreationDate } from '../../../../helpers/getCourseCreationDate';
import { AuthorMock } from '../../../../mocks';
import { CourseDetails } from '../../../common/course-detail/CourseDetails';
import { Course } from 'src/types';
import { DeleteIcon } from '../../../assets/DeleteIcon';
import { EditIcon } from '../../../assets/EditIcon';
import { ButtonTexts } from 'src/helpers/utils';
import { Link } from 'react-router-dom';

type CourseCardProps = {
  course: Course;
  authors: AuthorMock[];
};

export const CourseCard: FC<CourseCardProps> = ({ course, authors }) => {
  const onEditCourse = () => {
    console.log('onEditCourse');
  };

  const onDeleteCourse = () => {
    console.log('onDeleteCourse');
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
          </div>
          <div className='course-card__btn-container'>
            <Link
              to={`/courses/${course.id}`}
              className='button course-card__btn'
            >
              {ButtonTexts.ShowCourse}
            </Link>
            <Button
              className='button__small course-card__btn--delete'
              icon={<DeleteIcon />}
              onClick={onDeleteCourse}
            />
            <Button
              className='button__small course-card__btn--edit'
              icon={<EditIcon />}
              onClick={onEditCourse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
