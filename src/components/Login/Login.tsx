import React, { FC } from 'react';
import './Login.scss';
import { UserLoginDto } from '@types';
import { useAuthContext } from '@contexts/AuthContext';
import { Authorization } from '@components/common/authorization/Authorization';

export const Login: FC = () => {
  const { login } = useAuthContext();
  const onSubmit = (user: UserLoginDto) => {
    login(user);
  };
  return (
    <div className="login">
      <Authorization type="login" title="Login" onClick={onSubmit} />
    </div>
  );
};
