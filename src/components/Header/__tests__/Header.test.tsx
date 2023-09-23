import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { AuthContext, AuthContextType } from '@contexts/AuthContext';
import { User } from '@types';
import { BrowserRouter as Router } from 'react-router-dom';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation: jest
    .fn()
    .mockReturnValue({
      pathname: '/login',
      search: '',
      state: null,
      hash: '',
    })
    .mockReturnValueOnce({
      pathname: '/courses',
      search: '',
      state: null,
      hash: '',
    }),
}));

describe('Header component:', () => {
  const mockedUser: User = {
    id: '222',
    name: 'Admin',
    email: 'admin@email.com',
    role: 'admin',
    password: '2222',
  };

  let authConextStatus: AuthContextType = {
    user: mockedUser,
    setUser: jest.fn,
    authToken: '1234',
    setAuthToken: jest.fn,
    login: jest.fn,
    logout: jest.fn,
  };

  const wrapper = ({ children }) => (
    <Router>
      <AuthContext.Provider value={authConextStatus}>
        {children}
      </AuthContext.Provider>
    </Router>
  );

  it('show the user name and button Logout if the user is logged', () => {
    render(<Header />, { wrapper });

    const logoutButton = screen.getByText('Logout');
    const userName = screen.getByText('Admin');

    expect(userName).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it('renders the header element', () => {
    render(<Header />, { wrapper });

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
  });

  it('contains the logo', () => {
    render(<Header />, { wrapper });

    const logo = screen.getByRole('img');

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('logo');
  });

  it('don´t show the user name and the button Logout if the user is not logged in', () => {
    authConextStatus = {
      user: null,
      setUser: jest.fn,
      authToken: null,
      setAuthToken: jest.fn,
      login: jest.fn,
      logout: jest.fn,
    };

    const { queryByText } = render(<Header />, { wrapper });

    const userName = queryByText('Admin');
    const logoutButton = queryByText('Logout');

    expect(logoutButton).not.toBeInTheDocument();
    expect(userName).not.toBeInTheDocument();
  });
});
