const AuthenticationController = require('./controllers/AuthenticationController')
const SongsController = require('./controllers/SongsController')
const BookmarksController = require('./controllers/BookmarksController')
const HistorysController = require('./controllers/HistorysController')

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

    app.get('/bookmarks',
        BookmarksController.index)
    app.post('/bookmarks',
        BookmarksController.post)
    app.delete('/bookmarks/:bookmarkId',
        BookmarksController.delete)

    app.get('/historys',
        HistorysController.index)
    app.post('/historys',
        HistorysController.post)
}
