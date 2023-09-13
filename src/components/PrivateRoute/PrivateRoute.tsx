import { useAuthContext } from '@contexts/AuthContext';
import { PathRoutes } from '@enums/pathRoutes';
import React, { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuthContext();
  return user?.role === 'admin' ? (
    children
  ) : (
    <Navigate to={`/${PathRoutes.Courses}`} />
  );
};
