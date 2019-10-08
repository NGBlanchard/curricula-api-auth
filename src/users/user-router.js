const express = require('express')
const path = require('path')
const UsersService = require('./user-service')
const usersRouter = express.Router()
const jsonBodyParser = express.json()
const jsonParser = express.json()
const xss = require('xss')

const { requireAuth } = require('../middleware/jwt-auth')

const serializeUser = user => ({
  id: user.id,
  user_name: xss(user.user_name),
  date_created: user.date_created,
})

usersRouter
.route('/')
.get((req, res, next) => {
  const knexInstance = req.app.get('db')
  UsersService.getAllUsers(knexInstance)
    .then(users => {
      res.json(users.map(serializeUser))
    })
    .catch(next)
})
  .post(jsonBodyParser, (req, res, next) => {
    const { password, user_name } = req.body

    for (const field of ['user_name', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

        const passwordError = UsersService.validatePassword(password)

        if (passwordError)
          return res.status(400).json({ error: passwordError })
        
          UsersService.hasUserWithUserName(
            req.app.get('db'),
            user_name
          )
          .then(hasUserWithUserName => {
            if (hasUserWithUserName)
            return res.status(400).json({ error: `Username already taken` })
            
            return UsersService.hashPassword(password)
              .then(hashedPassword => {
                const newUser = {
                  user_name,
                  password: hashedPassword,
                  date_created: 'now()',
                }

            return UsersService.insertUser(
             req.app.get('db'),
              newUser
            )
              .then(user => {
              res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                .json(UsersService.serializeUser(user))
            })  
          })
        })
        .catch(next)
  })

  usersRouter
  .route('/:user_id')
  .all(requireAuth)
  .all(checkUserExists)
  .all((req, res, next) => {
    UsersService.getById(
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
  .delete((req, res, next) => {
    UsersService.deleteUser(
      req.app.get('db'),
      req.params.user_id
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { user_name, password, date_created } = req.body
    const userToUpdate = { user_name, password, date_created }

    const numberOfValues = Object.values(userToUpdate).filter(Boolean).length
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'content' or 'modified'`
        }
      })

    UsersService.updateUser(
      req.app.get('db'),
      req.params.user_id,
      userToUpdate
    )
      .then(numRowsAffected => {
        res.status(204).end()
      })
      .catch(next)
  })

  usersRouter.route('/:user_id/comments/')
  .all(requireAuth)
  .all(checkUserExists)
  .get((req, res, next) => {
    UsersService.getCommentsForUser(
      req.app.get('db'),
      req.params.user_id
    )
      .then(comments => {
        res.json(comments.map(UsersService.serializeUserComment))
      })
      .catch(next)
  })

async function checkUserExists(req, res, next) {
  try {
    const user = await UsersService.getById(
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

module.exports = usersRouter



