import { API_PATH } from '@enums/pathApi';
import { CourseType } from '@types';

export const deleteCourse = async (
  courseId: CourseType['id'],
  token: string
) => {
  const response = await fetch(`${API_PATH}/courses/${courseId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  });
  return response;
};

export const addCourse = async (course: CourseType, token: string) => {
  const response = await fetch(`${API_PATH}/courses/add`, {
    method: 'POST',
    body: JSON.stringify(course),
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  });

  const responseToJson = await response.json();
  return responseToJson.result as CourseType;
};
