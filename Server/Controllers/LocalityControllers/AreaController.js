const errorHandler = require('../errorHandler')
const db = require('../../config/config')

module.exports = {
	async AddArea (req, res) {
		const area_name = req.body.area_name
		const city_id = req.body.city_id

		try{
			let areaExists = `SELECT count(*) AS areaCount FROM ?? WHERE ?? = ?`
			db.db.query(areaExists, ['area', 'AreaName', area_name], (err, result, fields) => {
				if (err) {
			    res.send({
			      success: false,
			      error:'error ocurred' + err
			    })
				} else {
					if (result[0].areaCount < 1) {
							// check for city existance
              let cityExists = `SELECT count(*) AS cityCount FROM ?? WHERE ?? = ?`
              db.db.query(cityExists, ['city', 'City_Id', city_id], (err, resulta, fields) => {
                if (err) {
                  res.send({
        			      success: false,
        			      error:'error ocurred' + err
        			    })
                } else {
                  if (resulta[0].cityCount === 1) {
                    // insert area
                    let add_area = `INSERT INTO ?? SET ?`
                    db.db.query(add_area, ['area', {
                      AreaName: area_name,
                      AreaCity: city_id
                    }], (err, resulte) => {
                      if (err) {
                        res.send({
              			      success: false,
              			      error:'error ocurred' + err
              			    })
                      } else {
                        //query new data to update the frontend/client
                        let areas = `SELECT ?? AS area_id, ?? AS area_name, ?? AS city_id, ?? AS city_name FROM ?? JOIN ?? ON ?? = ??`
                        db.db.query(areas, ['area.Area_Id',
                        'area.AreaName', 'area.AreaCity', 'city.CityName', 'area', 'city', 'area.AreaCity', 'city.City_Id'], (err, rows) => {
                          if (err) {
                            res.send({
                  			      success: false,
                  			      error:'error ocurred' + err
                  			    })
                          } else {
                            res.send({
                              success: true,
                              message: 'Area added successfully.',
                              areas: rows
                            })
                          }
                        })
                      }
                    })
                  } else {
                    res.send({
      								success: false,
      								error: 'City selected does not exist.'
      							})
                  }
                }
              })
					} else {
							res.send({
								success: false,
								error: 'Area already exists.'
							})
						}
				}
			})
		} catch(err) {
			res.send({
				success: false,
				error: 'Something wrong happened while adding area. Please try again.'
			})
		}
	},
	async Areas (req, res) {
    let areas = `SELECT ?? AS area_id, ?? AS area_name, ?? AS city_id, ?? AS city_name FROM ?? JOIN ?? ON ?? = ??`
    db.db.query(areas, ['area.Area_Id',
    'area.AreaName', 'area.AreaCity', 'city.CityName', 'area', 'city', 'area.AreaCity', 'city.City_Id'], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred' + err
        })
      } else {
        res.send({
          success: true,
          areas: rows
        })
      }
    })
	},
	async delete_area (req, res) {
		const city_id = req.params.city_id
    const area_id = req.params.area_id
		let deleteArea = `DELETE FROM ?? WHERE ?? = ? AND ?? = ?`
		try {
			db.db.query(deleteArea, ['area', 'Area_Id', area_id, 'AreaCity', city_id], (err, result) => {
				if (err) throw err
        let areas = `SELECT ?? AS area_id, ?? AS area_name, ?? AS city_id, ?? AS city_name FROM ?? JOIN ?? ON ?? = ??`
        db.db.query(areas, ['area.Area_Id',
        'area.AreaName', 'area.AreaCity', 'city.CityName', 'area', 'city', 'area.AreaCity', 'city.City_Id'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: 'Area deleted successfully.',
						areas: rows
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
	async edit_area (req, res) {
		const area_id = req.body.area_id
		const area_name = req.body.area_name
		const city_id = req.body.city_id

		let area_edit = `UPDATE area SET AreaName = ?,
		AreaCity = ?
		WHERE Area_Id = ?`

		try {
			db.db.query(area_edit, [area_name, city_id, area_id], (err, result) => {
				if (err) throw err
				let areas = `SELECT ?? AS area_id, ?? AS area_name, ?? AS city_id, ?? AS city_name FROM ?? JOIN ?? ON ?? = ??`
        db.db.query(areas, ['area.Area_Id',
        'area.AreaName', 'area.AreaCity', 'city.CityName', 'area', 'city', 'area.AreaCity', 'city.City_Id'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: `Area edited successfully.`,
						areas: rows
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
	async areaProperties (req, res) {
		const area = req.params.areaID
		const category = req.params.category
		const type = req.params.type
		try {
			let properties = `SELECT ?? AS prop_id, ?? AS owner,
			?? AS title, ?? AS img, ?? AS price,
			?? AS location, ?? AS type, ?? AS category
			FROM ?? INNER JOIN ?? ON ?? = ??
			INNER JOIN ?? ON ?? = ??
			INNER JOIN ?? ON ?? = ?? WHERE ?? = ? AND ?? = ? AND ?? = ?`
			db.db.query(properties, ['property.Property_Id',
			'property.PropertyOwner',
			'property.PropertyName',
			'property.propImage',
			'property.PropertyPrice', 'area.AreaName',
			'propertytype.PropertyTypeName', 'propertycategory.CategoryName',
			'property', 'area',
			'property.PropertyLocation', 'area.Area_Id', 'propertytype',
			'property.PropertyType', 'propertytype.PropertyType_Id',
			'propertycategory', 'property.PropertyCategory',
			'propertycategory.PropertyCategory_Id', 'property.PropertyCategory', category,
			 'property.PropertyType', type, 'property.PropertyLocation', area], (err, rows) => {
				if (err) throw err

				let locDetails = `SELECT ?? AS property, ?? AS area, ?? AS city,
				?? AS region FROM ?? t1 INNER JOIN ?? t2 ON t1.PropertyLocation = t2.Area_Id
				INNER JOIN ?? t3 ON t2.AreaCity = t3.City_Id
				INNER JOIN ?? t4 ON t3.CityRegion = t4.Region_Id WHERE t1.PropertyLocation = ?`
				db.db.query(locDetails, ['PropertyName', 'AreaName', 'CityName', 'RegionName',
				'property', 'area', 'city', 'region', area], (err, result, fields) => {
					if (err) throw err
					res.send({
						success: true,
						properties: rows,
						locDetails: result[0]
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				error: error,
				error_type: 3
			})
		}
	}
}
