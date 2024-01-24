const AuthenticationController = require('./controllers/AuthenticationController')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

// point to controller
module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register, //this is first revoked, in next() (in that file), we continue
        AuthenticationController.register)
    app.post('/login',
        AuthenticationController.login)

    app.get('/songs',
        SongsController.index)
    app.get('/songs/:songId',
        SongsController.show)
    app.put('/songs/:songId',
        SongsController.put)
    app.post('/songs',
        SongsController.post)

    app.post('/bookmarks',
        BookmarksController.index)
}
