import React, { ChangeEvent, FC, useState } from 'react';
import { Authorization } from '../common/authorization/Authorization';
import './Login.scss';
import { UserLoginDto } from '../../types';
import { useAuthContext } from '../../contexts/AuthContext';

export const Login: FC = () => {
  const { login } = useAuthContext();
  const onSubmit = (user: UserLoginDto) => {
    login(user);
  };
  return (
    <div className='login'>
      <Authorization
        type='login'
        title='Login'
        onClick={onSubmit}
      />
    </div>
  );
};
