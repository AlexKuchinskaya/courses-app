import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './rootReducer';
import { AuthorsList, CourseType } from '@types';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const removeCourseFromList = (list: CourseType[], id: string) => {
  return list.filter((el) => el.id !== id);
};

export const removeAuthorFromList = (list: AuthorsList, id: string) => {
  return list.filter((el) => el?.id !== id);
};
