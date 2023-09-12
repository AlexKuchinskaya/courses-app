import React, { FC, ReactNode } from 'react';
import './CourseDetails.scss';

type CourseDetailProps = {
  title: string;
  value: string | number | ReactNode;
  className?: string;
};

export const CourseDetails: FC<CourseDetailProps> = (details) => {
  return (
    <div className={`course-details ${details.className}`}>
      <span className="course-details__header">{details.title}</span>
      <div className="course-details__value">{details.value}</div>
    </div>
  );
};
