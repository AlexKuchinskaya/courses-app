import React from 'react';
import { render, screen } from '@testing-library/react';

import { AuthContext, AuthContextType } from '@contexts/AuthContext';
import { CourseType, User } from '@types';
import { BrowserRouter as Router } from 'react-router-dom';
import { CourseCard } from '../CourseCard';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { appInitialState } from '@store/index';
import { coursesReducer } from '@store/courses/reducer';
import { authorsHelper } from '@utils/authorHelpers';
import { getCourseDuration } from '@utils/getCourseDuration';
import { getCourseCreationDate } from '@utils/getCourseCreationDate';

const mockedUsedNavigate = jest.fn();
const mockedAuthorsList = [
  {
    id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
    name: 'Author1',
  },
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockReturnValue([
    {
      id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
      name: 'Author1',
    },
  ]),
}));

describe('Course Card component:', () => {
  const courseCardProps: CourseType = {
    id: 'course-1',
    title: 'React',
    description: 'React Course level 1',
    creationDate: '12/08/2023',
    duration: 60,
    authors: [
      'df32994e-b23d-497c-9e4d-84e4dc02882f',
      '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
    ],
  };
  const mockedUser: User = {
    id: '222',
    name: 'Admin',
    email: 'admin@email.com',
    role: 'admin',
    password: '2222',
  };

  const authConextStatus: AuthContextType = {
    user: mockedUser,
    setUser: jest.fn,
    authToken: '1234',
    setAuthToken: jest.fn,
    login: jest.fn,
    logout: jest.fn,
  };

  const initialState = appInitialState.courses;
  const store = createStore(coursesReducer, initialState);

  const wrapper = ({ children }) => (
    <Provider store={store}>
      <Router>
        <AuthContext.Provider value={authConextStatus}>
          {children}
        </AuthContext.Provider>
      </Router>
    </Provider>
  );

  beforeEach(() => {
    render(<CourseCard course={courseCardProps} />, { wrapper });
  });

  it('renders the course card element', () => {
    const courseCard = screen.getByText('React').parentNode;
    expect(courseCard).toBeInTheDocument();
    expect(courseCard).toHaveClass('course-card');
  });

  it('contains the title', () => {
    const title = screen.getByText('React');
    expect(title).toBeInTheDocument();
  });

  it('contains the description', () => {
    const description = screen.getByText('React Course level 1');
    expect(description).toBeInTheDocument();
  });

  it('contains the duration in the correct format', () => {
    const courseCard = screen.getByText('Duration:').parentNode;
    const duration = courseCard.querySelector('.course-details__value');
    const expectedDuration = getCourseDuration(courseCardProps.duration).result;

    expect(duration).toHaveTextContent(expectedDuration);
  });

  it('contains the date in the correct format', () => {
    const courseCard = screen.getByText('Created:').parentNode;
    const duration = courseCard.querySelector('.course-details__value');
    const expectedDate = getCourseCreationDate(courseCardProps.creationDate);

    expect(duration).toHaveTextContent(expectedDate);
  });

  it('contains the authors', () => {
    const courseCard = screen.getByText('Authors:').parentNode;
    const authors = courseCard.querySelector('.course-details__value');
    const expectedAuthors = authorsHelper
      .getListAuthors(mockedAuthorsList, courseCardProps.authors)
      .join(' ,');

    expect(authors).toHaveTextContent(expectedAuthors);
  });
});
