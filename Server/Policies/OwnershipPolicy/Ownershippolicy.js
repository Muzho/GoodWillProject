const Joi = require('joi')

module.exports = {
	AddOwner (req, res, next) {
    let ownerErrors = []
		const schema = {
			name: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
      contact: Joi.string().regex(/^0[347]{1}[0-9]{2}[0-9]{6}$/).required(),
      ownership: Joi.string().regex(/^[a-zA-Z]+$/).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'name':
					ownerErrors.push('Wrong owner name. Please use letters only.')
					break
				case 'contact':
					ownerErrors.push('Wrong contact.')
					break
        case 'ownership':
  				ownerErrors.push('Please select ownership.')
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
	delete_owner (req, res, next) {
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
	edit_owner (req, res, next) {
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
	},
	singleUserAccount (req, res, next) {
		let accountErrors = []
		const schema = {
			userID: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
        case 'userID':
					accountErrors.push('user account identity error.')
  				break
			}

			res.send({
				success: false,
				error_type: 0,
				error: accountErrors
			})
		} else {
			next()
		}
	}
}
