const errorHandler = require('../errorHandler')
const db = require('../../config/config')

module.exports = {
	async AddFacility (req, res) {
		const facility = req.body.facility
		const category = req.body.category

		try{
			let facilityExists = `SELECT count(*) AS facilityCount FROM ?? WHERE ?? = ?`
			db.db.query(facilityExists, ['facilities', 'FacilityName', facility], (err, result, fields) => {
				if (err) {
			    res.send({
			      success: false,
			      error:'error ocurred' + err
			    })
				} else {
					if (result[0].facilityCount < 1) {
            // insert facility
            let add_facility = `INSERT INTO ?? SET ?`
            db.db.query(add_facility, ['facilities', {
              FacilityName: facility,
              FacilitiyType: category
            }], (err, resulte) => {
              if (err) {
                res.send({
                  success: false,
                  error:'error ocurred' + err
                })
              } else {
                //query new data to update the frontend/client
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
                      message: 'Facility added successfully.',
                      facilities: rows
                    })
                  }
                })
              }
            })
					} else {
							res.send({
								success: false,
								error: 'Facility already exists.'
							})
						}
				}
			})
		} catch(err) {
			res.send({
				success: false,
				error: 'Something wrong happened while adding facility. Please try again.'
			})
		}
	},
	async Facilities (req, res) {
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
          facilities: rows
        })
      }
    })
	},
	async prop_facilities (req, res) {
		const propType = req.params.propType
    let facilities = `SELECT ?? AS facility_id, ?? AS facility, ?? AS category FROM ?? WHERE ?? = ?`
    db.db.query(facilities, ['facilities.Facility_Id',
    'facilities.FacilityName', 'facilities.FacilitiyType', 'facilities', 'facilities.FacilitiyType', propType], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred' + err
        })
      } else {
        res.send({
          success: true,
          facilities: rows
        })
      }
    })
	},
	async delete_facility (req, res) {
		const facility_id = req.params.facility_id
    const category = req.params.category
		let deleteFacility = `DELETE FROM ?? WHERE ?? = ? AND ?? = ?`
		try {
			db.db.query(deleteFacility, ['facilities', 'Facility_Id', facility_id, 'FacilitiyType', category], (err, result) => {
				if (err) throw err
				let facilities = `SELECT ?? AS facility_id, ?? AS facility, ?? AS category FROM ??`
		    db.db.query(facilities, ['facilities.Facility_Id',
		    'facilities.FacilityName', 'facilities.FacilitiyType', 'facilities'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: 'Facility deleted successfully.',
						facilities: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				error_type: 1,
				error: 'An error occured while deleting facility.' + error
			})
		}
	},
	async edit_facility (req, res) {
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
