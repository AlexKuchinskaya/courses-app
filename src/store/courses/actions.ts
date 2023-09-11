import { CourseType } from '@types';
import { CoursesActionTypes } from './types';
import { AppDispatch } from '@store/rootReducer';
import { addCourse, deleteCourse } from '@services/courseServices';
import { API_PATH } from '@enums/pathApi';

type AddNewCourseAction = {
  type: CoursesActionTypes.ADD_COURSE;
  payload: CourseType;
};

type SaveCoursesAction = {
  type: CoursesActionTypes.SAVE_COURSES;
  payload: CourseType[];
};

type DeleteCoursesAction = {
  type: CoursesActionTypes.DELETE_COURSE;
  payload: CourseType['id'];
};

export const addNewCourseAction = (course: CourseType, token: string) => {
  return async (dispatch: AppDispatch) => {
    const newCourse = await addCourse(course, token);
    if (newCourse) {
      dispatch({
        type: CoursesActionTypes.ADD_COURSE,
        payload: newCourse,
      });
    } else {
      console.error('error at delete course');
    }
  };
};

export const deleteCourseAction = (
  courseId: CourseType['id'],
  token: string
) => {
  return async (dispatch: AppDispatch) => {
    const response = await deleteCourse(courseId, token);
    if (response.ok) {
      dispatch({
        type: CoursesActionTypes.DELETE_COURSE,
        payload: courseId,
      });
    } else {
      console.error('error at delete course');
    }
  };
};

//change save courses to init courses
const getAllCourses = async () => {
  const response = await fetch(`${API_PATH}/courses/all`, {
    method: 'GET',
  });

  const responseToJson = await response.json();
  return responseToJson.result as CourseType[];
};

export const saveCoursesAction = () => {
  return async (dispatch: AppDispatch) => {
    const courses = await getAllCourses();
    dispatch({
      type: CoursesActionTypes.SAVE_COURSES,
      payload: courses,
    });
  };
};

export type CoursesAction =
  | AddNewCourseAction
  | SaveCoursesAction
  | DeleteCoursesAction;
