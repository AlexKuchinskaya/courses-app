import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { mockedAuthorsList, mockedCoursesList } from './mocks';
import { Course } from './types';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { PathRoutes } from './enums/pathRoutes';

const containerRoot = document.getElementById('root');
const root = ReactDOM.createRoot(containerRoot);

const getListAuthors = (authorsId: string[]): string => {
  let authorsList = [];

  authorsId.forEach((el) => {
    authorsList = [...authorsList, getAuthorById(el)];
  });

  return authorsList.join(', ');
};

const getAuthorById = (id: string): string => {
  return mockedAuthorsList.find((el) => el.id === id).name;
};

const getCoursesWithAuthorsList = () => {
  return mockedCoursesList.map((course) => {
    const authorList = getListAuthors(course.authors);
    return {
      ...course,
      authors: authorList,
    };
  });
};

const coursesWithAuthorsList: Course[] = getCoursesWithAuthorsList();

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path={PathRoutes.Main} element={<App />}>
          <Route path={PathRoutes.Registration} element={<Registration />} />
          <Route path={PathRoutes.Login} element={<Login />} />
          <Route
            path={PathRoutes.Courses}
            element={<Courses courses={coursesWithAuthorsList} />}
          />
          <Route
            path={PathRoutes.CoursesId}
            element={<CourseInfo courses={coursesWithAuthorsList} />}
          />
          <Route path={PathRoutes.CoursesAdd} element={<CreateCourse />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
