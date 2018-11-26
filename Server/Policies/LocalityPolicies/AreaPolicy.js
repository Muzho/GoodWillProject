const Joi = require('joi')

module.exports = {
	AddArea (req, res, next) {
    let areaErrors = []
		const schema = {
			area_name: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
      city_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'area_name':
					areaErrors.push('Wrong area name. Please use letters only.')
					break
				case 'city_id':
					areaErrors.push('Please select city.')
					break
			}
			res.send({
				success: false,
				error: areaErrors
			})
		} else {
			next()
		}
	},
	delete_area (req, res, next) {
		const schema = {
			area_id: Joi.number().integer().min(1).required(),
			city_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'city_id':
					res.send({
						success: false,
						error: 'Please select a city.'
					})
					break
        case 'area_id':
  				res.send({
  					success: false,
  					error: 'Please select a region to delete.'
  				})
  				break
				default:
					res.send({
						success: false,
						error: 'Error while deleting area, please select area and try again.'
					})
					break
			}
		} else {
			next()
		}
	},
	edit_area (req, res, next) {
    let countryErrors = []
		const schema = {
			area_id: Joi.number().integer().min(1).required(),
			area_name: Joi.string().regex(/^[a-zA-Z ]+$/).required(),
			city_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'area_id':
					countryErrors.push('Select area.')
					break
				case 'area_name':
					countryErrors.push('Wrong area name. Please use letters only.')
					break
				case 'city_id':
					countryErrors.push('Select city.')
					break
			}
			res.send({
				success: false,
				error_type: 0,
				error: countryErrors
			})
		} else {
			next()
		}
	},
	areaProperties (req, res, next) {
		let areaErrors = []
		const schema = {
			areaID: Joi.number().integer().min(1).required(),
			category: Joi.number().integer().min(1).required(),
			type: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'areaID':
					areaErrors.push('Area identity error.')
					break
        case 'category':
					areaErrors.push('Category identity error.')
  				break
				case 'type':
					areaErrors.push('Type identity error.')
			}
			res.send({
				success: false,
				error_type: 0,
				error: areaErrors
			})
		} else {
			next()
		}
	}
}
