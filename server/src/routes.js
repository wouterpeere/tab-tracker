const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistorysController = require('./controllers/HistorysController')

const isAuthenticated = require('./policies/isAuthenticated')

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

    app.get('/bookmarks',
        isAuthenticated,
        BookmarksController.index)
    app.post('/bookmarks',
        isAuthenticated,
        BookmarksController.post)
    app.delete('/bookmarks/:bookmarkId',
        isAuthenticated,
        BookmarksController.delete)

    app.get('/historys',
        isAuthenticated,
        HistorysController.index)
    app.post('/historys',
        isAuthenticated,
        HistorysController.post)
}
