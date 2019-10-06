const path = require('path')
const express = require('express')
const xss = require('xss')
const CoursesService = require('./courses-service')
const { requireAuth } = require('../middleware/jwt-auth')

const coursesRouter = express.Router()
const jsonParser = express.json()

const serializeCourse = course => ({
  id: course.id,
  title: xss(course.title),
  description: xss(course.description),
  notes: xss(course.notes),
  readings: xss(course.readings),
  duration: xss(course.duration),
  date_created: course.date_created,
  topic: xss(course.topic),
  author: course.author_id,
})

coursesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CoursesService.getAllCourses(knexInstance)
      .then(courses => {
        res.json(courses.map(serializeCourse))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { title, description, notes, readings, duration, date_created, topic, author_id, } = req.body
    const newCourse = { title, description, notes, readings, duration, date_created, topic, author_id, }

    for (const [key, value] of Object.entries(newCourse))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    newCourse.author = author
    CoursesService.insertCourse(
      req.app.get('db'),
      newCourse
    )
      .then(course => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${course.id}`))
          .json(serializeCourse(course))
      })
      .catch(next)
  })

coursesRouter
  .route('/:course_id')
  .all(requireAuth)
  .all(checkCourseExists)
  .all((req, res, next) => {
    CoursesService.getById(
      req.app.get('db'),
      req.params.course_id
    )
      .then(course => {
        if (!course) {
          return res.status(404).json({
            error: { message: `Course doesn't exist` }
          })
        }
        res.course = course
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(serializeCourse(res.course))
  })
  .delete((req, res, next) => {
    CoursesService.deleteCourse(
      req.app.get('db'),
      req.params.course_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, description, botes, readings, duration, date_created, topic, author } = req.body
    const courseToUpdate = { title, description, botes, readings, duration, date_created, topic, author }

    const numberOfValues = Object.values(courseToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'content' or 'modified'`
        }
      })

    CoursesService.updateCourse(
      req.app.get('db'),
      req.params.course_id,
      courseToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

  coursesRouter.route('/:course_id/comments/')
  .all(requireAuth)
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
        error: `Course doesn't exist`
      })
    res.course = course
    next()
  } catch (error) {
    next(error)
  }
}


module.exports = coursesRouter