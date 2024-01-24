const {Bookmark} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            const {songId, userId} = req.query
            
            const bookmark = await Bookmark.findOne({
                where:{
                    SongId : songId,
                    UserId: userId
                }
            })
            res.send(bookmark) // if it does not exist, null is returned

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the songs.'
            })
        }
    },
    async post (req, res) {
        try {
            const {songId, userId} = req.body
            console.log(req.body)
            const bookmark = await Bookmark.findOne({
                where: {
                    SongId: songId,
                    UserId: userId
                }
            })
            if (bookmark){
                console.log('Exists')
                return res.status(400).send({
                    error:'You already have set this bookmark.'
                })
            }
            console.log('Does not yet exist')
            const newBookmark = await Bookmark.create({
                SongId: songId,
                UserId: userId
            })
            res.send(newBookmark) // if it does not exist, null is returned
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create a bookmark.'
            })
        }
    },
    async delete (req, res) {
        try {
            const {bookmarkId} = req.params
            console.log(bookmarkId)
            const bookmark = await Bookmark.findByPk(bookmarkId)
            await bookmark.destroy()
            res.send(bookmark) // if it does not exist, null is returned

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete the bookmark.'
            })
        }
    }
}
