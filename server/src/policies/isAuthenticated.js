const passport = require('passport')

// will be called before every route
// only written because passport gives back html instead of json on error, not checked again
module.exports = function (req, res, next) {
    passport.authenticate('jwt', function (err, user) {
        if (err || !user){
            res.status(403).send({
                error: 'You do not have access to this resource'
            })
        } else {
            req.user = user
            next()
        }
    }) (req, res, next)
}