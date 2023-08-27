import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';
import { Input } from '../common/Input/Input';
import { getCourseDuration } from '../../helpers/getCourseDuration';
import './CreateCourse.scss';
import { AddIcon } from '../../components/assets/AddIcon';
import { DeleteIcon } from '../../components/assets/DeleteIcon';
import { AuthorItem } from './components/AuthorItem/AuthorItem';
import { Button } from '../common/Button/Button';
import { useAuthor } from '../../hooks/useAuthor';
import { Textarea } from '../common/Textarea/Textarea';
import { useNavigate } from 'react-router-dom';
import { KEY_ENTER } from '../../helpers/const';
import { ButtonTexts } from '../../enums/buttonTexts';

type CourseType = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: AuthorId[];
};

type AuthorId = number;

export const CreateCourse: FC = () => {
  const {
    authorValue,
    authorsList,
    courseAuthors,
    onChangeAuthorValue,
    onCreateAuthor,
    onAddAuthorToCourseList,
    onDeleteFromCourseAuthors,
  } = useAuthor();

  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: '',
    description: '',
    duration: 0,
  });

  const [errors, setErrors] = useState({
    isTitleError: false,
    isDescriptionError: false,
    isDurationError: false,
  });

  const [isSuccessful, setSuccessful] = useState(false);

  const validateInputs = () => {
    const newErrors = {
      isTitleError: course.title.length <= 2,
      isDurationError: course.duration <= 0,
      isDescriptionError: course.description.length <= 2,
    };

    setErrors(newErrors);
  };

  const onChangeInputValue = (evt: ChangeEvent<HTMLInputElement>) => {
    setCourse({ ...course, [evt.target.name]: evt.target.value });
  };

  const onChangeTextAreaValue = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setCourse({ ...course, [evt.target.name]: evt.target.value });
  };

  const onSubmit = () => {
    validateInputs();

    if (isSuccessful) {
      navigate('/courses');
    }
  };

  const handleKeyPress = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === KEY_ENTER) {
      onCreateAuthor();
    }
  };

  return (
    <div className="create-course">
      <div className="container-site">
        <h2 className="create-course__header">Course edit/create page</h2>
        <form className="form create-course__form" onSubmit={onSubmit}>
          <div className="create-course__form-container">
            <h3 className="create-course__title">Main info</h3>
            <Input
              type="text"
              className="create-course__input create-course__input--full-width"
              required={true}
              name="title"
              value={course.title}
              error={errors.isTitleError}
              onChange={onChangeInputValue}
            />

            <h3 className="create-course__title">Description</h3>
            <Textarea
              name="description"
              className="create-course__textarea"
              value={course.description}
              error={errors.isDescriptionError}
              onChange={onChangeTextAreaValue}
            />

            <h3 className="create-course__title">Duration</h3>
            <Input
              type="number"
              className="create-course__input"
              required={true}
              name="duration"
              value={course.duration}
              error={errors.isDurationError}
              onChange={onChangeInputValue}
              min={0}
              children={
                <div className="create-course__format-duration">
                  {getCourseDuration(course.duration)}
                </div>
              }
            />

            <div className="create-course__authors-list">
              <div className="create-course__authors-container">
                <h3 className="create-course__title">Authors</h3>
                <Input
                  type="text"
                  className="create-course__input"
                  required={true}
                  name="Author Name"
                  value={authorValue}
                  error={false}
                  onChange={onChangeAuthorValue}
                  onKeyUp={handleKeyPress}
                  children={
                    <Button
                      className="create-course__create-author"
                      text={ButtonTexts.CreateAuthor}
                      onClick={onCreateAuthor}
                    />
                  }
                />

                <div className="create-course__authors__container">
                  {authorsList.map((author) => {
                    return (
                      <AuthorItem
                        key={author.idAuthor}
                        icon={<AddIcon />}
                        name={author.authorName}
                        onClick={() => onAddAuthorToCourseList(author.idAuthor)}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="create-course__authors-container">
                <h3 className="create-course__title">Course Authors</h3>
                <div className="create-course__course-authors">
                  {courseAuthors.length ? (
                    courseAuthors.map((courseAuthor) => {
                      return (
                        <AuthorItem
                          key={courseAuthor.idAuthor}
                          icon={<DeleteIcon />}
                          name={courseAuthor.authorName}
                          onClick={() =>
                            onDeleteFromCourseAuthors(courseAuthor.idAuthor)
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
              type="button"
              className="create-course__action-btn"
              text={ButtonTexts.CreateCourse}
              onClick={onSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
