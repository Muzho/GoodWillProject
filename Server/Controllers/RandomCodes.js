const Promise = require('bluebird')
// const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const bcrypt = Promise.promisifyAll(require('bcrypt'))
// const bcrypt = require('bcrypt')

module.exports = {
  password (num, userID) {
    let passWord = ''
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < num; i++) {
      passWord += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return passWord + userID
  },
  async generateHash (password) {
    const saltRounds = 10
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })

    return hashedPassword
  },
  username (fname, lname) {
    let usernameCode = ''
    let possible = "0123456789"
    for (let i = 0; i < 5; i++) {
      usernameCode += possible.charAt(Math.floor(Math.random() * possible.length))
    }
  	return fname.charAt(1) + lname.charAt(0) + usernameCode + lname.charAt(2)
  }/*,
  patientNum () {
    let num = ''
    let pos = "0123456789"
    for (let i = 0; i < 5; i++) {
      num += pos.charAt(Math.floor(Math.random() * pos.length))
    }
    return 'U' + num
  }*/
}
