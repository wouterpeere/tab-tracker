// login to db

const fs = require('fs') // voor file system
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

// read through models and set up sequelize 

fs
    .readdirSync(__dirname) // read through current dir and give back files
    .filter((file) => 
        file !== 'index.js'
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model
    })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
