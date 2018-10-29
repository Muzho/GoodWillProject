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
	async SingleProp (req, res) {
    const propID = req.params.propID
    let property = `SELECT ?? AS prop_id,
    ?? AS title,
    ?? AS details,
    ?? AS img,
    ?? AS price,
    ?? AS location, ?? AS type, ?? AS category
    FROM ?? INNER JOIN ?? ON ?? = ??
    INNER JOIN ?? ON ?? = ??
    INNER JOIN ?? ON ?? = ?? WHERE ?? = ?`
    db.db.query(property, ['property.Property_Id',
    'property.PropertyName',
    'property.PropertyDetails',
    'property.propImage',
    'property.PropertyPrice', 'area.AreaName',
    'propertytype.PropertyTypeName', 'propertycategory.CategoryName',
    'property', 'area',
    'property.PropertyLocation', 'area.Area_Id', 'propertytype',
    'property.PropertyType', 'propertytype.PropertyType_Id',
    'propertycategory', 'property.PropertyCategory',
    'propertycategory.PropertyCategory_Id', 'property.Property_Id', propID], (err, rows) => {
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
	async delete_prop (req, res) {
		const prop_id = req.params.city_id
		let deleteProp = `DELETE FROM ?? WHERE ?? = ?`
		try {
			db.db.query(deleteProp, ['property', 'Property_Id', prop_id], (err, result) => {
				if (err) throw err
        let areas = `SELECT ?? AS area_id, ?? AS area_name, ?? AS city_id, ?? AS city_name FROM ?? JOIN ?? ON ?? = ??`
        db.db.query(areas, ['area.Area_Id',
        'area.AreaName', 'area.AreaCity', 'city.CityName', 'area', 'city', 'area.AreaCity', 'city.City_Id'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: 'Property deleted successfully.',
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
	}
}
