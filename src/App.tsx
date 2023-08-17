import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { mockedAuthorsList, mockedCoursesList } from './mocks';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';

const App = () => (
  <>
    <Header isAuthorized={true} name='lilac-sky' />
    {mockedCoursesList.length ? (
      <Courses courses={mockedCoursesList} authors={mockedAuthorsList} />
    ) : (
      <EmptyCourseList />
    )}
  </>
);

export default App;
