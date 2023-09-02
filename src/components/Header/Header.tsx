import React, { FC } from 'react';
import './Header.scss';
import { HeaderLogo } from './components/Logo/Logo';
import logo from '@assets/logo.png';
import { ButtonTexts } from '@enums/buttonTexts';
import { useAuthContext } from '@contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { PathRoutes } from '@enums/pathRoutes';
import { Button } from '@components/common/Button/Button';

const Header: FC = () => {
  const { authToken, user, logout } = useAuthContext();
  const location = useLocation();
  const isAuthLocation =
    location.pathname !== PathRoutes.Login &&
    location.pathname !== PathRoutes.Registration;

  const buttonText = authToken ? ButtonTexts.Logout : ButtonTexts.Login;
  const onAddNewCourseBtnClick = () => logout();
  return (
    <div className="header">
      <div className="header__container">
        <HeaderLogo logo={logo} width={111} height={48} />
        <div className="header__login">
          {user?.name && <span className="header__user-name">{user.name}</span>}
          {isAuthLocation && (
            <Button text={buttonText} onClick={onAddNewCourseBtnClick} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
