import React, { FC } from 'react';
import './Header.scss';
import { HeaderLogo } from './components/Logo/Logo';
import { Button } from '../common/Button/Button';
import logo from '../../assets/logo.png';
import { ButtonTexts } from 'src/helpers/utils';
import { useAuthContext } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

type HeaderProps = {
  isAuthorized: boolean;
  name?: string;
};

const Header: FC<HeaderProps> = ({}) => {
  const { authToken, user, logout } = useAuthContext()
  let location = useLocation();
  const isAuthLocation = location.pathname !== '/login' && location.pathname !== '/registration';
  
  const buttonText = authToken ? ButtonTexts.Logout : ButtonTexts.Login;
  const onAddNewCourseBtnClick = () => logout();
  return (
    <div className='header'>
      <div className='header__container'>
        <HeaderLogo logo={logo} width={111} height={48} />
        <div className='header__login'>
          {user?.name && (
            <span className='header__user-name'>{user.name}</span>
          )}
          {isAuthLocation && (
            <Button text={buttonText} onClick={onAddNewCourseBtnClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
