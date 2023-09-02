import React, { FC } from 'react';
import './CourseCard.scss';
import { getCourseDuration } from '@helpers/getCourseDuration';
import { getCourseCreationDate } from '@helpers/getCourseCreationDate';
import { CourseType } from '@types';
import { ButtonTexts } from '@enums/buttonTexts';
import { Link } from 'react-router-dom';
import { useAuthorsCourse } from '@hooks/useAuthorsCourse';
import { Button } from '@components/common/Button/Button';
import { CourseDetails } from '@components/common/course-detail/CourseDetails';
import { EditIcon } from '@components/assets/EditIcon';
import { DeleteIcon } from '@components/assets/DeleteIcon';
import { useAppDispatch, useAppSelector } from '@store/utils';
import { getAuthors } from '@store/authors/selectors';
import { deleteCourseAction } from '@store/courses/actions';

type CourseCardProps = {
  course: CourseType;
};

export const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const dispatch = useAppDispatch();
  const authorsList = useAppSelector(getAuthors);
  const { getListAuthors } = useAuthorsCourse();
  const coursesAuthorNames = getListAuthors(authorsList, course.authors);

  const onEditCourse = () => {
    console.log('onEditCourse');
  };

  const onDeleteCourse = () => {
    console.log('onDeleteCourse');
    dispatch(deleteCourseAction(course));
  };

  return (
    <div className="course-card">
      <h3 className="course-card__title">{course.title}</h3>
      <div className="course-card__container">
        <div className="course-card__left">
          <p className="course-card__description">{course.description}</p>
        </div>
        <div className="course-card__right">
          <div className="course-card__info">
            <CourseDetails
              title={'Authors:'}
              value={coursesAuthorNames.join(' ,')}
              className="course-details--authors"
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
          <div className="course-card__btn-container">
            <Link
              to={`/courses/${course.id}`}
              className="button course-card__btn"
            >
              {ButtonTexts.ShowCourse}
            </Link>
            <Button
              className="button__small course-card__btn--delete"
              icon={<DeleteIcon />}
              onClick={onDeleteCourse}
            />
            <Button
              className="button__small course-card__btn--edit"
              icon={<EditIcon />}
              onClick={onEditCourse}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
