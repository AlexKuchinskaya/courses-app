import React, { FC, ReactNode } from 'react';
import './Button.scss';

type ButtonProps = {
  text?: string;
  className?: string;
  icon?: ReactNode;
  onClick: () => void;
};

export const Button: FC<ButtonProps> = ({ text, className, icon, onClick }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {icon && <span className='icon'>{icon}</span>}
      {text}
    </button>
  );
};
