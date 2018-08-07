/* AuthenticationController = require('../Controllers/AuthenticationController/AuthenticationController')
StaffPolicy = require('../Policies/StaffPolicy/StaffPolicy')
StaffController = require('../Controllers/StaffController/StaffController')
JobPolicy = require('../Policies/JobPolicy/JobPolicy')
JobController = require('../Controllers/JobController/JobController')

const path = require('path')
const multer = require('multer')
const cors = require('cors')

const storage = multer.diskStorage({
	destination: 'public/Uploads/',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({
	storage: storage,
	limits: { fileSize: 100000000000, files: 1 },
	fileFilter: function (res, file, cb) {
		checkFileType(file, cb)
	}
}).single('profileImage')

function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|png|jpg/
	// check ext
	const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())
	//check mime
	const mimetype = filetypes.test(file.mimetype)

	if (mimetype && extname) {
		return cb(null, true)
	} else {
		cb('Error: Images Only.')
	}
} */

module.exports = (app) => {
	app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
	})
}
