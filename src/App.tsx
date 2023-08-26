import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import { Courses } from './components/Courses/Courses';
import { mockedAuthorsList, mockedCoursesList } from './mocks';
import { EmptyCourseList } from './components/EmptyCourseList/EmptyCourseList';
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

const App = () => (
  <AuthContextProvider>
    <Header isAuthorized={true} name='' />
    <main className='main'>
      <h1 className='visually-hidden'>Courses App</h1>
      <Outlet />
    </main>
  </AuthContextProvider>
);

export default App;
