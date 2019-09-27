const xss = require('xss')

const CommentsService = {
  getById(db, id) {
    return db
      .from('curricula_comments AS comm')
      .select(
        'comm.id',
        'comm.content',
        'comm.date_created',
        'comm.course_id',
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
      .leftJoin(
        'curricula_users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .where('comm.id', id)
      .first()
  },

  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into('curricula_comments')
      .returning('*')
      .then(([comment]) => comment)
      .then(comment =>
        CommentsService.getById(db, comment.id)
      )
  },

  serializeComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      content: xss(comment.content),
      course_id: comment.course_id,
      date_created: new Date(comment.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        date_created: new Date(user.date_created),
      },
    }
  }
}

module.exports = CommentsService
