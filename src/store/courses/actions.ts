import { CourseType } from '@types';
import { CoursesActionTypes } from './types';

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
  payload: CourseType;
};

export const addNewCourseAction = (
  courseData: CourseType
): AddNewCourseAction => ({
  type: CoursesActionTypes.ADD_COURSE,
  payload: courseData,
});

export const deleteCourseAction = (
  payload: CourseType
): DeleteCoursesAction => ({
  type: CoursesActionTypes.DELETE_COURSE,
  payload,
});

export const saveCoursesAction = (payload: CourseType[]): SaveCoursesAction => {
  return {
    type: CoursesActionTypes.SAVE_COURSES,
    payload,
  };
};

export type CoursesAction =
  | AddNewCourseAction
  | SaveCoursesAction
  | DeleteCoursesAction;
