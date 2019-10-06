const xss = require('xss')


const CoursesService = {
  getAllCourses(knex) {
    return knex.select('*').from('curricula_courses')
  },

  insertCourse(knex, newCourse) {
    return knex
      .insert(newCourse)
      .into ('curricula_courses')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('curricula_courses')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteCourse(knex, id) {
    return knex('curricula_courses')
    .where({ id })
    .delete()
  },

  updateCourses(knex, id, newCourseFields) {
    return knex('curricula_courses')
      .where({ id })
      .update(newCourseFields)
  },
}

module.exports = CoursesService

