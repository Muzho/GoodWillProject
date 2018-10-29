const Joi = require('joi')

module.exports = {
	AddRegion (req, res, next) {
    let regionErrors = []
		const schema = {
			region_name: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
      country_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'country_name':
					regionErrors.push('Wrong region name. Please use letters only.')
					break
				case 'country_id':
					regionErrors.push('Please select country.')
					break
			}
			res.send({
				success: false,
				error: regionErrors
			})
		} else {
			next()
		}
	},
	delete_region (req, res, next) {
		const schema = {
			country_id: Joi.number().integer().min(1).required(),
      region_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'country_id':
					res.send({
						success: false,
						error: 'Please select a country-region to delete.'
					})
					break
        case 'region_id':
  				res.send({
  					success: false,
  					error: 'Please select a region to delete.'
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
	edit_region (req, res, next) {
    let regionErrors = []
		const schema = {
			region_name: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
      region_id: Joi.number().integer().min(1).required(),
			country_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'region_name':
					regionErrors.push('Wrong region name. Please use letters only.')
					break
				case 'region_id':
					regionErrors.push('Region identity.')
					break
				case 'country_id':
					regionErrors.push('Country identity.')
					break
			}
			res.send({
				success: false,
				error_type: 0,
				error: regionErrors
			})
		} else {
			next()
		}
	}
}
