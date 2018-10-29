const errorHandler = require('../errorHandler')
const db = require('../../config/config')

module.exports = {
	async AddCity (req, res) {
		const city_name = req.body.city_name
		const region_id = req.body.region_id

		try{
			let cityExists = `SELECT count(*) AS cityCount FROM ?? WHERE ?? = ?`
			db.db.query(cityExists, ['city', 'CityName', city_name], (err, result, fields) => {
				if (err) {
			    res.send({
			      success: false,
			      error:'error ocurred'
			    })
				} else {
					if (result[0].cityCount < 1) {
							// check for country existance
              let regionExists = `SELECT count(*) AS regionCount FROM ?? WHERE ?? = ?`
              db.db.query(regionExists, ['region', 'Region_Id', region_id], (err, resulta, fields) => {
                if (err) {
                  res.send({
        			      success: false,
        			      error:'error ocurred'
        			    })
                } else {
                  if (resulta[0].regionCount === 1) {
                    // insert region
                    let add_city = `INSERT INTO ?? SET ?`
                    db.db.query(add_city, ['city', {
                      CityName: city_name,
                      CityRegion: region_id
                    }], (err, resulte) => {
                      if (err) {
                        res.send({
              			      success: false,
              			      error:'error ocurred'
              			    })
                      } else {
                        //query new data to update the frontend/client
                        let cities = `SELECT ?? AS city_id, ?? AS city_name, ?? AS region_id, ?? AS region_name FROM ?? JOIN ?? ON ?? = ??`
                        db.db.query(cities, ['city.City_Id',
                        'city.CityName', 'region.Region_Id', 'region.RegionName', 'city', 'region', 'city.CityRegion', 'region.Region_Id'], (err, rows) => {
                          if (err) {
                            res.send({
                  			      success: false,
                  			      error:'error ocurred'
                  			    })
                          } else {
                            res.send({
                              success: true,
                              message: 'City added successfully.',
                              cities: rows
                            })
                          }
                        })
                      }
                    })
                  } else {
                    res.send({
      								success: false,
      								error: 'Region selected does not exist.'
      							})
                  }
                }
              })
					} else {
							res.send({
								success: false,
								error: 'City already exists.'
							})
						}
				}
			})
		} catch(err) {
			res.send({
				success: false,
				error: 'Something wrong happened while adding region. Please try again.'
			})
		}
	},
	async Cities (req, res) {
    let cities = `SELECT ?? AS city_id, ?? AS city_name, ?? AS region_id, ?? AS region_name FROM ?? JOIN ?? ON ?? = ??`
    db.db.query(cities, ['city.City_Id',
    'city.CityName', 'region.Region_Id', 'region.RegionName', 'city', 'region', 'city.CityRegion', 'region.Region_Id'], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred'
        })
      } else {
        res.send({
          success: true,
          cities: rows
        })
      }
    })
	},
	async delete_city (req, res) {
		const city_id = req.params.city_id
    const region_id = req.params.region_id
		let deleteCity = `DELETE FROM ?? WHERE ?? = ? AND ?? = ?`
		try {
			db.db.query(deleteCity, ['city', 'City_Id', city_id, 'CityRegion', region_id], (err, result) => {
				if (err) throw err
				let cities = `SELECT ?? AS city_id, ?? AS city_name, ?? AS region_id, ?? AS region_name FROM ?? JOIN ?? ON ?? = ??`
		    db.db.query(cities, ['city.City_Id',
		    'city.CityName', 'region.Region_Id', 'region.RegionName', 'city', 'region', 'city.CityRegion', 'region.Region_Id'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: 'City deleted successfully.',
						cities: rows
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
	async edit_city (req, res) {
		const city_id = req.body.city_id
		const city_name = req.body.city_name
		const region_id = req.body.region_id

		let city_edit = `UPDATE city SET CityName = ?,
		CityRegion = ?
		WHERE City_Id = ?`

		try {
			db.db.query(city_edit, [city_name, region_id, city_id], (err, result) => {
				if (err) throw err
				let cities = `SELECT ?? AS city_id, ?? AS city_name, ?? AS region_id, ?? AS region_name FROM ?? JOIN ?? ON ?? = ??`
		    db.db.query(cities, ['city.City_Id',
		    'city.CityName', 'region.Region_Id', 'region.RegionName', 'city', 'region', 'city.CityRegion', 'region.Region_Id'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: `City edited successfully.`,
						cities: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				error_type: 1,
				message: 'An error occured while deleting city'
			})
		}
	}
}
