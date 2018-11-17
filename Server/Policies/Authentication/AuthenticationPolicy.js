const Joi = require('joi')

module.exports = {
	registerUser (req, res, next) {
    let registerErrors = [] // ^male$|^female$
		const schema = {
			fname: Joi.string().regex(/^[a-zA-Z]{2,45}$/).required(),
      lname: Joi.string().regex(/^[a-zA-Z]{2,45}$/).required(),
      gender: Joi.string().valid('Female', 'Male').required(),
			dob: Joi.date().required(),
			contact: Joi.string().regex(/^0[347]{1}[0-9]{2}[0-9]{6}$/),
			email: Joi.string().email().trim().required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'fname':
					registerErrors.push('Wrong name format, please use letters only')
					break
				case 'lname':
					registerErrors.push('Wrong name format, please use letters only')
					break
        case 'gender':
  				registerErrors.push('Please select the gender')
  				break
				case 'dob':
					registerErrors.push('Please select your date of birth')
					break
				case 'contact':
					registerErrors.push('Wrong contact')
					break
	      case 'email':
	  			registerErrors.push('Wrong email address format')
	  			break
			}
			res.send({
				success: false,
				error_type: 0,
				error: registerErrors,
				errore: error
			})
		} else {
			next()
		}
	},
  userLogin (req, res, next) {
    let loginErrors = []
		const schema = {
			username: Joi.string().required(),
      password: Joi.string().required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'username':
					loginErrors.push('Username required')
					break
				case 'password':
					loginErrors.push('Password required')
					break
			}
			res.send({
				success: false,
				error_type: 0,
				error: loginErrors,
				errore: error
			})
		} else {
			next()
		}
	},
	delete_user (req, res, next) {
		let ownerErrors = []
		const schema = {
			owner_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
        case 'owner_id':
					ownerErrors.push('Owner identity error.')
  				break
			}

			res.send({
				success: false,
				error_type: 0,
				error: ownerErrors
			})
		} else {
			next()
		}
	},
	editUserProfile (req, res, next) {
    let userProfileErrors = []
		const schema = {
			userID: Joi.number().integer().min(1).required(),
			fname: Joi.string().regex(/^[a-zA-Z]{2,45}$/).required(),
      lname: Joi.string().regex(/^[a-zA-Z]{2,45}$/).required(),
      gender: Joi.string().valid('Female', 'Male').required(),
			dob: Joi.date().required(),
			contact: Joi.string().regex(/^0[347]{1}[0-9]{2}[0-9]{6}$/),
			email: Joi.string().email().trim().required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'userID':
					userProfileErrors.push('User identity error.')
					break
					case 'fname':
						userProfileErrors.push('Wrong name format, please use letters only.')
						break
					case 'lname':
						userProfileErrors.push('Wrong name format, please use letters only.')
						break
	        case 'gender':
	  				userProfileErrors.push('Please select the gender')
	  				break
					case 'dob':
						userProfileErrors.push('Please select your date of birth')
						break
					case 'contact':
						userProfileErrors.push('Wrong contact')
						break
		      case 'email':
		  			userProfileErrors.push('Wrong email address format')
		  			break
			}
			res.send({
				success: false,
				error_type: 0,
				error: userProfileErrors
			})
		} else {
			next()
		}
	},
	changeUsername (req, res, next) {
		let usernameErrors = []
		const schema = {
			userID: Joi.number().integer().min(1).required(),
			newUsername: Joi.string().regex(/^[a-zA-Z0-9]{2,20}$/).required(),
			oldUsername: Joi.string().regex(/^[a-zA-Z0-9]{2,20}$/).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
        case 'userID':
					usernameErrors.push('User identity error.')
  				break
				case 'newUsername':
					usernameErrors.push('Wrong username format, please use letters and digits only.')
	  			break
				case 'oldUsername':
					usernameErrors.push('Old username is required.')
	  			break
			}

			res.send({
				success: false,
				error_type: 0,
				error: usernameErrors
			})
		} else {
			next()
		}
	},
	changeUserPassword (req, res, next) {
		let userPasswordErrors = []
		const schema = {
			userID: Joi.number().integer().min(1).required(),
			newPassword: Joi.string().regex(/^[a-zA-Z0-9]{8,45}$/).required(),
			oldPassword: Joi.string().required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
        case 'userID':
					userPasswordErrors.push('User identity error.')
  				break
				case 'newPassword':
					userPasswordErrors.push('Wrong password format. Use atleast 8 characters with atleast a capital letter, small letter and a number.')
	  			break
				case 'oldPassword':
					userPasswordErrors.push('Old Password required.')
	  			break
			}

			res.send({
				success: false,
				error_type: 0,
				error: userPasswordErrors
			})
		} else {
			next()
		}
	}
}
