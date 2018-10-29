const Joi = require('joi')

module.exports = {
	AddCity (req, res, next) {
    let cityErrors = []
		const schema = {
			city_name: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
      region_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'city_name':
					cityErrors.push('Wrong city name. Please use letters only.')
					break
				case 'region_id':
					cityErrors.push('Please select region.')
					break
			}
			res.send({
				success: false,
				error: cityErrors
			})
		} else {
			next()
		}
	},
	delete_city (req, res, next) {
		const schema = {
			city_id: Joi.number().integer().min(1).required(),
      region_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'city_id':
					res.send({
						success: false,
						error: 'Please select a city to delete.'
					})
					break
        case 'region_id':
  				res.send({
  					success: false,
  					error: 'Please select a region.'
  				})
  				break
				default:
					res.send({
						success: false,
						error: 'Error while deleting city, please select city and try again.'
					})
					break
			}
		} else {
			next()
		}
	},
	edit_city (req, res, next) {
    let cityErrors = []
		const schema = {
			city_id: Joi.number().integer().min(1).required(),
      city_name: Joi.string().regex(/^[a-zA-Z]+$/).required(),
			region_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'city_id':
					cityErrors.push('City identity error.')
					break
				case 'city_name':
					cityErrors.push('Wrong city name. Please use letters only.')
					break
				case 'region_id':
					cityErrors.push('Region identity.')
					break
			}
			res.send({
				success: false,
				error_type: 0,
				error: cityErrors
			})
		} else {
			next()
		}
	}
}
