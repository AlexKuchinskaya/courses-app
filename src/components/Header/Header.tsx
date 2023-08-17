import React, { FC } from 'react';
import './Header.scss';
import { HeaderLogo } from './components/Logo/Logo';
import { Button } from '../common/Button/Button';
import logo from '../../assets/logo.png';

type HeaderProps = {
  isAuthorized: boolean;
  name?: string;
};

const Header: FC<HeaderProps> = ({ isAuthorized, name }) => {
  const buttonText = isAuthorized ? 'Logout' : 'Login';
  const onAddNewCourseBtnClick = () => console.log('Click Add new course');
  return (
    <div className='header'>
      {/* <logo /> */}
      <HeaderLogo logo={logo} />
      <div className='header__login'>
        {name && isAuthorized && (
          <span className='header__user-name'>{name}</span>
        )}
        <Button text={buttonText} onClick={onAddNewCourseBtnClick} />
      </div>
    </div>
  );
};

export default Header;
