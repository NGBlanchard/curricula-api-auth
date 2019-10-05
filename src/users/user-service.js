const xss = require('xss')
const bcrypt = require('bcryptjs')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {

  hasUserWithUserName(db, user_name) {
    return db('curricula_users')
      .where({ user_name })
      .first()
      .then(user => !!user)
  },

  insertUser(db, newUser) {
    return db
    .insert(newUser)
    .into('curricula_users')
    .returning('*')
    .then(([user]) => user)
  },

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

  getByCurrent(knex, id) {
    return knex
      .from('curricula_users')
      .select('*')
      .where({ id })
      .first()
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


  validatePassword(password) {
  if (password.length < 8) {
    return 'Password must be longer than 8 characters'
  }
  if (password.length > 60) {
    return 'Password must be less than 72 characters'
  }
  if (password.startsWith(' ') || password.endsWith(' ')) {
    return 'Password must not start or end with empty spaces'
  }
  if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
    return 'Password must contain 1 upper case, lower case, number and special character'
  }
  return null
  },

  hashPassword(password) {
    return bcrypt.hash(password, 12)
  },
  
  serializeUser(user) {
    return {
      id: user.id,
      user_name: xss(user.user_name),
      date_created: new Date(user.date_created),
    }
  },
}

module.exports = UsersService

