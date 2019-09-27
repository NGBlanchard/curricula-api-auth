const xss = require('xss')

const CoursesService = {
  getAllCourses(db) {
    return db
      .from('curricula_courses AS cour')
      .select(
        'cour.id',
        'cour.title',
        'cour.description',
        'cour.notes',
        'cour.readings',
        'cour.duration',
        'cour.date_created',
        'cour.style',
        db.raw(
          `count(DISTINCT comm) AS number_of_comments`
        ),
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', usr.id,
              'user_name', usr.user_name,
              'date_created', usr.date_created,
            )
          ) AS "author"`
        ),
      )
      .leftJoin(
        'curricula_comments AS comm',
        'cour.id',
        'comm.course_id',
      )
      .leftJoin(
        'curricula_users AS usr',
        'cour.author_id',
        'usr.id',
      )
      .groupBy('cour.id', 'usr.id')
  },

  getById(db, id) {
    return CoursesService.getAllCourses(db)
      .where('cour.id', id)
      .first()
  },

  getCommentsForCourse(db, course_id) {
    return db
      .from('curricula_comments AS comm')
      .select(
        'comm.id',
        'comm.text',
        'comm.date_created',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.user_name,
                  usr.date_created,
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where('comm.course_id', course_id)
      .leftJoin(
        'curricula_users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .groupBy('comm.id', 'usr.id')
  },

  serializeCourse(course) {
    const { author } = course
    return {
      id: course.id,
      style: course.style,
      title: xss(course.title),
      description: xss(course.description),
      notes: xss(course.notes),
      readings: xss(course.readings),
      duration: xss(course.duration),
      date_created: new Date(course.date_created),
      style: xss(course.style),
      number_of_comments: Number(course.number_of_comments) || 0,
      author: {
        id: author.id,
        user_name: author.user_name,
        date_created: new Date(author.date_created),
      },
    }
  },

  serializeCourseComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      course_id: comment.course_id,
      content: xss(comment.content),
      date_created: new Date(comment.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        date_created: new Date(user.date_created),
      },
    }
  },
}

module.exports = CoursesService
