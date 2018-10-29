module.exports = {
	errorHandler (err) {
		let errorMessage = ''
		// err.code = 'PROTOCAL_CONNECTION_LOST'
	    console.log(err.code)
	    console.log(err.status)
	    console.log(err.fatal)
	    if (err.code === 'ER_DUP_ENTRY') {
	      console.log('Entry already exists.')
	      errorMessage = 'Entry already exists.'
	    }

	    return errorMessage
	}
}
