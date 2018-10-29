const Joi = require('joi')

module.exports = {
	AddFeature (req, res, next) {
    let featureErrors = []
		const schema = {
			feature: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
      category: Joi.string().regex(/^[a-zA-Z]+$/).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'feature':
					featureErrors.push('Wrong feature name. Please use letters only.')
					break
				case 'category':
					featureErrors.push('Please select category.')
					break
			}
			res.send({
				success: false,
				error: featureErrors
			})
		} else {
			next()
		}
	},
	delete_feature (req, res, next) {
		let facilityErrors = []
		const schema = {
			feature_id: Joi.number().integer().min(1).required(),
			category: Joi.string().regex(/^[a-zA-Z]+$/).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'feature_id':
					featureErrors.push('Feature identity error.')
					break
        case 'category':
					featureErrors.push('Category identity error.')
  				break
			}
			res.send({
				success: false,
				error_type: 0,
				error: featureErrors
			})
		} else {
			next()
		}
	},
	edit_feature (req, res, next) {
    let featureErrors = []
		const schema = {
			feature_id: Joi.number().integer().min(1).required(),
			feature: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
			category: Joi.string().regex(/^[a-zA-Z]+$/).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'feature_id':
					countryErrors.push('Feature identity error.')
					break
				case 'feature':
					featureErrors.push('Wrong feature name. Please use letters only.')
					break
				case 'category':
					featureErrors.push('Select category.')
					break
			}
			res.send({
				success: false,
				error_type: 0,
				error: featureErrors
			})
		} else {
			next()
		}
	}
}
