const errorHandler = require('../errorHandler')
const db = require('../../config/config')

module.exports = {
	async AddOwner (req, res) {
		const name = req.body.name
		const contact = req.body.contact
    const ownership = req.body.ownership

		try{
			let ownerExists = `SELECT count(*) AS ownerCount FROM ?? WHERE ?? = ? AND ?? = ?`
			db.db.query(ownerExists, ['propertyowner', 'Name', name, 'Contact', contact], (err, result, fields) => {
				if (err) {
			    res.send({
			      success: false,
			      error:'error ocurred' + err
			    })
				} else {
					if (result[0].ownerCount < 1) {
            // insert owner
            let add_owner = `INSERT INTO ?? SET ?`
            db.db.query(add_owner, ['propertyowner', {
              Name: name,
              Contact: contact,
              Ownership: ownership
            }], (err, resulte) => {
              if (err) {
                res.send({
                  success: false,
                  error:'error ocurred' + err
                })
              } else {
                //query new data to update the frontend/client
                let owners = `SELECT ?? AS owner_id, ?? AS name, ?? AS contact, ?? AS ownership FROM ??`
                db.db.query(owners, ['propertyowner.PropertyOwner_Id', 'propertyowner.Name',
                'propertyowner.Contact', 'propertyowner.Ownership', 'propertyowner'], (err, rows) => {
                  if (err) {
                    res.send({
                      success: false,
                      error:'error ocurred' + err
                    })
                  } else {
                    res.send({
                      success: true,
                      message: 'Owner added successfully.',
                      owners: rows
                    })
                  }
                })
              }
            })
					} else {
							res.send({
								success: false,
								error: 'Owner already exists.'
							})
						}
				}
			})
		} catch(err) {
			res.send({
				success: false,
				error: 'Something wrong happened while adding owner. Please try again.'
			})
		}
	},
	async Owners (req, res) {
    let owners = `SELECT ?? AS owner_id, ?? AS name, ?? AS contact, ?? AS ownership FROM ??`
    db.db.query(owners, ['propertyowner.PropertyOwner_Id', 'propertyowner.Name',
    'propertyowner.Contact', 'propertyowner.Ownership', 'propertyowner'], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred' + err
        })
      } else {
        res.send({
          success: true,
          owners: rows
        })
      }
    })
	},
	async delete_owner (req, res) {
		const owner_id = req.params.owner_id
		let deleteOwner = `DELETE FROM ?? WHERE ?? = ?`
		try {
			db.db.query(deleteOwner, ['propertyowner', 'PropertyOwner_Id', owner_id], (err, result) => {
				if (err) throw err
				let owners = `SELECT ?? AS owner_id, ?? AS name, ?? AS contact, ?? AS ownership FROM ??`
		    db.db.query(owners, ['propertyowner.PropertyOwner_Id', 'propertyowner.Name',
		    'propertyowner.Contact', 'propertyowner.Ownership', 'propertyowner'], (err, rows) => {
					/*pusher.pusher.trigger('countries', 'cou countries', {
						countries: rows
					}) */
					res.send({
						success: true,
						message: 'Owner deleted successfully.',
						owners: rows
					})
				})
			})
		} catch (error) {
			res.send({
				success: false,
				error_type: 1,
				error: 'An error occured while deleting property owner.' + error
			})
		}
	},
	async edit_owner (req, res) {
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
	},
	async singleUserAccount (req, res) {
		const userID = req.params.userID
    let user = `SELECT * FROM ?? WHERE ?? = ?`
    db.db.query(user, ['user', 'User_Id', userID], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred' + err
        })
      } else {
        res.send({
          success: true,
          user: rows[0]
        })
      }
    })
	}
}
