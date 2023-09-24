import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthContext, AuthContextType } from '@contexts/AuthContext';
import { CourseType, User } from '@types';
import {
  MemoryRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { appInitialState } from '@store/index';
import { coursesReducer } from '@store/courses/reducer';
import { Courses } from '../Courses';
import { FormCourse } from '@components/FormCourse/FormCourse';
import { PathRoutes } from '@enums/pathRoutes';
import { ButtonTexts } from '@enums/buttonTexts';

const mockedUsedNavigate = jest.fn();
const mockDispatch = jest.fn();
const mockCourses = jest.fn();

const mockedCourses: CourseType[] = [
  {
    id: 'courseMocktest1',
    title: 'JavaScript',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum 
                has been the industry's standard dummy text ever since the 1500s, when an unknown 
                printer took a galley of type and scrambled it to make a type specimen book. It has survived 
                not only five centuries, but also the leap into electronic typesetting, remaining essentially u
                nchanged.`,
    creationDate: '08/03/2021',
    duration: 160,
    authors: [
      '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
      'f762978b-61eb-4096-812b-ebde22838167',
    ],
  },
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockCourses(),
  useDispatch: () => mockDispatch,
}));

describe('Course Card component:', () => {
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
    mockDispatch.mockClear();
    mockCourses.mockClear();
  });

  it('fetches data and renders the courses element if there are courses', () => {
    mockCourses.mockReturnValue(mockedCourses);

    const { container } = render(<Courses />, { wrapper });

    const courses = container.querySelectorAll('.courses__card');
    expect(courses.length).toBe(mockedCourses.length);
  });

  it('don´t renders the courses element if there are no courses', () => {
    mockCourses.mockReturnValue([]);

    render(<Courses />, { wrapper });

    const courseEmpty = screen.getByText(
      'Please use "Add New Course" button to add your first course'
    ).parentNode;

    expect(courseEmpty).toBeInTheDocument();
    expect(courseEmpty).toHaveClass('course-empty');
  });

  describe('User has admin role:', () => {
    it('Admin can click the "Add new course" button and the FormCourse element is open', async () => {
      mockCourses.mockReturnValue(mockedCourses);
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[`/${PathRoutes.Courses}`]}>
            <AuthContext.Provider value={authConextStatus}>
              <Routes>
                <Route path={`/${PathRoutes.Courses}`} element={<Courses />} />
                <Route
                  path={`/${PathRoutes.CoursesAdd}`}
                  element={<FormCourse />}
                />
              </Routes>
            </AuthContext.Provider>
          </MemoryRouter>
        </Provider>
      );

      const addNewCourseButton = screen.getByRole('link', {
        name: `${ButtonTexts.AddNewCourse}`,
      });

      expect(addNewCourseButton).toBeInTheDocument();
      fireEvent.click(addNewCourseButton);

      await waitFor(() => {
        const courseForm = screen.getByText('Course edit/create page');
        console.log('courseForm', courseForm);
        expect(courseForm).toBeInTheDocument();
      });
    });
  });
});
