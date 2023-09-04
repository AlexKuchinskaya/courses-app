const MIN_IN_HOUR = 60;
const TEN = 10;
const ONE = 1;

export const getCourseDuration = (durationValueMin: number): string => {
  const hours = Math.trunc(durationValueMin / MIN_IN_HOUR);
  const min = durationValueMin - hours * MIN_IN_HOUR;
  const minString = min < TEN ? `0${min}` : min;
  const hourString = hours < TEN ? `0${hours}` : hours;
  const units = hours === ONE ? 'hour' : 'hours';

  return `${hourString}:${minString} ${units}`;
};
