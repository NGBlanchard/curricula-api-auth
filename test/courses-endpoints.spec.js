const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Courses Endpoints', function() {
  let db

  const {
    testUsers,
    testCourses,
    testComments,
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

  describe(`GET /courses`, () => {
    context(`Given no courses`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/courses')
          .expect(200, [])
      })
    })

    context('Given there are courses in the database', () => {
      beforeEach('insert courses', () =>
        helpers.seedCoursesTables(
          db,
          testUsers,
          testCourses,
          testComments,
        )
      )

      it('responds with 200 and all of the courses', () => {
        const expectedCourses = testCourses.map(course =>
          helpers.makeExpectedCourse(
            testUsers,
            course,
            testComments,
          )
        )
        return supertest(app)
          .get('/courses')
          .expect(200, expectedCourses)
      })
    })

    context(`Given an XSS attack course`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousCourse,
        expectedCourse,
      } = helpers.makeMaliciousCourse(testUser)

      beforeEach('insert malicious course', () => {
        return helpers.seedMaliciousCourse(
          db,
          testUser,
          maliciousCourse,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/courses`)
          .expect(200)
          .expect(res => {
            expect(res.body[0].title).to.eql(expectedCourse.title)
            expect(res.body[0].content).to.eql(expectedCourse.content)
          })
      })
    })
  })

  describe(`GET /courses/:course_id`, () => {
    context(`Given no courses`, () => {
      it(`responds with 404`, () => {
        const courseId = 123456
        return supertest(app)
          .get(`/courses/${courseId}`)
          .expect(404, { error: `Course doesn't exist` })
      })
    })

    context('Given there are courses in the database', () => {
      beforeEach('insert courses', () =>
        helpers.seedCoursesTables(
          db,
          testUsers,
          testCourses,
          testComments,
        )
      )

      it('responds with 200 and the specified course', () => {
        const courseId = 2
        const expectedCourse = helpers.makeExpectedCourse(
          testUsers,
          testCourses[courseId - 1],
          testComments,
        )

        return supertest(app)
          .get(`/courses/${courseId}`)
          .expect(200, expectedCourse)
      })
    })

    context(`Given an XSS attack course`, () => {
      const testUser = helpers.makeUsersArray()[1]
      const {
        maliciousCourse,
        expectedCourse,
      } = helpers.makeMaliciousCourse(testUser)

      beforeEach('insert malicious course', () => {
        return helpers.seedMaliciousCourse(
          db,
          testUser,
          maliciousCourse,
        )
      })

      it('removes XSS attack content', () => {
        return supertest(app)
          .get(`/courses/${maliciousCourse.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.title).to.eql(expectedCourse.title)
            expect(res.body.content).to.eql(expectedCourse.content)
          })
      })
    })
  })

  describe(`GET /courses/:course_id/comments`, () => {
    context(`Given no courses`, () => {
      it(`responds with 404`, () => {
        const courseId = 123456
        return supertest(app)
          .get(`/courses/${courseId}/comments`)
          .expect(404, { error: `Course doesn't exist` })
      })
    })

    context('Given there are comments for course in the database', () => {
      beforeEach('insert courses', () =>
        helpers.seedCoursesTables(
          db,
          testUsers,
          testCourses,
          testComments,
        )
      )

      it('responds with 200 and the specified comments', () => {
        const courseId = 1
        const expectedComments = helpers.makeExpectedCourseComments(
          testUsers, courseId, testComments
        )

        return supertest(app)
          .get(`/courses/${courseId}/comments`)
          .expect(200, expectedComments)
      })
    })
  })
})
