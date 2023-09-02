import React, { FC } from 'react';
import './Registration.scss';
import { UserRegisterDto } from '@types';
import { Authorization } from '@components/common/authorization/Authorization';
import { useAuth } from '@hooks/useAuth';

export const Registration: FC = () => {
  const { register } = useAuth();

  const onSubmit = (user: UserRegisterDto) => {
    register(user);
  };

  return (
    <div className="registration">
      <Authorization
        type="registration"
        title="Registration"
        onClick={onSubmit}
      ></Authorization>
    </div>
  );
};
