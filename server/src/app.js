const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


// register enpoint
require('./routes')(app)

sequelize.sync({force: true})
    .then(() => {
        app.listen(config.port)
        console.log(`Server stareted on port ${config.port}`)
    })
