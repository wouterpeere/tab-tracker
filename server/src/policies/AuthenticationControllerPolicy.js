const Joi = require('joi')


module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$') // 8-32 tekens lang
            )
        })
        
        const {error} = schema.validate(req.body)
        
        if (error) {
            switch (error.details[0].context.key){ // get the key that failed validation
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address.'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                        <br>
                        1. It must only contain the following chars: lower case, upper case letters or numbers.
                        <br>
                        2. It be at least 8 chars in length and not greater than 32 chars
                        `
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration information.'
                    })
            }
        } else {
            next()
        }
    }
}