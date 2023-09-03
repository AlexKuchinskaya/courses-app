import React, { FC, ReactNode, SyntheticEvent } from 'react';
import './Button.scss';
import { ButtonTypes } from '@types';

type ButtonProps = {
  type?: ButtonTypes;
  text?: string;
  className?: string;
  icon?: ReactNode;
  onClick?: (e: SyntheticEvent) => void;
};

export const Button: FC<ButtonProps> = ({
  type,
  text,
  className,
  icon,
  onClick,
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      type={type ? type : 'button'}
    >
      {icon && <span className="icon">{icon}</span>}
      {text}
    </button>
  );
};
