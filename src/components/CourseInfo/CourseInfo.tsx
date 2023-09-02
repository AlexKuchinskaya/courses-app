import React, { FC } from 'react';
import { CourseDetails } from '../common/course-detail/CourseDetails';
import { Course } from 'src/types';
import './CourseInfo.scss';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import { ButtonTexts } from '../../enums/buttonTexts';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/utils';
import { getCourses } from '../../store/courses/selectors';
import { getAuthors } from '../../store/authors/selectors';
import { useAuthorsCourse } from '../../hooks/useAuthorsCourse';

type CourseInfoProps = {
  //courses: Course[];
};

export const CourseInfo: FC<CourseInfoProps> = () => {
  const courses = useAppSelector(getCourses);
  const { courseId } = useParams();
  const authorsList = useAppSelector(getAuthors);
  const { getListAuthors } = useAuthorsCourse();

  const courseByCourseId = () =>
    courses.find((course) => course.id === courseId);

  const course = courseByCourseId();
  const coursesAuthorNames = getListAuthors(authorsList, course.authors);

  return (
    <div className="course-info">
      <div className="course-info__wapper container-site container-site-info">
        <h3 className="course-info__title">{course.title}</h3>
        <div className="course-info__card">
          <h4 className="course-info__title">Description</h4>
          <div className="course-info__card-container">
            <div className="course-info__left">{course.description}</div>
            <div className="course-info__right">
              <CourseDetails
                title={'ID:'}
                value={course.id}
                className="course-details--info"
              />
              <CourseDetails
                title={'Authors:'}
                value={coursesAuthorNames.join(' ,')}
                className="course-details--info course-details--authors"
              />
              <CourseDetails
                title={'Duration:'}
                value={getCourseDuration(course.duration)}
                className="course-details--info"
              />
              <CourseDetails
                title={'Created:'}
                value={course.creationDate}
                className="course-details--info"
              />
            </div>
          </div>
        </div>
        <Link to={'/courses'} className="button course-info__btn">
          {ButtonTexts.Back}
        </Link>
      </div>
    </div>
  );
};
