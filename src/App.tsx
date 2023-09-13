import React from 'react';
import './App.scss';
import Header from '@components/Header/Header';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main__header visually-hidden">Courses App</h1>
        <Outlet />
      </main>
    </>
  );
};

export default App;
