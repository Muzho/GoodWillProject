const Joi = require('joi')

module.exports = {
	AddCountry (req, res, next) {
    let countryErrors = []
		const schema = {
			country_name: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
      country_shortname: Joi.string().regex(/^[a-zA-Z]+$/).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'country_name':
					countryErrors.push('Wrong country name. Please use letters only.')
					break
				case 'country_shortname':
					countryErrors.push('Wrong country short name. Please use letters only.')
					break
			}
			res.send({
				success: false,
				error: countryErrors
			})
		} else {
			next()
		}
	},
	delete_country (req, res, next) {
		const schema = {
			country_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'country_id':
					res.send({
						success: false,
						error: 'Please select a country to delete.'
					})
					break
				default:
					res.send({
						success: false,
						error: 'Error while deleting country, please select country and try again.'
					})
					break
			}
		} else {
			next()
		}
	},
	edit_country (req, res, next) {
    let countryErrors = []
		const schema = {
			country_name: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
      country_shortname: Joi.string().regex(/^[a-zA-Z]+$/).required(),
			country_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'country_name':
					countryErrors.push('Wrong country name. Please use letters only.')
					break
				case 'country_shortname':
					countryErrors.push('Wrong country short name. Please use letters only.')
					break
				case 'country_id':
					countryErrors.push('Country identity.')
					break
			}
			res.send({
				success: false,
				error_type: 'data_validation',
				error: countryErrors
			})
		} else {
			next()
		}
	}
}
