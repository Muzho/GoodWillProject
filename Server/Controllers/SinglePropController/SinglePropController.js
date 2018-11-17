const errorHandler = require('../errorHandler')
const db = require('../../config/config')

module.exports = {
	async SingleProp (req, res) {
    const propID = req.params.propID
    let property = `SELECT ?? AS prop_id,
    ?? AS title,
    ?? AS details,
		?? AS owner,
    ?? AS img,
    ?? AS price,
		?? AS address,
    ?? AS location, ?? AS locationID,
		?? AS type, ?? AS typeID,
		?? AS category, ?? AS categoryID
    FROM ?? INNER JOIN ?? ON ?? = ??
    INNER JOIN ?? ON ?? = ??
    INNER JOIN ?? ON ?? = ?? WHERE ?? = ?`
    db.db.query(property, ['property.Property_Id',
    'property.PropertyName',
    'property.PropertyDetails',
		'property.PropertyOwner',
    'property.propImage',
    'property.PropertyPrice',
		'property.PropertyAddress',
		'area.AreaName', 'property.PropertyLocation',
    'propertytype.PropertyTypeName', 'property.PropertyType',
		'propertycategory.CategoryName', 'property.PropertyCategory',
    'property', 'area',
    'property.PropertyLocation', 'area.Area_Id',
		'propertytype',
		'property.PropertyType', 'propertytype.PropertyType_Id',
    'propertycategory',
		'property.PropertyCategory', 'propertycategory.PropertyCategory_Id',
		'property.Property_Id', propID], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred' + err
        })
      } else {
        res.send({
          success: true,
          property: rows[0]
        })
      }
    })
	},
	async SinglePropFacFea (req, res) {
		try {
			const prop_id = req.params.propID
			let facilities = `SELECT ?? AS PropFacID, ?? AS facID, ?? AS facilityName FROM ??
			JOIN ?? ON ?? = ?? WHERE ?? = ?`
			db.db.query(facilities, ['propertyfacilities.PropertyFacility_Id',
			'propertyfacilities.Facility',
			'facilities.FacilityName', 'propertyfacilities', 'facilities',
			'propertyfacilities.Facility', 'facilities.Facility_Id',
			'propertyfacilities.FacilityProperty', prop_id], (err, rows) => {
				if (err) throw err

				let features = `SELECT ?? AS PropFeaID, ?? AS feaID, ?? AS featureName FROM ??
				JOIN ?? ON ?? = ?? WHERE ?? = ?`
				db.db.query(features, ['propertyfeatures.PropertyFeature_Id',
				'propertyfeatures.Feature',
				'features.FeatureName', 'propertyfeatures', 'features',
				'propertyfeatures.Feature', 'features.Feature_Id',
				'propertyfeatures.FeatureProperty', prop_id], (err, results) => {
					if (err) throw err
					res.send({
						success: true,
						facilities: rows,
						features: results
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while fetching property facilities and features.' + error
			})
		}
	},
	async PropOwner (req, res) {
		try {
			const prop_id = req.params.propID
			// const owner_id = req.params.ownerID
			let owner = `SELECT ?? AS ownerID,
			?? AS name,
			?? AS contact,
			?? AS Lincense,
			?? AS email,
			?? AS ownership
			FROM ??
			JOIN ?? ON ?? = ?? WHERE ?? = ?`
			db.db.query(owner, ['propertyowner.PropertyOwner_Id',
			'propertyowner.Name',
			'propertyowner.Contact',
			'propertyowner.LicenseNumber',
			'propertyowner.Email',
			'propertyowner.Ownership',
			'property',
			'propertyowner',
			'property.PropertyOwner',
			'propertyowner.PropertyOwner_Id',
			'property.Property_Id', prop_id], (err, rows) => {
				if (err) throw err
				res.send({
					success: true,
					owner: rows[0]
				})
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while fetching property owner.' + error
			})
		}
	},
	async editSingleProperty (req, res) {
		const propType = req.body.propType
		const title = req.body.title
		const propCategory = req.body.category
		const address = req.body.address
		const details = req.body.details
		const location = req.body.location
		const propID = req.body.propID
		const price = req.body.price

		let editProperty = `UPDATE property SET PropertyName = ?,
		PropertyDetails = ?,
		PropertyLocation = ?,
		PropertyPrice = ?,
		PropertyAddress = ?,
		PropertyType = ?,
		PropertyCategory = ?
		WHERE Property_Id = ?`

		try {
			db.db.query(editProperty, [title,
				details,
				location,
				price,
				address,
				propType,
				propCategory,
				propID], (err, result) => {
				if (err) throw err
				let property = `SELECT ?? AS prop_id,
		    ?? AS title,
		    ?? AS details,
				?? AS owner,
		    ?? AS img,
		    ?? AS price,
				?? AS address,
		    ?? AS location, ?? AS locationID,
				?? AS type, ?? AS typeID,
				?? AS category, ?? AS categoryID
		    FROM ?? INNER JOIN ?? ON ?? = ??
		    INNER JOIN ?? ON ?? = ??
		    INNER JOIN ?? ON ?? = ?? WHERE ?? = ?`
		    db.db.query(property, ['property.Property_Id',
		    'property.PropertyName',
		    'property.PropertyDetails',
				'property.PropertyOwner',
		    'property.propImage',
		    'property.PropertyPrice',
				'property.PropertyAddress',
				'area.AreaName', 'property.PropertyLocation',
		    'propertytype.PropertyTypeName', 'property.PropertyType',
				'propertycategory.CategoryName', 'property.PropertyCategory',
		    'property', 'area',
		    'property.PropertyLocation', 'area.Area_Id',
				'propertytype',
				'property.PropertyType', 'propertytype.PropertyType_Id',
		    'propertycategory',
				'property.PropertyCategory', 'propertycategory.PropertyCategory_Id',
				'property.Property_Id', propID], (err, rows) => {
		      if (err) {
		        res.send({
		          success: false,
		          error:'error ocurred' + err
		        })
		      } else {
		        res.send({
		          success: true,
							message: 'Property edited successfully',
		          property: rows[0]
		        })
		      }
		    })
			})
		} catch (error) {
			res.send({
				success: false,
				error_type: 1,
				error: 'An error occured while editing area: ' + error
			})
		}
	},
	async changePropOwner (req, res) {
		const propID = req.params.propID
		const owner = req.params.owner

		let editProperty = `UPDATE property SET PropertyOwner = ? WHERE Property_Id = ?`

		try {
			db.db.query(editProperty, [owner, propID], (err, result) => {
				if (err) throw err
				let owner = `SELECT ?? AS ownerID,
				?? AS name,
				?? AS contact,
				?? AS Lincense,
				?? AS email,
				?? AS ownership
				FROM ??
				JOIN ?? ON ?? = ?? WHERE ?? = ?`
				db.db.query(owner, ['propertyowner.PropertyOwner_Id',
				'propertyowner.Name',
				'propertyowner.Contact',
				'propertyowner.LicenseNumber',
				'propertyowner.Email',
				'propertyowner.Ownership',
				'property',
				'propertyowner',
				'property.PropertyOwner',
				'propertyowner.PropertyOwner_Id',
				'property.Property_Id', propID], (err, rows) => {
					if (err) throw err
					res.send({
						success: true,
						owner: rows[0],
						message: 'Property owner changed successfully'
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				error_type: 1,
				error: 'An error occured while editing area: ' + error
			})
		}
	},
	async deletePropertyFeature (req, res) {
		const prop_id = req.params.prop_id
		const feature_id = req.params.feature_id
		let deletePropFeature = `DELETE FROM ?? WHERE ?? = ? AND ?? = ?`
		try {
			db.db.query(deletePropFeature, ['propertyfeatures',
				'PropertyFeature_Id',
				feature_id,
				'FeatureProperty',
				prop_id], (err, result) => {
				if (err) throw err
				let propFeatures = `SELECT ?? AS PropFeaID, ?? AS featureName, ?? AS feature FROM ??
				JOIN ?? ON ?? = ?? WHERE ?? = ?`
				db.db.query(propFeatures, ['propertyfeatures.PropertyFeature_Id',
				'features.FeatureName', 'propertyfeatures.feature', 'propertyfeatures', 'features',
				'propertyfeatures.Feature', 'features.Feature_Id',
				'propertyfeatures.FeatureProperty', prop_id], (err, results) => {
					if (err) throw err
					let features = `SELECT ?? AS feature_id, ?? AS feature, ?? AS category FROM ??`
			    db.db.query(features, ['features.Feature_Id',
			    'features.FeatureName', 'features.FeatureType', 'features'], (err, rows) => {
			      if (err) {
			        res.send({
			          success: false,
			          error:'error ocurred' + err
			        })
			      } else {
			        res.send({
			          success: true,
			          features: rows,
								propFeatures: results
			        })
			      }
			    })
				})
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while deleting city.' + error
			})
		}
	},
	async deletePropertyFacility (req, res) {
		const prop_id = req.params.prop_id
		const facility_id = req.params.facility_id
		let deletePropFacility = `DELETE FROM ?? WHERE ?? = ? AND ?? = ?`
		try {
			db.db.query(deletePropFacility, ['propertyfacilities',
				'PropertyFacility_Id',
				facility_id,
				'FacilityProperty',
				prop_id], (err, result) => {
				if (err) throw err
				let propFacilities = `SELECT ?? AS PropFacID, ?? AS facilityName, ?? AS facility FROM ??
				JOIN ?? ON ?? = ?? WHERE ?? = ?`
				db.db.query(propFacilities, ['propertyfacilities.PropertyFacility_Id',
				'facilities.FacilityName',
				'propertyfacilities.Facility',
				'propertyfacilities', 'facilities',
				'propertyfacilities.Facility', 'facilities.Facility_Id',
				'propertyfacilities.FacilityProperty', prop_id], (err, results) => {
					if (err) throw err
					let facilities = `SELECT ?? AS facility_id, ?? AS facility, ?? AS category FROM ??`
			    db.db.query(facilities, ['facilities.Facility_Id',
			    'facilities.FacilityName', 'facilities.FacilitiyType', 'facilities'], (err, rows) => {
			      if (err) {
			        res.send({
			          success: false,
			          error:'error ocurred' + err
			        })
			      } else {
			        res.send({
			          success: true,
			          facilities: rows,
								propFacilities: results
			        })
			      }
			    })
				})
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while deleting city.' + error
			})
		}
	},
	async addPropertyFeatures (req, res) {
		const propID = req.body.propID
		const features = req.body.features

		try {
			// get all property features ids
			let featureIDs = []
			for (let i = 0; i < features.length; i++) {
				featureIDs.push(features[i].feature_id)
			}

			// check if all features dont exist with the property
			let propFeatures = `SELECT ?? FROM ?? WHERE ?? = ?`
			db.db.query(propFeatures, ['Feature',
			'propertyfeatures',
			'FeatureProperty', propID], (err, results) => {
				if (err) {
					res.send({
						success: false,
						error_type: 1,
						error:'error ocurred' + err
					})
				} else {
					let dontExist = []
					let alreadyExists = []
					let featuresAdd = []
					if (results) {
						for (let a = 0; a < results.length; a++) {
							alreadyExists.push(results[a].Feature)
						}
					}

					for (let b = 0; b < featureIDs.length; b++) {
						if (!alreadyExists.includes(featureIDs[b])) {
							// dontExist.push(featureIDs[b])
							let propFea = []
							propFea[0] = featureIDs[b]
							propFea[1] = propID
							dontExist.push(propFea)
						}
					}

					if (dontExist.length > 0) {
						let insertData = `INSERT INTO
															propertyfeatures
															(Feature, FeatureProperty)
															VALUES ?`
						db.db.query(insertData, [dontExist], (err, rows) => {
							if (err) throw err

							let allPropertyFeatures = `SELECT ?? AS PropFeaID, ?? AS feaID, ?? AS featureName FROM ??
							JOIN ?? ON ?? = ?? WHERE ?? = ?`
							db.db.query(allPropertyFeatures, ['propertyfeatures.PropertyFeature_Id',
							'propertyfeatures.Feature',
							'features.FeatureName', 'propertyfeatures', 'features',
							'propertyfeatures.Feature', 'features.Feature_Id',
							'propertyfeatures.FeatureProperty', propID], (err, resulta) => {
								if (err) throw err
								let allFeatures = `SELECT ?? AS feature_id, ?? AS feature, ?? AS category FROM ??`
						    db.db.query(allFeatures, ['features.Feature_Id',
						    'features.FeatureName', 'features.FeatureType', 'features'], (err, rowe) => {
						      if (err) {
						        res.send({
						          success: false,
						          error:'error ocurred' + err
						        })
						      } else {
										res.send({
											success: true,
											features: resulta,
											allFeatures: rowe
										})
						      }
						    })
							})
						})
					} else {
						res.send({
							success: false,
							message: 'Features have already been added.'
						})
					}
				}
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while adding property features.' + error
			})
		}
	},
	async addPropertyFacilities (req, res) {
		const propID = req.body.propID
		const facilities = req.body.facilities

		try {
			// get all property facilities ids
			let facilityIDs = []
			for (let i = 0; i < facilities.length; i++) {
				facilityIDs.push(facilities[i].facility_id)
			}

			// check if all facilities dont exist with the property
			let propFacilities = `SELECT ?? FROM ?? WHERE ?? = ?`
			db.db.query(propFacilities, ['Facility',
			'propertyfacilities',
			'FacilityProperty', propID], (err, results) => {
				if (err) {
					res.send({
						success: false,
						error_type: 1,
						error:'error ocurred' + err
					})
				} else {
					let dontExist = []
					let alreadyExists = []
					let facilitiesAdd = []
					if (results) {
						for (let a = 0; a < results.length; a++) {
							alreadyExists.push(results[a].Facility)
						}
					}

					for (let b = 0; b < facilityIDs.length; b++) {
						if (!alreadyExists.includes(facilityIDs[b])) {
							let propFac = []
							propFac[0] = facilityIDs[b]
							propFac[1] = propID
							dontExist.push(propFac)
						}
					}

					if (dontExist.length > 0) {
						let insertData = `INSERT INTO
															propertyfacilities
															(Facility, FacilityProperty)
															VALUES ?`
						db.db.query(insertData, [dontExist], (err, rows) => {
							if (err) throw err

							let allPropertyFacilities = `SELECT ?? AS PropFacID, ?? AS facID, ?? AS facilityName FROM ??
							JOIN ?? ON ?? = ?? WHERE ?? = ?`
							db.db.query(allPropertyFacilities, ['propertyfacilities.PropertyFacility_Id',
							'propertyfacilities.Facility',
							'facilities.FacilityName', 'propertyfacilities', 'facilities',
							'propertyfacilities.Facility', 'facilities.Facility_Id',
							'propertyfacilities.FacilityProperty', propID], (err, resulta) => {
								if (err) throw err
								let allFacilities = `SELECT ?? AS facility_id, ?? AS facility, ?? AS category FROM ??`
						    db.db.query(allFacilities, ['facilities.Facility_Id',
						    'facilities.FacilityName', 'facilities.FacilitiyType', 'facilities'], (err, rowe) => {
						      if (err) {
						        res.send({
						          success: false,
						          error:'error ocurred' + err
						        })
						      } else {
										res.send({
											success: true,
											facilities: resulta,
											allFacilities: rowe
										})
						      }
						    })
							})
						})
					} else {
						res.send({
							success: false,
							message: 'Facilities have already been added.'
						})
					}
				}
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while adding property facilities.' + error
			})
		}
	},
	async propImages (req, res) {
		try {
			const prop_id = req.params.propID
			let tileImg = `SELECT ?? FROM ?? WHERE ?? = ?`
			db.db.query(tileImg, ['propImage', 'property', 'Property_Id', prop_id], (err, result) => {
				if (err) throw err
				let otherImages = `select ??, ?? FROM ?? WHERE ?? = ?`
				db.db.query(otherImages, ['PropertyImage_Id', 'PropertyImage', 'propertyimages', 'Property', prop_id], (err, results) => {
					if (err) throw err
					res.send({
						success: true,
						tileImg: result[0],
						otherImages: results
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while fetching property images. ' + error
			})
		}
	},
	async removeImage (req, res) {
		try {
			const image = req.params.imageID
			const property = req.params.propID

			let deleteImage = `DELETE FROM ?? WHERE ?? = ? AND ?? = ?`
			db.db.query(deleteImage, ['propertyimages',
			'PropertyImage_Id', image,
			'Property', property], (err, result) => {
				if (err) throw err

				let remainingImages = `SELECT ??, ?? FROM ?? WHERE ?? = ?`
				db.db.query(remainingImages, ['PropertyImage_Id',
				'PropertyImage',
				'propertyimages', 'Property', property], (err, results) => {
					if (err) throw err

					res.send({
						success: true,
						remainingImages: results
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				error_type: 3,
				message: 'An error occured while deleting property image. ' + error
			})
		}
	},
	async changeTileImage (req, res) {
		try {
			const tileImage = req.body.tileImage
			const propID = req.body.propID
			let updateTileImage = `UPDATE property SET propImage = ? WHERE Property_Id = ?`
			db.db.query(updateTileImage, [tileImage, propID], (err, result) => {
				if (err) throw err
				let newTileImg = `SELECT ?? FROM ?? WHERE ?? = ?`
				db.db.query(newTileImg, ['propImage', 'property', 'Property_Id', propID], (err, resulte) => {
					if (err) throw err
					res.send({
						success: true,
						tileImg: resulte[0]
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				error_type: 3,
				message: 'An error occured chnaging tile image. ' + error
			})
		}
	},
	async addPropertyImages (req, res) {
		try {
			const otherImages = req.body.images
			const propID = req.body.propID
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
					let otherPropertyImages = `select ??, ?? FROM ?? WHERE ?? = ?`
					db.db.query(otherPropertyImages, ['PropertyImage_Id',
					'PropertyImage',
					'propertyimages',
					'Property', propID], (err, results) => {
						if (err) throw err
						res.send({
							success: true,
							otherImages: results
						})
					})
				})
			}
		} catch (error) {
			res.send({
				success: false,
				error_type: 3,
				message: 'An error occured chnaging tile image. ' + error
			})
		}
	}
}
