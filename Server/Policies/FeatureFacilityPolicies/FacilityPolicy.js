const Joi = require('joi')

module.exports = {
	AddFacility (req, res, next) {
    let facilityErrors = []
		const schema = {
			facility: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
      category: Joi.string().regex(/^[a-zA-Z]+$/).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'facility':
					facilityErrors.push('Wrong facility name. Please use letters only.')
					break
				case 'category':
					facilityErrors.push('Please select category.')
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
	delete_facility (req, res, next) {
		let facilityErrors = []
		const schema = {
			facility_id: Joi.number().integer().min(1).required(),
			category: Joi.string().regex(/^[a-zA-Z]+$/).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'category':
					facilityErrors.push('Category identity error.')
					break
        case 'facility_id':
					facilityErrors.push('Facility identity error.')
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
	edit_facility (req, res, next) {
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
