import React, { ChangeEvent, FC, KeyboardEvent } from 'react';
import './Input.scss';

type InputProps = {
  type: 'text' | 'number' | 'password' | 'email';
  error: boolean;
  required: boolean;
  value: string | number;
  name?: string;
  className?: string;
  min?: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
};

export const Input: FC<InputProps> = ({
  type,
  error,
  required,
  value,
  name,
  className,
  min,
  onChange,
  onKeyUp,
}) => {
  return (
    <div className={`input ${className}`}>
      <label className="input__label" htmlFor={name}>
        {name}
      </label>
      <div className="input__wrapper">
        <input
          id={name}
          name={name}
          className={`input__element ${error ? 'input--error' : ''}`}
          placeholder="Input text"
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          min={min}
          onKeyUp={onKeyUp}
        />
        {error && (
          <div className="input__error-message">{`${name} is required`}</div>
        )}
      </div>
    </div>
  );
};
