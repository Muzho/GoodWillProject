const errorHandler = require('../errorHandler')
const db = require('../../config/config')

module.exports = {
	async PropertyTypes (req, res) {
    let property_types = `SELECT ?? AS prop_id, ?? AS type FROM ??`
    db.db.query(property_types, ['propertytype.PropertyType_Id', 'propertytype.PropertyTypeName','propertytype'], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred' + err
        })
      } else {
        res.send({
          success: true,
          property_types: rows
        })
      }
    })
	},
  async PropertyCategories (req, res) {
    let property_categories = `SELECT ?? AS cat_id, ?? AS category FROM ??`
    db.db.query(property_categories, ['propertycategory.PropertyCategory_Id', 'propertycategory.CategoryName','propertycategory'], (err, rows) => {
      if (err) {
        res.send({
          success: false,
          error:'error ocurred' + err
        })
      } else {
        res.send({
          success: true,
          property_categories: rows
        })
      }
    })
	}
}
