import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Registration } from './components/Registration/Registration';

const containerRoot = document.getElementById('root');
const root = ReactDOM.createRoot(containerRoot);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='registration' element={<Registration />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
