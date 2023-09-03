import React, { ChangeEvent, FC } from 'react';
import './Textarea.scss';

type TextareaProps = {
  className?: string;
  name: string;
  value: string;
  error: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Textarea: FC<TextareaProps> = ({
  className,
  name,
  value,
  error,
  onChange,
}) => {
  return (
    <div className={`textarea ${className}`}>
      <label className="textarea__label" htmlFor={name}>
        {name}
      </label>
      <div className="textarea__wrapper">
        <textarea
          className={`textarea__element ${
            error ? 'textarea__element--error' : ''
          }`}
          name={name}
          placeholder="Input text"
          value={value}
          onChange={onChange}
        />
        {error && (
          <div className="textarea__error-message">{`${name} is required`}</div>
        )}
      </div>
    </div>
  );
};
