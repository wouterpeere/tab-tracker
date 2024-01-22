const AuthenticationController = require('./controllers/AuthenticationController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

// point to controller
module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register, //this is first revoked, in next() (in that file), we continue
        AuthenticationController.register)
    
    app.post('/login',
    AuthenticationController.login)
}
