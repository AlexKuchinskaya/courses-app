import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { mockedAuthorsList, mockedCoursesList } from './mocks';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';
import { Outlet } from 'react-router-dom';

const App = () => (
  <>
    <Header isAuthorized={true} name='' />
    <main className='main'>
      <h1 className='visually-hidden'>Courses App</h1>
      {/* {mockedCoursesList.length ? (
          <Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
        ) : (
          <EmptyCourseList />
        )} */}
      <Outlet />
    </main>
  </>
);

export default App;
