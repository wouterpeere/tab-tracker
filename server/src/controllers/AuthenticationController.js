const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res) {
        try {
            console.log("Register", User)

        const user = await User.create(req.body)
        res.send(user.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'This email account is already in use.'
            })

    }
},
    async login (req, res) {
        try {
            console.log(req.body)

        const {email, password} = req.body
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        console.log("Test user", user)
        if (!user) {
            console.log("No user")
            return res.status(403).send({                       // added return so code no longer runs futher
                error: 'The login information was incorrect.'
            })
        }
        console.log("Test pass")
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            console.log("No pass")
            return res.status(403).send({
                error: 'The login information was incorrect.'
            })
        }
        console.log("Test send user")

        const userJson = user.toJSON()
        res.send({
            user: userJson,
            token: jwtSignUser(userJson)
        })

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to log in.'
            })
    }
    }
}
