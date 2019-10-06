const xss = require('xss')
const bcrypt = require('bcryptjs')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const LoggedInService = {

  getById(knex, id) {
    return knex
      .from('curricula_users')
      .select('*')
      .where('id', id)
      .first()
  }

}

module.exports = LoggedInService