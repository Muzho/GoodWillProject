const errorHandler = require('../errorHandler')
const db = require('../../config/config')

module.exports = {
	async AddCountry (req, res) {
		const country_name = req.body.country_name
		const country_shortname = req.body.country_shortname

		try{
			let countryExists = `SELECT count(*) AS countryCount FROM ?? WHERE ?? = ?`
			db.db.query(countryExists, ['country', 'CountryName', country_name], (err, result, fields) => {
				console.log('country count result' + result[0].countryCount)
				if (err) {
					// console.log("error ocurred",error);
			    res.send({
			      success: false,
			      error:'error ocurred'
			    })
				} else {
					if (result[0].countryCount < 1) {
							// check for country shortname but not important for now
              let countryshortnameExists = `SELECT count(*) AS countryshortnameCount FROM ?? WHERE ?? = ?`
              db.db.query(countryshortnameExists, ['country', 'CountryShortName', country_shortname], (err, resulta, fields) => {
                if (err) {
                  res.send({
        			      success: false,
        			      error:'error ocurred'
        			    })
                } else {
                  if (resulta[0].countryshortnameCount < 1) {
                    // insert country and country short name
                    let add_country = `INSERT INTO ?? SET ?`
                    db.db.query(add_country, ['country', {
                      CountryName: country_name,
                      CountryShortName: country_shortname
                    }], (err, resulte) => {
                      if (err) {
                        res.send({
              			      success: false,
              			      error:'error ocurred'
              			    })
                      } else {
                        //query new data to update the frontend/client
                        let countries = `SELECT * FROM ??`
                        db.db.query(countries, ['country'], (err, rows) => {
                          if (err) {
                            res.send({
                  			      success: false,
                  			      error:'error ocurred'
                  			    })
                          } else {
                            res.send({
                              success: true,
                              message: 'Country added successfully.',
                              countries: rows
                            })
                          }
                        })
                      }
                    })
                  } else {
                    res.send({
      								success: false,
      								error: 'Country short name already exists.'
      							})
                  }
                }
              })
					} else {
							res.send({
								success: false,
								error: 'Country already exists.'
							})
						}
				}
			})
		} catch(err) {
			res.send({
				success: false,
				error: 'Something wrong happened while attempting to log in. Please try again.'
			})
		}
	},
	async Countries (req, res) {
    let countries = `SELECT * FROM ??`
    db.db.query(countries, ['country'], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred'
        })
      } else {
        res.send({
          success: true,
          countries: rows
        })
      }
    })
	},
	async delete_country (req, res) {
		const country_id = req.params.country_id
		let deleteCountry = `DELETE FROM ?? WHERE ?? = ?`
		try {
			db.db.query(deleteCountry, ['country', 'Country_Id', country_id], (err, result) => {
				if (err) throw err
				let countries = `SELECT * FROM ??`
				db.db.query(countries, ['country'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: 'Country deleted successfully.',
						countries: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while deleting country'
			})
		}
	},
	async edit_country (req, res) {
		const country_name = req.body.country_name
		const country_shortname = req.body.country_shortname
		const country_id = req.body.country_id

		let country_edit = `UPDATE country SET CountryName = ?,
		CountryShortName = ?
		WHERE Country_Id = ?`

		try {
			db.db.query(country_edit, [country_name, country_shortname, country_id], (err, result) => {
				if (err) throw err
				let countries = `SELECT * FROM ??`
				db.db.query(countries, ['country'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: `Country edited successfully.`,
						countries: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				message: 'An error occured while deleting country'
			})
		}
	}
}
