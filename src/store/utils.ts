import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './rootReducer';
import { CourseType } from '@types';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const removeCourseFromList = (list: CourseType[], id: string) => {
  const newList = list.filter((el) => el.id !== id);
  return newList;
};
