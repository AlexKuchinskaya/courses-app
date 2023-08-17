import React, { FC, useState } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import { AuthorMock, CourseMock } from 'src/mocks';
import './Courses.scss';
import { Button } from '../common/Button/Button';
import { Course } from 'src/types';
import { CourseInfo } from '../CourseInfo/CourseInfo';

type CoursesProps = {
  courses: CourseMock[];
  authors: AuthorMock[];
};

type CourseInfoState = {
  isCourseInfoOpened: boolean;
  course: Course | undefined;
};

const buttonText = 'Add new course';
// add search bar
// add button add course
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

  const showCoursesList = () => {
    setCourseInfo({
      isCourseInfoOpened: false,
      course: undefined,
    });
  };

  const onAddNewCourseBtnClick = () => {
    console.log('Add new course');
  };

  const getListAuthors = (authorsId: string[]): string => {
    let authorsList = [];

    authorsId.forEach((el) => {
      authorsList = [...authorsList, getAuthorById(el)];
    });

    return authorsList.join(', ');
  };

  const getAuthorById = (id: string): string => {
    return authors.find((el) => el.id === id).name;
  };

  const getCoursesWithAuthorsList = () => {
    return courses.map((course) => {
      const authorList = getListAuthors(course.authors);
      return {
        ...course,
        authors: authorList,
      };
    });
  };

  const coursesWithAuthorsList: Course[] = getCoursesWithAuthorsList();

  return (
    <>
      {courseInfo.isCourseInfoOpened ? (
        <CourseInfo course={courseInfo.course} onBack={showCoursesList} />
      ) : (
        <div className='courses'>
          <div className='courses__wrapper container-site'>
            <div className='courses__top-container'>
              <Button text={buttonText} onClick={onAddNewCourseBtnClick} />
            </div>
            <ul className='courses__list'>
              {coursesWithAuthorsList.map((course) => {
                return (
                  <li key={course.id} className='courses__card'>
                    <CourseCard
                      course={course}
                      authors={authors}
                      showCourseInfo={showCourseInfoByCard}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
