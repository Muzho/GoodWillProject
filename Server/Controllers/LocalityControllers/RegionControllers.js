const errorHandler = require('../errorHandler')
const db = require('../../config/config')

module.exports = {
	async AddRegion (req, res) {
		const region_name = req.body.region_name
		const country_id = req.body.country_id

		try{
			let regionExists = `SELECT count(*) AS regionCount FROM ?? WHERE ?? = ?`
			db.db.query(regionExists, ['region', 'RegionName', region_name], (err, result, fields) => {
				if (err) {
			    res.send({
			      success: false,
			      error:'error ocurred'
			    })
				} else {
					if (result[0].regionCount < 1) {
							// check for country existance
              let countryExists = `SELECT count(*) AS countryCount FROM ?? WHERE ?? = ?`
              db.db.query(countryExists, ['country', 'Country_Id', country_id], (err, resulta, fields) => {
                if (err) {
                  res.send({
        			      success: false,
        			      error:'error ocurred'
        			    })
                } else {
                  if (resulta[0].countryCount === 1) {
                    // insert region
                    let add_region = `INSERT INTO ?? SET ?`
                    db.db.query(add_region, ['region', {
                      RegionName: region_name,
                      Country_Id: country_id
                    }], (err, resulte) => {
                      if (err) {
                        res.send({
              			      success: false,
              			      error:'error ocurred'
              			    })
                      } else {
                        //query new data to update the frontend/client
                        // var sql = "SELECT users.name AS user, products.name AS favorite FROM users JOIN products ON users.favorite_product = products.id";
                        let regions = `SELECT ?? AS region_id, ?? AS region_name, ?? AS country_id, ?? AS country FROM ?? JOIN ?? ON ?? = ??`
                        db.db.query(regions, ['region.Region_Id',
                        'region.RegionName', 'country.Country_Id', 'country.CountryName', 'region', 'country', 'region.Country_Id', 'country.Country_Id'], (err, rows) => {
                          if (err) {
                            res.send({
                  			      success: false,
                  			      error:'error ocurred'
                  			    })
                          } else {
                            res.send({
                              success: true,
                              message: 'region added successfully.',
                              regions: rows
                            })
                          }
                        })
                      }
                    })
                  } else {
                    res.send({
      								success: false,
      								error: 'Country selected does not exist.'
      							})
                  }
                }
              })
					} else {
							res.send({
								success: false,
								error: 'Region already exists.'
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
	async Regions (req, res) {
    let regions = `SELECT ?? AS region_id, ?? AS region_name, ?? AS country_id, ?? AS country FROM ?? JOIN ?? ON ?? = ??`
    db.db.query(regions, ['region.Region_Id',
    'region.RegionName', 'country.Country_Id', 'country.CountryName', 'region', 'country', 'region.Country_Id', 'country.Country_Id'], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred'
        })
      } else {
        res.send({
          success: true,
          regions: rows
        })
      }
    })
	},
	async delete_region (req, res) {
		const country_id = req.params.country_id
    const region_id = req.params.region_id
		let deleteRegion = `DELETE FROM ?? WHERE ?? = ? AND ?? = ?`
		try {
			db.db.query(deleteRegion, ['region', 'Region_Id', region_id, 'Country_Id', country_id], (err, result) => {
				if (err) throw err
        let regions = `SELECT ?? AS region_id, ?? AS region_name, ?? AS country_id, ?? AS country FROM ?? JOIN ?? ON ?? = ??`
        db.db.query(regions, ['region.Region_Id',
        'region.RegionName', 'country.Country_Id', 'country.CountryName', 'region', 'country', 'region.Country_Id', 'country.Country_Id'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: 'Region deleted successfully.',
						regions: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while deleting region.'
			})
		}
	},
	async edit_region (req, res) {
		const region_name = req.body.region_name
		const region_id = req.body.region_id
		const country_id = req.body.country_id

		let region_edit = `UPDATE region SET RegionName = ?,
		Country_Id = ?
		WHERE Region_Id = ?`

		try {
			db.db.query(region_edit, [region_name, country_id, region_id], (err, result) => {
				if (err) throw err
        let regions = `SELECT ?? AS region_id, ?? AS region_name, ?? AS country_id, ?? AS country FROM ?? JOIN ?? ON ?? = ??`
        db.db.query(regions, ['region.Region_Id',
        'region.RegionName', 'country.Country_Id', 'country.CountryName', 'region', 'country', 'region.Country_Id', 'country.Country_Id'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: `Region edited successfully.`,
						regions: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while editing region.'
			})
		}
	}
}
