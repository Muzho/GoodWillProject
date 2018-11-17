const Joi = require('joi')

module.exports = {
	AddLand (req, res, next) {
    let landErrors = [] // joi.string().uri().trim().required()
		// Joi.string().regex(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/).required()
		// (http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)
		// address -> [a-zA-Z0-9\s,.'-]{3,}$
		// facilities: Joi.array().items(Joi.string(), Joi.number()).single()
		// regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:jpg|gif|png)+$/)
		const schema = {
			title: Joi.string().regex(/^[a-zA-Z0-9 ]+$/).required(),
      address: Joi.string().regex(/^[a-zA-Z0-9\s,.'-]{3,}$/).required(),
      details: Joi.string().regex(/^[a-zA-Z0-9/.\-, ]+$/).required(),
			propType: Joi.number().integer().min(1).required(),
			category: Joi.number().integer().min(1).required(),
			location: Joi.number().integer().min(1).required(),
      owner: Joi.number().integer().min(1).required(),
      price: Joi.number().integer().min(1).required(),
			bgTileImg: Joi.string().uri().trim().required(),
			features: Joi.array().unique(),
			facilities: Joi.array().unique(),
			otherImages: Joi.array().items(Joi.string()).single()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'title':
					landErrors.push('Wrong title format, please use letters only')
					break
				case 'address':
					landErrors.push('Wrong address, please a correct address e.g. 32 Wilson Street')
					break
        case 'details':
  				landErrors.push('Wrong details format, please use letters and numbers only')
  				break
				case 'location':
					landErrors.push('Please select a correct location')
					break
				case 'owner':
					landErrors.push('Please select property owner')
					break
	      case 'price':
	  			landErrors.push('Wrong price format. Please use numbers only')
	  			break
				case 'bgTileImg':
					landErrors.push('Wrong image uri format, please use a correct uri e.g. www.google.com/qwerty.jpg')
					break
				case 'category':
					landErrors.push('Please select property category i.e. rent, sale and new development')
					break
				case 'propType':
					landErrors.push('Please select property type.')
					break
			}
			res.send({
				success: false,
				error_type: 0,
				error: landErrors,
				errore: error
			})
		} else {
			next()
		}
	},
	delete_land (req, res, next) {
		let propErrors = []
		const schema = {
			prop_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
        case 'prop_id':
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
	edit_land (req, res, next) {
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
