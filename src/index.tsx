import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PathRoutes } from '@enums/pathRoutes';
import { Provider } from 'react-redux';
import store from './store/index';
import { Courses } from '@components/Courses/Courses';
import { CourseInfo } from '@components/CourseInfo/CourseInfo';
import { CreateCourse } from '@components/CreateCourse/CreateCourse';
import { Login } from '@components/Login/Login';
import { Registration } from '@components/Registration/Registration';

const containerRoot = document.getElementById('root');
const root = ReactDOM.createRoot(containerRoot);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path={PathRoutes.Main} element={<App />}>
            <Route path={PathRoutes.Registration} element={<Registration />} />
            <Route path={PathRoutes.Login} element={<Login />} />
            <Route path={PathRoutes.Courses} element={<Courses />} />
            <Route path={PathRoutes.CoursesId} element={<CourseInfo />} />
            <Route path={PathRoutes.CoursesAdd} element={<CreateCourse />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </Provider>
);
