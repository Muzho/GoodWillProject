const path = require('path')
const multer = require('multer')
const cors = require('cors')

const storage = multer.diskStorage({
	destination: './public/Uploads/bg_card/',
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
}).single('propImage')

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
}

module.exports = {
  singleImageUpload (req, res) {
		upload(req, res, (err) => {
			if (err) {
				res.send({
					success: false,
					message: 'There was an error uploading ' + err
				})
			} else {
				if (req.file == undefined) {
					res.send({
						success: false,
						message: 'No file selected'
					})
				} else {
					res.send({
						success: true,
						message: 'Property image uploaded successfully.',
						fileUrl: 'http://localhost:10001/Uploads/bg_card/' +  req.file.filename
					})
				}
			}
		})
  }
}
