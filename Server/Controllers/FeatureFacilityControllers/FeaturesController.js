const errorHandler = require('../errorHandler')
const db = require('../../config/config')

module.exports = {
	async AddFeature (req, res) {
		const feature = req.body.feature
		const category = req.body.category

		try{
			let featureExists = `SELECT count(*) AS featureCount FROM ?? WHERE ?? = ?`
			db.db.query(featureExists, ['features', 'FeatureName', feature], (err, result, fields) => {
				if (err) {
			    res.send({
			      success: false,
			      error:'error ocurred' + err
			    })
				} else {
					if (result[0].featureCount < 1) {
            // insert feature
            let add_feature = `INSERT INTO ?? SET ?`
            db.db.query(add_feature, ['features', {
              FeatureName: feature,
              FeatureType: category
            }], (err, resulte) => {
              if (err) {
                res.send({
                  success: false,
                  error:'error ocurred' + err
                })
              } else {
                //query new data to update the frontend/client
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
                      message: 'Feature added successfully.',
                      features: rows
                    })
                  }
                })
              }
            })
					} else {
							res.send({
								success: false,
								error: 'Feature already exists.'
							})
						}
				}
			})
		} catch(err) {
			res.send({
				success: false,
				error: 'Something wrong happened while adding feature. Please try again.'
			})
		}
	},
	async Features (req, res) {
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
          features: rows
        })
      }
    })
	},
	async prop_features (req, res) {
		const propType = req.params.propType
    let features = `SELECT ?? AS feature_id, ?? AS feature, ?? AS category FROM ?? WHERE ?? = ?`
    db.db.query(features, ['features.Feature_Id',
    'features.FeatureName', 'features.FeatureType', 'features', 'features.FeatureType', propType], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred' + err
        })
      } else {
        res.send({
          success: true,
          features: rows
        })
      }
    })
	},
	async delete_feature (req, res) {
		const feature_id = req.params.feature_id
    const category = req.params.category
		let deleteFeature = `DELETE FROM ?? WHERE ?? = ? AND ?? = ?`
		try {
			db.db.query(deleteFeature, ['features', 'Feature_Id', feature_id, 'FeatureType', category], (err, result) => {
				if (err) throw err
				let features = `SELECT ?? AS feature_id, ?? AS feature, ?? AS category FROM ??`
		    db.db.query(features, ['features.Feature_Id',
		    'features.FeatureName', 'features.FeatureType', 'features'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: 'Feature deleted successfully.',
						features: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while deleting feature.' + error
			})
		}
	},
	async edit_feature (req, res) {
		const feature_id = req.body.feature_id
		const feature = req.body.feature
		const category = req.body.category

		let feature_edit = `UPDATE features SET FeatureName = ?,
		FeatureType = ?
		WHERE Feature_Id = ?`

		try {
			db.db.query(feature_edit, [feature, category, feature_id], (err, result) => {
				if (err) throw err
				let features = `SELECT ?? AS feature_id, ?? AS feature, ?? AS category FROM ??`
		    db.db.query(features, ['features.Feature_Id',
		    'features.FeatureName', 'features.FeatureType', 'features'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: `Feature edited successfully.`,
						features: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				error_type: 1,
				error: 'An error occured while editing feature: ' + error
			})
		}
	}
}
