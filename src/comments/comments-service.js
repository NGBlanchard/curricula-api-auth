const CommentsService = {
  getAllComments(knex) {
    return knex.select('*').from('curricula_comments')
  },

  insertComment(knex, newComment) {
    return knex
      .insert(newComment)
      .into('curricula_comments')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('curricula_comments')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteComment(knex, id) {
    return knex('curricula_comments')
      .where({ id })
      .delete()
  },

  updateComment(knex, id, newCommentFields) {
    return knex('curricula_comments')
      .where({ id })
      .update(newCommentFields)
  },
}

module.exports = CommentsService
