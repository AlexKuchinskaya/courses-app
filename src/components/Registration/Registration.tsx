import React, { FC } from 'react';
import { Authorization } from '../common/authorization/Authorization';
import './Registration.scss';
import { useAuth } from '../../hooks/useAuth';
import { UserRegisterDto } from 'src/types';

export const Registration: FC = () => {
  const { register } = useAuth();

  const onSubmit = (user: UserRegisterDto) => {
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
