const mysql = require('mysql')

// creating connection
const db = mysql.createPool({
  connectionLimit: 100,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'goodwill',
  bigNumberStrings: true,
  dateStrings: true,
  trace: true,
  debug: true
})

db.getConnection((err, connection) => {
  if (err) {
    console.log(err)
    // throw err
    console.log('Database connection failed...'+err.stack);
    return
  } else {
    console.log('Database connection Successfully, id : ' +connection.threadId);
  }
})

module.exports = {
  port: 10001,
  db,
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
