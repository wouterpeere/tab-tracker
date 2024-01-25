const passport = require('passport')
const {User} = require('./models')

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config/config')

passport.use(
    // going to decode the token
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // as baerer token present in authorisation, use this,
        secretOrKey: config.authentication.jwtSecret

    },
    async function (jwtPayload, done) {
        try {
            // check if user exists
            const user = await User.findOne({
                where: {
                    id: jwtPayload.id // user is embedded in the payload, due to authentication controller
                }
            })
            if (!user) {
                return done(new Error(), false)
            }
            return done(null, user) // sets req.user
        } catch (err) {
            return done(new Error(), false)
        }
    })
)

module.exports = null // this document only sets up the passport