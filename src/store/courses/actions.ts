import { CourseType } from '../../types';
import { CoursesActionTypes } from './types';

type AddNewCourseAction = {
  type: CoursesActionTypes.ADD_COURSE;
  payload: CourseType;
};

export const addNewCourseAction = (
  courseData: CourseType
): AddNewCourseAction => ({
  type: CoursesActionTypes.ADD_COURSE,
  payload: courseData,
});

/* const deleteCourseAction = (payload) => ({
  type: CoursesActionTypes.DELETE_COURSE,
  payload,
}); */

type SaveCoursesAction = {
  type: CoursesActionTypes.SAVE_COURSES;
  payload: CourseType[];
};

export const saveCoursesAction = (payload: CourseType[]): SaveCoursesAction => {
  console.log('payload', payload);
  return {
    type: CoursesActionTypes.SAVE_COURSES,
    payload,
  };
};

export type CoursesAction = AddNewCourseAction | SaveCoursesAction;
