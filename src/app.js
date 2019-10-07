require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const coursesRouter = require('./courses/courses-router')
const commentsRouter = require('./comments/comments-router')
const authRouter = require('./auth/auth-router')
const userRouter = require('./users/user-router')



const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.options('*', cors())
app.use('/courses', coursesRouter)
app.use('/comments', commentsRouter)
app.use('/login', authRouter)
app.use('/users', userRouter)



app.get('/', (req, res) => {
  res.send('Howdy, boilerplate')
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

module.exports = app
