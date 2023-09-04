import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  useState,
} from 'react';
import { Input } from '../common/Input/Input';

import './CreateCourse.scss';
import { useAuthor } from '@hooks/useAuthor';
import { useNavigate } from 'react-router-dom';
import { ButtonTexts } from '@enums/buttonTexts';
import { Button } from '@components/common/Button/Button';
import { Textarea } from '@components/common/Textarea/Textarea';
import { addNewCourseAction } from '@store/courses/actions';
import { getCourses } from '@store/courses/selectors';
import { useAppDispatch, useAppSelector } from '@store/utils';
import { AuthorList } from '@components/AuthorList/AuthorList';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { getCourseDuration } from '@utils/getCourseDuration';

type CourseInput = {
  title: string | null;
  description: string | null;
  duration: number;
};

export const CreateCourse: FC = () => {
  const { courseAuthors } = useAuthor();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courses = useAppSelector(getCourses);

  const [course, setCourse] = useState<CourseInput>({
    title: null,
    description: null,
    duration: 0,
  });

  const [errors, setErrors] = useState({
    isTitleError: false,
    isDescriptionError: false,
    isDurationError: false,
  });

  const [isSuccessful, setSuccessful] = useState(true);

  const validateInputs = () => {
    const newErrors = {
      isTitleError: course.title.length <= 2,
      isDurationError: course.duration <= 0,
      isDescriptionError: course.description.length <= 2,
    };

    setErrors(newErrors);
  };

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleChangeTextAreaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateInputs();

    if (isSuccessful) {
      dispatch(
        addNewCourseAction({
          ...course,
          authors: courseAuthors.map((el) => el.id),
        })
      );
      //navigate('/courses');
      console.log('courses', courses);
    }
  };

  const handleDeleteAuthorFromCourseAuthors = () => {
    console.log('handleDeleteAuthorFromCourseAuthors');
  };

  return (
    <div className="create-course">
      <div className="container-site">
        <h2 className="create-course__header">Course edit/create page</h2>
        <form
          className="form create-course__form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="create-course__form-container">
            <h3 className="create-course__title">Main info</h3>
            <Input
              type="text"
              className="create-course__input create-course__input--full-width"
              required={true}
              name="title"
              value={course.title}
              error={errors.isTitleError}
              onChange={handleChangeInputValue}
            />

            <h3 className="create-course__title">Description</h3>
            <Textarea
              name="description"
              className="create-course__textarea"
              value={course.description}
              error={errors.isDescriptionError}
              onChange={handleChangeTextAreaValue}
            />

            <h3 className="create-course__title">Duration</h3>
            <Input
              type="number"
              className="create-course__input"
              required={true}
              name="duration"
              value={course.duration}
              error={errors.isDurationError}
              onChange={handleChangeInputValue}
              min={0}
              children={
                <div className="create-course__format-duration">
                  {getCourseDuration(course.duration)}
                </div>
              }
            />

            <div className="create-course__authors-list">
              <div className="create-course__authors-container">
                <AuthorList />
              </div>

              <div className="create-course__authors-container">
                <h3 className="create-course__title">Course Authors</h3>
                <div className="create-course__course-authors">
                  {courseAuthors.length ? (
                    courseAuthors.map((courseAuthor) => {
                      return (
                        <AuthorItem
                          key={courseAuthor.id}
                          name={courseAuthor.name}
                          onClickDeleteAuthor={
                            handleDeleteAuthorFromCourseAuthors
                          }
                        />
                      );
                    })
                  ) : (
                    <p className="create-course__course-authors-empty">
                      Author list is empty
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="create-course__action-btns">
            <Button
              className="create-course__action-btn"
              text={ButtonTexts.Cancel}
            />
            <Button
              type="submit"
              className="create-course__action-btn"
              text={ButtonTexts.CreateCourse}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
