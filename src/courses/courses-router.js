const express = require('express')
const CoursesService = require('./courses-service')

const coursesRouter = express.Router()

coursesRouter
  .route('/')
  .get((req, res, next) => {
    CoursesService.getAllCourses(req.app.get('db'))
      .then(courses => {
        res.json(courses.map(CoursesService.serializeCourse))
      })
      .catch(next)
  })

coursesRouter
  .route('/:course_id')
  .all(checkCourseExists)
  .get((req, res) => {
    res.json(CoursesService.serializeCourse(res.course))
  })

coursesRouter.route('/:course_id/comments/')
  .all(checkCourseExists)
  .get((req, res, next) => {
    CoursesService.getCommentsForCourse(
      req.app.get('db'),
      req.params.course_id
    )
      .then(comments => {
        res.json(comments.map(CoursesService.serializeCourseComment))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkCourseExists(req, res, next) {
  try {
    const course = await CoursesService.getById(
      req.app.get('db'),
      req.params.course_id
    )

    if (!course)
      return res.status(404).json({
        error: `That course doesn't exist`
      })

    res.course = course
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = coursesRouter
