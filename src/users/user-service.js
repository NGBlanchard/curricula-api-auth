const xss = require('xss')


const UsersService = {
  getAllUsers(knex) {
    return knex.select('*').from('curricula_users')
      //  .leftJoin('curricula_comments', 'curricula_users.id', 'curricula_comments.user_id')
      //  .leftJoin('curricula_users', 'curricula_users.author_id', 'curricula_users.id')
  },

  insertUser(knex, newUser) {
    return knex
      .insert(newUser)
      .into ('curricula_users')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  getById(knex, id) {
    return knex
      .from('curricula_users')
      .select('*')
      .where('id', id)
      .first()
  },

  deleteUser(knex, id) {
    return knex('curricula_users')
    .where({ id })
    .delete()
  },

  updateUsers(knex, id, newUserFields) {
    return knex('curricula_users')
      .where({ id })
      .update(newUserFields)
  },
}

module.exports = UsersService

