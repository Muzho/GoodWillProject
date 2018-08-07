const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const app = express()

const config = require('../config/config')

app.use(helmet())
app.use(express.static('public'))
app.use(morgan('combined'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }))
app.use(cors({
	origin: true,
	credentials: true
}))
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})

require('../Router/index')(app)

app.listen(config.port)

console.log(`Server started at ${config.port}...`)
console.log(Date.now())
