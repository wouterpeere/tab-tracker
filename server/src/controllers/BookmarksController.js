const {Bookmark} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            const {songId} = req.query
            
            const bookmark = await Bookmark.findOne({
                where:{
                    SongId : songId
                }
            })
            res.send(bookmark)

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the songs.'
            })
        }
    }
}
