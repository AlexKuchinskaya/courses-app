import React, { FC, useState } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import { AuthorMock } from 'src/mocks';
import './Courses.scss';
import { Course } from 'src/types';
import { ButtonTexts } from 'src/helpers/utils';
import { Link } from 'react-router-dom';
import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';

type CoursesProps = {
  courses: Course[];
  authors?: AuthorMock[];
};

type CourseInfoState = {
  isCourseInfoOpened: boolean;
  course: Course | undefined;
};

export const Courses: FC<CoursesProps> = ({ courses, authors }) => {
  const [courseInfo, setCourseInfo] = useState<CourseInfoState>({
    isCourseInfoOpened: false,
    course: undefined,
  });

  const showCourseInfoByCard = (course: Course) => {
    setCourseInfo({
      isCourseInfoOpened: true,
      course,
    });
  };

  return (
    <>
      {courses.length ? (
        <div className='courses'>
          <div className='courses__wrapper container-site'>
            <div className='courses__top-container'>
              <Link to={'/courses/add'} className='button'>
                {ButtonTexts.AddNewCourse}
              </Link>
            </div>
            <ul className='courses__list'>
              {courses.map((course) => {
                return (
                  <li key={course.id} className='courses__card'>
                    <CourseCard course={course} authors={authors} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <EmptyCourseList />
      )}
    </>
  );
};
