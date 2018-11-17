const Joi = require('joi')

module.exports = {
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
	SinglePropFacFea (req, res, next) {
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
	PropOwner (req, res, next) {
		let ownerErrors = []
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
				error: ownerErrors
			})
		} else {
			next()
		}
	},
	editSingleProperty (req, res, next) {
    let editPropertyErrors = []
		const schema = {
			title: Joi.string().regex(/^[a-zA-Z0-9 ]+$/).required(),
      address: Joi.string().regex(/^[a-zA-Z0-9\s,.'-]{3,}$/).required(),
      details: Joi.string().regex(/^[a-zA-Z0-9/.\-, ]+$/).required(),
			propType: Joi.number().integer().min(1).required(),
			category: Joi.number().integer().min(1).required(),
			location: Joi.number().integer().min(1).required(),
      propID: Joi.number().integer().min(1).required(),
      price: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'title':
					editPropertyErrors.push('Wrong title format, please use letters only')
					break
				case 'address':
					editPropertyErrors.push('Wrong address, please a correct address e.g. 32 Wilson Street')
					break
        case 'details':
  				editPropertyErrors.push('Wrong details format, please use letters and numbers only')
  				break
				case 'location':
					editPropertyErrors.push('Please select a correct location')
					break
	      case 'price':
	  			editPropertyErrors.push('Wrong price format. Please use numbers only')
	  			break
				case 'propID':
					editPropertyErrors.push('Property identity error.')
					break
				case 'category':
					editPropertyErrors.push('Please select property category i.e. rent, sale and new development')
					break
				case 'propType':
					editPropertyErrors.push('Please select property type.')
					break
			}
			res.send({
				success: false,
				error_type: 0,
				error: editPropertyErrors,
				errore: error
			})
		} else {
			next()
		}
	},
	changePropOwner (req, res, next) {
		let ownerErrors = []
		const schema = {
			owner: Joi.number().integer().min(1).required(),
			propID: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'owner':
					propErrors.push('Property owner identity error.')
	  			break
				case 'propID':
					propErrors.push('Property identity error.')
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
	removePropertyFeature (req, res, next) {
		let removeErrors = []
		const schema = {
			feature_id: Joi.number().integer().min(1).required(),
			prop_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'feature_id':
					removeErrors.push('Property feature identity error.')
	  			break
				case 'prop_id':
					removeErrors.push('Property identity error.')
		  		break
			}

			res.send({
				success: false,
				error_type: 0,
				error: removeErrors
			})
		} else {
			next()
		}
	},
	removePropertyFacility (req, res, next) {
		let removeErrors = []
		const schema = {
			facility_id: Joi.number().integer().min(1).required(),
			prop_id: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'facility_id':
					removeErrors.push('Property Facility identity error.')
	  			break
				case 'prop_id':
					removeErrors.push('Property identity error.')
		  		break
			}

			res.send({
				success: false,
				error_type: 0,
				error: removeErrors
			})
		} else {
			next()
		}
	},
	addPropertyFeatures (req, res, next) {
		let addFeaErrors = []
		const schema = {
			features: Joi.array().unique().required(),
			propID: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'features':
					addFeaErrors.push('No property features selected.')
	  			break
				case 'propID':
					addFeaErrors.push('Property identity error.')
		  		break
			}

			res.send({
				success: false,
				error_type: 0,
				error: addFeaErrors
			})
		} else {
			next()
		}
	},
	addPropertyFacilities (req, res, next) {
		let addFacErrors = []
		const schema = {
			facilities: Joi.array().unique().required(),
			propID: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'facilities':
					addFacErrors.push('No property facilities selected.')
	  			break
				case 'propID':
					addFacErrors.push('Property identity error.')
		  		break
			}

			res.send({
				success: false,
				error_type: 0,
				error: addFacErrors
			})
		} else {
			next()
		}
	},
	propImages (req, res, next) {
		let imageErrors = []
		const schema = {
			propID: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'propID':
					imageErrors.push('Property identity error.')
	  			break
			}

			res.send({
				success: false,
				error_type: 0,
				error: imageErrors
			})
		} else {
			next()
		}
	},
	removeImage (req, res, next) {
		let removeImageErrors = []
		const schema = {
			imageID: Joi.number().integer().min(1).required(),
			propID: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.params, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'imageID':
					removeImageErrors.push('Image selected identity error.')
	  			break
				case 'propID':
					removeImageErrors.push('Property identity error.')
		  		break
			}

			res.send({
				success: false,
				error_type: 0,
				error: removeImageErrors
			})
		} else {
			next()
		}
	},
	changeTileImage (req, res, next) {
		let changeTileImageErrors = []
		const schema = {
			tileImage: Joi.string().uri().trim().required(),
			propID: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'tileImage':
					changeTileImageErrors.push('Image selected identity error.')
	  			break
				case 'propID':
					changeTileImageErrors.push('Property identity error.')
		  		break
			}

			res.send({
				success: false,
				error_type: 0,
				error: changeTileImageErrors
			})
		} else {
			next()
		}
	},
	addPropertyImages (req, res, next) {
		let addPropImagesErrors = []
		const schema = {
			images: Joi.array().items(Joi.string()).single(),
			propID: Joi.number().integer().min(1).required()
		}

		const {error, value} = Joi.validate(req.body, schema)

		if (error) {
      switch (error.details[0].context.key) {
				case 'images':
					addPropImagesErrors.push('Images error.')
	  			break
				case 'propID':
					addPropImagesErrors.push('Property identity error.')
		  		break
			}

			res.send({
				success: false,
				error_type: 0,
				error: addPropImagesErrors
			})
		} else {
			next()
		}
	}
}
