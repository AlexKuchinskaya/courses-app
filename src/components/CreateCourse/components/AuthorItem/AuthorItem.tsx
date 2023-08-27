import React, { FC, ReactNode } from "react";
import { Button } from "../../../common/Button/Button";
import './AuthorItem.scss';

type AuthorItemType = {
  name: string;
  icon: ReactNode;
  onClick: () => void;
};

export const AuthorItem: FC<AuthorItemType> = ({ name, icon, onClick }) => {  
  return (
    <div className="authors-item">
      <div className="authors-item__name">{name}</div>
      <Button className={'authors-item__btn'} icon={icon} onClick={onClick}/>
    </div>
  );
}