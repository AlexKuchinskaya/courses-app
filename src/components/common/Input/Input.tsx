import React, { ChangeEvent, FC, useState } from 'react';
import './Input.scss';

type InputProps = {
  type: 'text' | 'number' | 'password' | 'email';
  error: boolean;
  required: boolean;
  value: string;
  name?: string;
  className?: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<InputProps> = ({
  type,
  error,
  required,
  value,
  name,
  className,
  onChange,
}) => {
  return (
    <div className={`input ${className}`}>
      <label className='input__label' htmlFor={name}>
        {name}
      </label>
      <input
        id={name}
        className={`input__element ${error ? 'input--error' : ''}`}
        placeholder='Input text'
        type={type}
        required={required}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className='input__error-message'>{`${name} is required`}</div>
      )}
    </div>
  );
};
