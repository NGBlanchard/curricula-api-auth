const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {
  getUserWithUserName(db, user_name) {
    return db('curricula_users')
      .where({ user_name })
      .first()
  },
  
  comparePasswords(password, hash) { 
      // const match = await 
     return bcrypt.compare(password, hash)
    //   .then((result)=>{ if(result){ 
    //     console.log("authentication successful")
    //    } else { console.log("authentication failed. Password doesn't match") 
    //    } }) .catch((err)=>console.error(err))
      
    // return match
  
    //   return bcrypt.compare(password, hash, function(err, result) {
  //     if (err) { throw (err); }
  //     console.log(result)we
  // })
      },

  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    })
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256'],
    })
  },
  parseBasicToken(token) {
    return Buffer
      .from(token, 'base64')
      .toString()
      .split(':')
  },
}
module.exports = AuthService