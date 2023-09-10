import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  useState,
} from 'react';
import { Input } from '../common/Input/Input';

import './CreateCourse.scss';
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

type CourseInput = {
  title: string;
  description: string;
  duration: number;
  courseAuthors: AuthorsList;
};

export const CreateCourse: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const courses = useAppSelector(getCourses);
  const authors = useAppSelector(getAuthors);

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
          authors: course.courseAuthors.map((el) => el.id),
        })
      );
      //navigate('/courses');
      console.log('courses', courses);
    }
  };

  const handleDeleteAuthorFromCourseAuthors = () => {
    console.log('handleDeleteAuthorFromCourseAuthors');
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

  const handleAddAuthorToCourseList = (authorId: AuthorType['id']) => {
    console.log('authorId', authorId);
    const currentAuthorCourse = getCurrentAuthor(
      course.courseAuthors,
      authorId
    );

    console.log('currentAuthorCourse', currentAuthorCourse);

    if (currentAuthorCourse === undefined) {
      setCourse({
        ...course,
        courseAuthors: [...course.courseAuthors, currentAuthorCourse],
      });
    }
    /* const isAuthorInCourse = course.courseAuthors.some(
      (author) => author.id === authorId
    );
  
    if (isAuthorInCourse) {
      return
    }
    // Add the author only if they are not already in the list
    const newAuthor = getCurrentAuthor(authors, authorId); // Assuming you have a list of authors accessible here
    if (newAuthor) {
      setCourse({
        ...course,
        courseAuthors: [...course.courseAuthors, newAuthor],
      });
    } */
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
                          handleAddAuthorToCourseList(author.id)
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
