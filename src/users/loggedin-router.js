const express = require('express')
const path = require('path')
const LoggedInService = require('./loggedin-service')
const loggedinRouter = express.Router()
const jsonBodyParser = express.json()
const jsonParser = express.json()
const xss = require('xss')

const { requireAuth } = require('../middleware/jwt-auth')

const serializeUser = user => ({
  id: user.id,
  user_name: xss(user.user_name),
  date_created: user.date_created,
})

loggedinRouter
.route('/')
.all(requireAuth)
.all(checkUserExists)
.all((req, res, next) => {
  LoggedInService.getById(
    req.app.get('db'),
    req.params.user_id
  )
    .then(user => {
      if (!user) {
        return res.status(404).json({
          error: { message: `User doesn't exist` }
        })
      }
      res.user = user
      next()
    })
    .catch(next)
})
.get((req, res, next) => {
  res.json(serializeUser(res.user))
})
  

  async function checkUserExists(req, res, next) {
    try {
      const user = await LoggedInService.getById(
        req.app.get('db'),
        req.params.user_id
      )
      if (!user)
        return res.status(404).json({
          error: `User doesn't exist`
        })
      res.user = user
      next()
    } catch (error) {
      next(error)
    }
  }
  
module.exports = loggedinRouter
