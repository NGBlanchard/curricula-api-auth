const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      user_name: 'test-user-2',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      user_name: 'test-user-3',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      user_name: 'test-user-4',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}
function makeCoursesArray(users) {
  return [
    {
      id: 1,
      title: 'First test post!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      readings: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      duration: 16,
      author_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      title: 'Second test post!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      readings: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      duration: 16,
      author_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      title: 'Third test post!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      readings: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      duration: 16,
      author_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      title: 'Fourth test post!',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      readings: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      duration: 16,
      author_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}
function makeCommentsArray(users, courses) {
  return [
    {
      id: 1,
      content: 'First test comment!',
      course_id: courses[0].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      content: 'Second test comment!',
      course_id: courses[0].id,
      user_id: users[1].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      content: 'Third test comment!',
      course_id: courses[0].id,
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      content: 'Fourth test comment!',
      course_id: courses[0].id,
      user_id: users[3].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 5,
      content: 'Fifth test comment!',
      course_id: courses[courses.length - 1].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 6,
      content: 'Sixth test comment!',
      course_id: courses[courses.length - 1].id,
      user_id: users[2].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 7,
      content: 'Seventh test comment!',
      course_id: courses[3].id,
      user_id: users[0].id,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ];
}
function makeExpectedCourse(users, course, comments=[]) {
  const author = users
    .find(user => user.id === course.author_id)
  const number_of_comments = comments
    .filter(comment => comment.course_id === course.id)
    .length
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    notes: course.notes,
    readings: course.readings,
    duration: course.duration,
    topic: course.topic,
    date_created: course.date_created.toISOString(),
    number_of_comments,
    author: {
      id: author.id,
      user_name: author.user_name,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  }
}
function makeExpectedCourseComments(users, courseId, comments) {
  const expectedComments = comments
    .filter(comment => comment.course_id === courseId)
  return expectedComments.map(comment => {
    const commentUser = users.find(user => user.id === comment.user_id)
    return {
      id: comment.id,
      content: comment.content,
      date_created: comment.date_created.toISOString(),
      user: {
        id: commentUser.id,
        user_name: commentUser.user_name,
        date_created: commentUser.date_created.toISOString(),
        date_modified: commentUser.date_modified || null,
      }
    }
  })
}
function makeMaliciousCourse(user) {
  const maliciousCourse = {
    id: 911,
    title: 'How-to',
    description: 'Naughty naughty very naughty <script>alert("xss");</script>',
    notes: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    readings: 'uh oh',
    topic: 'Writing',
    date_created: new Date(),
    author_id: user.id,
  }
  const expectedCourse = {
    ...makeExpectedCourse([user], maliciousCourse),
    description: 'Naughty naughty very naughty &lt;script&gt;alert(\"xss\");&lt;/script&gt;',
    notes: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`,
  }
  return {
    maliciousCourse,
    expectedCourse,
  }
}
function makeCoursesFixtures() {
  const testUsers = makeUsersArray()
  const testCourses = makeCoursesArray(testUsers)
  const testComments = makeCommentsArray(testUsers, testCourses)
  return { testUsers, testCourses, testComments }
}
function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        curricula_courses,
        curricula_users,
        curricula_comments
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE curricula_courses_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE curricula_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE curricula_comments_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('curricula_courses_id_seq', 0)`),
        trx.raw(`SELECT setval('curricula_users_id_seq', 0)`),
        trx.raw(`SELECT setval('curricula_comments_id_seq', 0)`),
      ])
    )
  )
}
function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('curricula_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('curricula_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}
function seedCoursesTables(db, users, courses, comments=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('curricula_courses').insert(courses)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('curricula_courses_id_seq', ?)`,
      [courses[courses.length - 1].id],
    )
    // only insert comments if there are some, also update the sequence counter
    if (comments.length) {
      await trx.into('curricula_comments').insert(comments)
      await trx.raw(
        `SELECT setval('curricula_comments_id_seq', ?)`,
        [comments[comments.length - 1].id],
      )
    }
  })
}
function seedMaliciousCourse(db, user, course) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('curricula_courses')
        .insert([course])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeCoursesArray,
  makeExpectedCourse,
  makeExpectedCourseComments,
  makeMaliciousCourse,
  makeCommentsArray,
  makeCoursesFixtures,
  cleanTables,
  seedCoursesTables,
  seedMaliciousCourse,
  makeAuthHeader,
  seedUsers,
}