import React, { FC } from 'react';
import './Button.scss';

type ButtonProps = {
  text: string;
  className?: string;
  onClick: () => void;
};

export const Button: FC<ButtonProps> = ({ text, className, onClick }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};
