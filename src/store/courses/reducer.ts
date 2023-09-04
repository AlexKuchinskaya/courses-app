import { CourseType } from '@types';
import { removeCourseFromList } from '../utils';
import { CoursesAction } from './actions';
import { CoursesActionTypes } from './types';

export const coursesInitialState = [] as CourseType[];

export const coursesReducer = (
  state = coursesInitialState,
  action: CoursesAction
) => {
  switch (action.type) {
    case CoursesActionTypes.SAVE_COURSES:
      return action.payload;
    case CoursesActionTypes.ADD_COURSE:
      return [...state, action.payload];
    case CoursesActionTypes.DELETE_COURSE:
      return removeCourseFromList(state, action.payload.id);
    default:
      return state;
  }
};
