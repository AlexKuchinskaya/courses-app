import React, { ChangeEvent, FC, useState } from 'react';
import { Authorization } from '../common/authorization/Authorization';
import { Link } from 'react-router-dom';
import { Input } from '../common/Input/Input';
import './Registration.scss';
import { useAuth } from '../../hooks/useAuth';
import { UserRegisterDto } from 'src/types';

export const Registration: FC = () => {
  const { register } = useAuth();

  const onSubmit = (user: UserRegisterDto) => {
    console.log('user', user);
    
    register(user);
  };

  return (
    <div className='registration'>
      <Authorization
        type='registration'
        title='Registration'
        onClick={onSubmit}
      ></Authorization>
    </div>
  );
};
