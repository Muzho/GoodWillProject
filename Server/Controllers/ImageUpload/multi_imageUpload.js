const path = require('path')
const multer = require('multer')
const cors = require('cors')

const storage = multer.diskStorage({
	destination: './public/Uploads/Others/',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
})

const upload = multer({
     storage: storage
 }).array("otherImages", 12); //Field name and max count

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
  multi_ImageUpload (req, res, err) {
		upload(req, res, (err) => {
			if (err) {
				res.send({
					success: false,
					message: 'There was an error uploading images ' + err
				})
			} else {
				// console.log(req.files)
				let files_urls = []

				for(let i = 0; i < req.files.length; i++){
					files_urls.push('http://localhost:10001/Uploads/Others/' + req.files[i].filename)
				}

				res.send({
					success: true,
					message: 'Images Uploaded successfully.',
					fileUrls: files_urls
				})
			}
		})
  }
}
