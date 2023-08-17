import React, { FC } from 'react';

type HeaderLogoProps = {
  logo: string;
  width: number;
  height: number;
};

export const HeaderLogo: FC<HeaderLogoProps> = ({ logo, width, height }) => (
  <img className='logo' src={logo} alt='Logo' width={width} height={height} />
);
