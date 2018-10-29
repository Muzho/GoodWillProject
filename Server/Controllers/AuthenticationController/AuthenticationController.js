const errorHandler = require('../errorHandler')
const  jwt = require('jsonwebtoken')
const db = require('../../config/config')
const randomCodes = require('../randomCodes')
const bcrypt = require('bcrypt')

function jwtSignUser (user) {
	const ONE_WEEK = 60 * 60 * 24 * 7 // 604800
	return jwt.sign(JSON.parse(JSON.stringify(user)), db.authentication.jwtSecret, {
		expiresIn: ONE_WEEK
	})
}

module.exports = {
	async registerUser (req, res) {
		const fname = req.body.fname
		const lname = req.body.lname
		const gender = req.body.gender
		const dob = req.body.dob
		const contact = req.body.contact
		const email = req.body.email

		try{
			let userExists = `SELECT count(*) AS userCount FROM ?? WHERE ?? = ?`
			db.db.query(userExists, ['user', 'UserContact', contact], (err, result, fields) => {
				if (err) {
					res.send({
	          success: false,
	          error:'error ocurred' + err
	        })
				} else {
					if (result[0].userCount < 1) {
						// add user in users table
						let addUser = `INSERT INTO ?? SET ?`
						db.db.query(addUser, ['user', {
							UserFirstName: fname,
							UserLastName: lname,
							UserGender: gender,
							UserDOB: dob,
							UserContact: contact,
							UserEmail: email
						}], (err, resulte) => {
							// create useraccount
							if (err) throw err
							const userID = resulte.insertId
							const username = randomCodes.username(fname, lname)
							const saltRounds = 10
							let salt = bcrypt.genSaltSync(saltRounds)
							const password = randomCodes.password(8, userID)
							const hash = bcrypt.hashSync(password, salt)
							let createUserAccount = `INSERT INTO ?? SET ?`
							db.db.query(addUser, ['useraccount', {
								User: userID,
								Username: username,
								Password: hash
							}], (err, resulta) => {
								if (err) throw err
								//query registered user data
								let registeredUser = `SELECT ?? AS userID,
								?? AS fname,
								?? AS lname,
								?? AS username,
								?? AS password
								FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?? = ?`
								db.db.query(registeredUser, ['user.User_Id',
								'user.UserFirstName',
								'user.UserLastName',
								'useraccount.Username',
								'useraccount.Password',
								'user', 'useraccount',
								'user.User_Id', 'useraccount.User', 'user.User_Id', userID], (err, rows) => {
									if (err) throw err
									res.send({
										success: true,
										userData: rows,
										password: password
									})
								})
							})
						})
					} else {
							res.send({
								success: false,
								message: 'User already registered.'
							})
						}
				}
			})
		} catch(err) {
			res.send({
				success: false,
				errormessage: 'Something wrong happened while registering user. Please try again.'
			})
		}
	},
	async userLogin (req, res) {
		const username = req.body.username
		const password = req.body.password

		try{
			let usernameExists = `SELECT count(*) AS userCount FROM ?? WHERE ?? = ?`
			db.db.query(usernameExists, ['useraccount', 'Username', username], (err, result, fields) => {
				console.log('user count result' + result[0].userCount)
				if (err) {
			    res.send({
						auth: false,
			      code:400,
			      failed:'error ocurred'
			    })
				} else {
					if (result[0].userCount > 0) {
						let registeredUser = `SELECT ?? AS userID,
						?? AS fname,
						?? AS lname,
						?? AS password
						FROM ?? INNER JOIN ?? ON ?? = ?? WHERE ?? = ?`
						db.db.query(registeredUser, ['user.User_Id',
						'user.UserFirstName',
						'user.UserLastName',
						'useraccount.Password',
						'user', 'useraccount',
						'user.User_Id', 'useraccount.User', 'useraccount.Username', username], (err, results) => {
							// checking if the password is correct
							let passwordCheck = bcrypt.compareSync(password, results[0].password)
							if ( !passwordCheck ) {
								res.send({
									auth: false,
									message: 'Incorrect account details. Please enter the correct account details to login.'
								})
							} else {
								delete results[0].password
								res.send({
									auth: true,
									user: results[0],
									token: jwtSignUser(results[0])
								})
							}
						})
					} else {
							res.send({
								auth: false,
								message: 'Incorrect account details.'
							})
						}
				}
			})
		} catch(err) {
			res.send({
				success: false,
				errormessage: 'Something wrong happened while attempting to log in. Please try again.'
			})
		}
	},
	async ClientLogin (req, res) {
		const username = req.body.username
		const password = req.body.password

    res.send({
      success: false,
      message: 'Incorrect account details. Please enter the correct account details to login.'
    })
	}
}
