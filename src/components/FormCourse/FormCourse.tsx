import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  useState,
} from 'react';
import { Input } from '../common/Input/Input';

import './FormCourse.scss';
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
import { AuthorType, AuthorsList } from '@types';
import { deleteAuthorsAction } from '@store/authors/actions';
import { getAuthors } from '@store/authors/selectors';
import { PathRoutes } from '@enums/pathRoutes';
import { useAuthContext } from '@contexts/AuthContext';

type CourseInput = {
  title: string;
  description: string;
  duration: number;
  courseAuthors: AuthorsList;
};

export const FormCourse: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authors = useAppSelector(getAuthors);
  const { authToken } = useAuthContext();

  const [course, setCourse] = useState<CourseInput>({
    title: '',
    description: '',
    duration: 0,
    courseAuthors: [],
  });

  const [errors, setErrors] = useState({
    isTitleError: false,
    isDescriptionError: false,
    isDurationError: false,
  });

  const validateInputs = () => {
    const newErrors = {
      isTitleError: course.title.length <= 2,
      isDurationError: course.duration <= 0,
      isDescriptionError: course.description.length <= 2,
    };

    setErrors(newErrors);
    return Object.keys(newErrors).every((key) => errors[key] === true);
  };

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (e.target.name === 'duration') {
      parseInt(inputValue, 10);
    }
    setCourse({ ...course, [e.target.name]: inputValue });
  };

  const handleChangeTextAreaValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateInputs()) {
      dispatch(
        addNewCourseAction(
          {
            ...course,
            duration: Number(course.duration),
            authors: course.courseAuthors.map((el) => el.id),
          },
          authToken
        )
      );
      navigate(`/${PathRoutes.Courses}`);
    }
  };

  const handleDeleteAuthorFromCourseAuthors = (author: AuthorType) => {
    console.log('handleDeleteAuthorFromCourseAuthors');
    const filteredCourseAuthorsList = course.courseAuthors.filter(
      (authorCourse) => authorCourse !== author
    );
    setCourse({ ...course, courseAuthors: filteredCourseAuthorsList });
  };

  const getCurrentAuthor = (list: AuthorsList, id: string) =>
    list.find((author) => author.id === id);

  const handleDeleteFromAuthorsList = (authorId: AuthorType['id']) => {
    const currentAuthorCourse = getCurrentAuthor(
      course.courseAuthors,
      authorId
    );

    if (currentAuthorCourse) {
      const filteredCourseAuthorsList = course.courseAuthors.filter(
        (author) => author !== currentAuthorCourse
      );
      setCourse({ ...course, courseAuthors: filteredCourseAuthorsList });
    }

    dispatch(deleteAuthorsAction(authorId));
  };

  const handleAddAuthorToCourseList = (author: AuthorType) => {
    const currentAuthorCourse = getCurrentAuthor(
      course.courseAuthors,
      author.id
    );

    if (!currentAuthorCourse) {
      setCourse({
        ...course,
        courseAuthors: [...course.courseAuthors, author],
      });
    }
  };

  const handleCancel = () => {
    navigate(`/${PathRoutes.Courses}`);
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
            <fieldset className="create-course__form-group">
              <legend className="create-course__title">Main info</legend>
              <Input
                type="text"
                className="create-course__input create-course__input--full-width"
                required={true}
                name="title"
                value={course.title}
                error={errors.isTitleError}
                onChange={handleChangeInputValue}
              />
            </fieldset>

            <fieldset className="create-course__form-group">
              <legend className="create-course__title">Description</legend>
              <Textarea
                name="description"
                className="create-course__textarea"
                value={course.description}
                error={errors.isDescriptionError}
                onChange={handleChangeTextAreaValue}
              />
            </fieldset>

            <fieldset className="create-course__form-group">
              <legend className="create-course__title">Duration</legend>
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
            </fieldset>

            <div className="create-course__authors-list">
              <div className="create-course__authors-container">
                <AuthorList />
                <div className="author-list__list-container">
                  {authors.map((author) => {
                    return (
                      <AuthorItem
                        key={author.id}
                        name={author.name}
                        onClickDeleteAuthor={() =>
                          handleDeleteFromAuthorsList(author.id)
                        }
                        onClickAddAuthor={() =>
                          handleAddAuthorToCourseList(author)
                        }
                      />
                    );
                  })}
                </div>
              </div>

              <div className="create-course__authors-container">
                <h3 className="create-course__title">Course Authors</h3>
                <div className="create-course__course-authors">
                  {course.courseAuthors.length ? (
                    course.courseAuthors.map((author, id) => {
                      return (
                        <AuthorItem
                          key={author.id}
                          name={author.name}
                          onClickDeleteAuthor={() =>
                            handleDeleteAuthorFromCourseAuthors(author)
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
              type="button"
              className="create-course__action-btn"
              text={ButtonTexts.Cancel}
              onClick={handleCancel}
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
