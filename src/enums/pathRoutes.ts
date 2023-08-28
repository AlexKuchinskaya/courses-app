export const COURSES_PATH = 'courses';

export const enum PathRoutes {
  Main = '/',
  Registration = 'registration',
  Login = 'login',
  Courses = `${COURSES_PATH}`,
  CoursesId = `${COURSES_PATH}/:courseId`,
  CoursesAdd = `${COURSES_PATH}/:add`,
}
