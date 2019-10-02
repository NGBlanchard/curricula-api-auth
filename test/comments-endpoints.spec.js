const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Comments Endpoints', function() {
  let db

  const {
    testCourses,
    testUsers,
  } = helpers.makeCoursesFixtures()

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /comments`, () => {
    beforeEach('insert courses', () =>
      helpers.seedCoursesTables(
        db,
        testUsers,
        testCourses,
      )
    )

    it(`creates an comment, responding with 201 and the new comment`, function() {
      this.retries(3)
      const testCourse = testCourses[0]
      const testUser = testUsers[0]
      const newComment = {
        text: 'Test new comment',
        course_id: testCourse.id,
        user_id: testUser.id,
      }
      return supertest(app)
        .post('/comments')
        .send(newComment)
        .expect(201)
        .expect(res => {
          expect(res.body).to.have.property('id')
          expect(res.body.text).to.eql(newComment.text)
          expect(res.body.course_id).to.eql(newComment.course_id)
          expect(res.body.user.id).to.eql(testUser.id)
          expect(res.headers.location).to.eql(`/comments/${res.body.id}`)
          const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
          const actualDate = new Date(res.body.date_created).toLocaleString()
          expect(actualDate).to.eql(expectedDate)
        })
        .expect(res =>
          db
            .from('curricula_comments')
            .select('*')
            .where({ id: res.body.id })
            .first()
            .then(row => {
              expect(row.text).to.eql(newComment.text)
              expect(row.course_id).to.eql(newComment.course_id)
              expect(row.user_id).to.eql(newComment.user_id)
              const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC' })
              const actualDate = new Date(row.date_created).toLocaleString()
              expect(actualDate).to.eql(expectedDate)
            })
        )
    })

    const requiredFields = ['text', 'user_id', 'course_id']

    requiredFields.forEach(field => {
      const testCourse = testCourses[0]
      const testUser = testUsers[0]
      const newComment = {
        text: 'Test new comment',
        user_id: testUser.id,
        course_id: testCourse.id,
      }

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newComment[field]

        return supertest(app)
          .post('/comments')
          .send(newComment)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          })
      })
    })
  })
})
