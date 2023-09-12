import React, { FC } from 'react';
import './Duration.scss';
import { getCourseDuration } from '@utils/getCourseDuration';

type DutationProps = {
  duration: number;
  isCoursePage?: boolean;
};

export const Duration: FC<DutationProps> = ({ duration, isCoursePage }) => {
  const { durationString, units } = getCourseDuration(duration);
  return (
    <div className={`duration ${isCoursePage ? 'course-page' : ''}`}>
      <span className="duration__time">{durationString}</span>
      {units}
    </div>
  );
};
