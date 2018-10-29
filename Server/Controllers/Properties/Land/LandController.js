const errorHandler = require('../../errorHandler')
const db = require('../../../config/config')

module.exports = {
	async AddLand (req, res) {
		const propType = req.body.propType
		const title = req.body.title
		const propCategory = req.body.category
		const address = req.body.address
		const details = req.body.details
		const location = req.body.location
		const owner = req.body.owner
		const price = req.body.price
		const bgTileImg = req.body.bgTileImg
		const features = req.body.features
		const facilities = req.body.facilities
		const otherImages = req.body.otherImages

		try{
			let propExists = `SELECT count(*) AS propCount FROM ?? WHERE ?? = ? AND ?? = ?`
			db.db.query(propExists, ['property',
			'PropertyName', title,
			'PropertyOwner', owner], (err, result, fields) => {
				if (err) {
			    res.send({
			      success: false,
						error_type: 1,
			      error:'error ocurred' + err
			    })
				} else {
					if (result[0].propCount < 1) {
            // insert property
            let add_property = `INSERT INTO ?? SET ?`
            db.db.query(add_property, ['property', {
              PropertyName: title,
              PropertyDetails: details,
							PropertyLocation: location,
							PropertyOwner: owner,
							PropertyPrice: price,
							PropertyAddress: address,
							PropertyType: propType,
							propImage: bgTileImg,
							PropertyCategory: propCategory
            }], (err, resulte) => {
              if (err) {
                res.send({
                  success: false,
                  error:'error ocurred' + err
                })
              } else {
								const propID = resulte.insertId

								// Add property features if any
								if (features.length > 0) {
									let featureIDs = []
									for (let i = 0; i < features.length; i++) {
										let propFea = []
										propFea[0] = features[i].feature_id
										propFea[1] = propID
										featureIDs.push(propFea)
									}

									let insertData = `INSERT INTO
																		propertyfeatures
																		(Feature, FeatureProperty)
																		VALUES ?`
									db.db.query(insertData, [featureIDs], (err, rows) => {
										if (err) throw err
									})
								}

								// Add property facilities if any
								if (facilities.length > 0) {
									let facilitiesIDs = []
									for (let b = 0; b < facilities.length; b++) {
										let propFac = []
										propFac[0] = facilities[b].facility_id
										propFac[1] = propID
										facilitiesIDs.push(propFac)
									}

									let insertFacData = `INSERT INTO
																		propertyfacilities
																		(Facility, FacilityProperty)
																		VALUES ?`
									db.db.query(insertFacData, [facilitiesIDs], (err, rows) => {
										if (err) throw err
									})
								}

								// Add property other images if any
								if (otherImages.length > 0) {
									let images = []
									for (let a = 0; a < otherImages.length; a++) {
										let img = []
										img[0] = otherImages[a]
										img[1] = propID
										images.push(img)
									}

									let insertPropImages = `INSERT INTO
																		propertyimages
																		(PropertyImage, Property)
																		VALUES ?`
									db.db.query(insertPropImages, [images], (err, rows) => {
										if (err) throw err
									})
								}

                //query new data to update the frontend/client
								let lands = `SELECT ?? AS prop_id,
								?? AS title, ?? AS img, ?? AS price,
								?? AS location, ?? AS type, ?? AS category
								FROM ?? INNER JOIN ?? ON ?? = ??
								INNER JOIN ?? ON ?? = ??
								INNER JOIN ?? ON ?? = ??`
								db.db.query(lands, ['property.Property_Id', 'property.PropertyName',
								'property.propImage',
								'property.PropertyPrice', 'area.AreaName',
								'propertytype.PropertyTypeName', 'propertycategory.CategoryName',
								'property', 'area',
								'property.PropertyLocation', 'area.Area_Id', 'propertytype',
								'property.PropertyType', 'propertytype.PropertyType_Id',
								'propertycategory', 'property.PropertyCategory',
								'propertycategory.PropertyCategory_Id'], (err, rows) => {
                  if (err) {
                    res.send({
                      success: false,
                      error:'error ocurred' + err
                    })
                  } else {
                    res.send({
                      success: true,
                      message: 'Land property added successfully.',
                      lands: rows
                    })
                  }
                })
              }
            })
					} else {
							res.send({
								success: false,
								error: 'Land property title by the same property owner already exists, please use another title.'
							})
						}
				}
			})
		} catch(err) {
			res.send({
				success: false,
				error: 'Something wrong happened while adding land property. Please try again.'
			})
		}
	},
	insertMultipleData (dataArray, table, propertyID) {
		let insertData = `INSERT INTO ?? SET ??`
		db.db.query(insertData, [], (err, rows) => {
			if (err) {
				return false
			} else { return true }
		})
	},
	async addMultiple (req, res) {
		let facilities = req.body.facilities
		let propID = req.body.propID

		let propFea = []
		let alreadyExists = []
		let polly = []

		for (let i = 0; i < facilities.length; i++) {
			let x = facilities[i].facility_id

			let facExists = `SELECT count(*) AS facCount FROM ?? WHERE ?? = ? AND ?? = ?`
			db.db.query(facExists, ['propertyfacilities',
			'Facility', x,
			'FacilityProperty', propID], (err, result, fields) => {
				if (err) {
					res.send({
						'error': err
					})
				} else {
					if (result[0].facCount < 1) {
						polly.push(result[0].facCount)
						console.log('Count :' + result[0].facCount)
						let paa = []
						paa[0] = x
						paa[1] = propID
						propFea.push(paa)
					} else {
						alreadyExists.push(x)
					}
				}
			})
		}
		res.send({
			'propFea': propFea,
			'alreadyExists': alreadyExists,
			'polly': polly
		})

		/* if (alreadyExists.length > 0) {
			res.send({
				'success': false,
				'alreadyExists': alreadyExists
			})
		} else {
			// check for facilities that are already belonging to some properties
			let insertData = `INSERT INTO
												propertyfacilities
												(Facility, FacilityProperty)
												VALUES ?`
			db.db.query(insertData, [propFea], (err, rows) => {
				if (err) {
					res.send({
						'success': false,
						'error': err
					})
				} else {
					res.send({
						'success': true,
						'rows': rows
					})
				}
			})
		} */
	},
	async Lands (req, res) {
		let lands = `SELECT ?? AS prop_id, ?? AS title, ?? AS img, ?? AS price,
		?? AS location, ?? AS type, ?? AS category
		FROM ?? INNER JOIN ?? ON ?? = ??
		INNER JOIN ?? ON ?? = ??
		INNER JOIN ?? ON ?? = ??`
		db.db.query(lands, ['property.Property_Id', 'property.PropertyName',
		'property.propImage',
		'property.PropertyPrice', 'area.AreaName',
		'propertytype.PropertyTypeName', 'propertycategory.CategoryName',
		'property', 'area',
		'property.PropertyLocation', 'area.Area_Id', 'propertytype',
		'property.PropertyType', 'propertytype.PropertyType_Id',
		'propertycategory', 'property.PropertyCategory',
		'propertycategory.PropertyCategory_Id'], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred' + err
        })
      } else {
        res.send({
          success: true,
          lands: rows
        })
      }
    })
	},
	async delete_land (req, res) {
		const prop_id = req.params.prop_id
		let deleteProperty = `DELETE FROM ?? WHERE ?? = ?`
		try {
			db.db.query(deleteProperty, ['property', 'Property_Id', prop_id], (err, result) => {
				if (err) throw err
				let lands = `SELECT ?? AS prop_id,
				?? AS title, ?? AS img, ?? AS price,
				?? AS location, ?? AS type, ?? AS category
				FROM ?? INNER JOIN ?? ON ?? = ??
				INNER JOIN ?? ON ?? = ??
				INNER JOIN ?? ON ?? = ??`
				db.db.query(lands, ['property.Property_Id', 'property.PropertyName',
				'property.propImage',
				'property.PropertyPrice', 'area.AreaName',
				'propertytype.PropertyTypeName', 'propertycategory.CategoryName',
				'property', 'area',
				'property.PropertyLocation', 'area.Area_Id', 'propertytype',
				'property.PropertyType', 'propertytype.PropertyType_Id',
				'propertycategory', 'property.PropertyCategory',
				'propertycategory.PropertyCategory_Id'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: 'Property deleted successfully.',
						lands: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				error_type: 1,
				error: 'An error occured while deleting property.' + error
			})
		}
	},
	async edit_land (req, res) {
		const facility_id = req.body.facility_id
		const facility = req.body.facility
		const category = req.body.category

		let facility_edit = `UPDATE facilities SET FacilityName = ?,
		FacilitiyType = ?
		WHERE Facility_Id = ?`

		try {
			db.db.query(facility_edit, [facility, category, facility_id], (err, result) => {
				if (err) throw err
				let facilities = `SELECT ?? AS facility_id, ?? AS facility, ?? AS category FROM ??`
		    db.db.query(facilities, ['facilities.Facility_Id',
		    'facilities.FacilityName', 'facilities.FacilitiyType', 'facilities'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: `Facility edited successfully.`,
						facilities: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				error_type: 1,
				error: 'An error occured while editing facility: ' + error
			})
		}
	}
}
