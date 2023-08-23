import React, { ChangeEvent, FC, useState } from 'react';
import { Authorization } from '../common/authorization/Authorization';
import { Link } from 'react-router-dom';
import { Input } from '../common/Input/Input';
import './Registration.scss';

export const Registration: FC = () => {
  const onSubmit = () => {
    console.log('submit registration');
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
