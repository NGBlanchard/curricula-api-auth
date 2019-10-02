const xss = require('xss')


const CoursesService = {
  getAllCourses(knex) {
    return knex.select('*').from('curricula_courses')
      //  .leftJoin('curricula_comments', 'curricula_courses.id', 'curricula_comments.course_id')
      //  .leftJoin('curricula_users', 'curricula_courses.author_id', 'curricula_users.id')
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

