import React, {
  ChangeEvent,
  FC,
  ReactNode,
  SyntheticEvent,
  useState,
} from 'react';
import { UserRegisterDto, UserType } from 'src/types';
import { Button } from '../Button/Button';
import { ButtonTexts } from 'src/helpers/utils';
import { Input } from '../Input/Input';
import './Authorization.scss';
import { Link } from 'react-router-dom';

type AuthorizationProps = {
  type: UserType;
  title: string;
  onClick: (user: UserRegisterDto) => void;
  children?: ReactNode;
};

const authorizationOptions = {
  login: {
    text: "If you don't have an account you may ",
    linkText: 'Registration',
    to: '/registration',
  },
  registration: {
    text: 'If you have an account you may ',
    linkText: 'Login',
    to: '/login',
  },
};

export const Authorization: FC<AuthorizationProps> = ({
  type,
  title,
  children,
  onClick,
}) => {
  const authorizationOption = authorizationOptions[type];
  const [errors, setErrors] = useState({
    isNameError: false,
    isEmailError: false,
    isPasswordError: false,
  });

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [evt.target.name]: evt.target.value });
  };

  const validateInputs = () => {
    const newErrors = {
      isNameError: !user.name,
      isEmailError: !user.email,
      isPasswordError: !user.password,
    };

    setErrors(newErrors);
  };

  const onSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    validateInputs();
    onClick(user);
  };

  return (
    <div className='authorization'>
      <h3 className='authorization__title'>{title}</h3>
      <div className='authorization__container'>
        <form className='authorization__form form'>
          {type === 'registration' && (
            <Input
              type='text'
              className='authorization__input'
              required={true}
              name='name'
              value={user.name}
              error={errors.isNameError}
              onChange={onChangeInputValue}
            />
          )}

          <Input
            type='email'
            className='authorization__input'
            required={true}
            name='email'
            value={user.email}
            error={errors.isEmailError}
            onChange={onChangeInputValue}
          />

          <Input
            type='password'
            className='authorization__input'
            required={true}
            name='password'
            value={user.password}
            error={errors.isPasswordError}
            onChange={onChangeInputValue}
          />

          <Button
            className='authorization__submit'
            type='submit'
            text={ButtonTexts.Login}
            onClick={onSubmit}
          />
        </form>

        <div className='authorization__link-container'>
          {authorizationOption.text}
          <Link to={authorizationOption.to} className='authorization__link'>
            {authorizationOption.linkText}
          </Link>
        </div>
      </div>
    </div>
  );
};
