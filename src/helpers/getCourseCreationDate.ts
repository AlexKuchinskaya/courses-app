export const getCourseCreationDate = (creationValue: string) => {
  const date = new Date(creationValue);
  const fullYear = date.getFullYear();
  const month = date.getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const day = date.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;

  return `${formattedDay}.${formattedMonth}.${fullYear}`;
};
