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
	SingleProp (req, res, next) {
		let propErrors = []
		const schema = {
			propID: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
        case 'propID':
					propErrors.push('Property identity error.')
  				break
			}

			res.send({
				success: false,
				error_type: 0,
				error: propErrors
			})
		} else {
			next()
		}
	},
	edit_user (req, res, next) {
    let facilityErrors = []
		const schema = {
			facility_id: Joi.number().integer().min(1).required(),
			facility: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
			category: Joi.string().regex(/^[a-zA-Z ]+$/).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'facility_id':
					facilityErrors.push('Facility error.')
					break
				case 'facility':
					facilityErrors.push('Wrong facility name. Please use letters only.')
					break
				case 'category':
					facilityErrors.push('Select category error.')
					break
			}
			res.send({
				success: false,
				error_type: 0,
				error: facilityErrors
			})
		} else {
			next()
		}
	}
}
