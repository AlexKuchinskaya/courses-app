import React, { FC, useState } from 'react';
import { Input } from '../common/Input/Input';

export const CreateCourse: FC = () => {
  const [course, setCourse] = useState({
    title: '',
    duration: '',
  })

  const [errors, setErrors] = useState({
    isTitleError: false,
    isDurationError: false,
  })

  const onChangeInputValue = () => {

  }
  return (
    <div className='create-course'>
      <h2>Course edit/create page</h2>
      <form>
        <h3>Main info</h3>
        <Input
          type='text'
          className='create-course__input'
          required={true}
          name='title'
          value={course.title}
          error={errors.isTitleError}
          onChange={onChangeInputValue}
        />
        <h3>Duration</h3>
        <Input
          type='text'
          className='create-course__input'
          required={true}
          name='duration'
          value={course.duration}
          error={errors.isDurationError}
          onChange={onChangeInputValue}
        />

      </form>
    </div>
  );
};
