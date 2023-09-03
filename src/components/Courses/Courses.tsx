import React, { FC, useState, useEffect } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import './Courses.scss';
import { AuthorsList, Course, CourseType } from '@types';
import { ButtonTexts } from '@enums/buttonTexts';
import { Link } from 'react-router-dom';
import { EmptyCourseList } from '../EmptyCourseList/EmptyCourseList';
import { useAppDispatch, useAppSelector } from '@store/utils';
import { saveAuthorsAction } from '@store/authors/actions';
import { saveCoursesAction } from '@store/courses/actions';
import { getCourses } from '@store/courses/selectors';

type CourseInfoState = {
  isCourseInfoOpened: boolean;
  course: Course | undefined;
};

export const Courses: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('http://localhost:4000/courses/all', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        return data.result as CourseType[];
      })
      .then((courses) => dispatch(saveCoursesAction(courses)));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/authors/all', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data authors', data);
        return data.result as AuthorsList;
      })
      .then((authors) => dispatch(saveAuthorsAction(authors)));
  }, []);

  const courses = useAppSelector(getCourses);
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
              <Link to={'/courses/add'} className="button">
                {ButtonTexts.AddNewCourse}
              </Link>
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
