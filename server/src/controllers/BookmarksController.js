const _ = require('lodash')
const {Bookmark,
    Song} = require('../models')

Object.filter = (obj, predicate) => 
    Object.fromEntries(Object.entries(obj).filter(predicate));

module.exports = {
    
    async index (req, res) {
        try {
            const filteredWhere = Object.filter({
                SongId : req.query.songId,
                UserId: req.user.id
            // eslint-disable-next-line no-unused-vars
            }, ([idx, val]) => val!==undefined)

            const bookmarks = (await Bookmark.findAll({
                where:filteredWhere,
                include: [
                    {
                        model: Song
                    }
                ]
            }))
                .map(bookmark => bookmark.toJSON())
                .map(bookmark => _.assignIn(
                    {}, bookmark.Song,
                    bookmark))
            res.send(bookmarks)

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the songs.',
                msg:err
            })
        }
    },
    async post (req, res) {
        try {
            const {songId} = req.body
            const userId = req.user.id
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
            const userId = req.user.id
            const {bookmarkId} = req.params
            const bookmark = await Bookmark.findOne({
                where: {
                    id: bookmarkId,
                    UserId: userId},
            })
            if (!bookmark){
                return res.status(403).send({
                    error: 'You do not have access to this bookmark.'
                })
            }
            await bookmark.destroy()
            res.send(bookmark) // if it does not exist, null is returned

        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to delete the bookmark.'
            })
        }
    }
}
