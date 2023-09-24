import React, { FC, useState, useEffect } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import './Courses.scss';
import { Course } from '@types';
import { ButtonTexts } from '@enums/buttonTexts';
import { Link } from 'react-router-dom';
import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { useAppDispatch, useAppSelector } from '@store/utils';
import { saveAuthorsAction } from '@store/authors/actions';
import { saveCoursesAction } from '@store/courses/actions';
import { getCourses } from '@store/courses/selectors';
import { useAuthContext } from '@contexts/AuthContext';;

type CourseInfoState = {
  isCourseInfoOpened: boolean;
  course: Course | undefined;
};

export const Courses: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuthContext();

  useEffect(() => {
    dispatch(saveCoursesAction());
  }, []);

  useEffect(() => {
    dispatch(saveAuthorsAction());
  }, []);

  const courses = useAppSelector(getCourses);
  console.log('courses, ', courses.length);
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
        <div className="courses">
          <div className="courses__wrapper container-site">
            <div className="courses__top-container">
              {user?.role === 'admin' && (
                <Link to={'/courses/add'} className="button">
                  {ButtonTexts.AddNewCourse}
                </Link>
              )}
            </div>
            <ul className="courses__list">
              {courses.map((course) => {
                return (
                  <li key={course.id} className="courses__card">
                    <CourseCard course={course} />
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
