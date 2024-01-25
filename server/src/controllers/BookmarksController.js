const _ = require('lodash')
const {Bookmark,
    Song} = require('../models')

Object.filter = (obj, predicate) => 
    Object.fromEntries(Object.entries(obj).filter(predicate));

module.exports = {
    
    async index (req, res) {
        try {
            const {songId, userId} = req.query
            const filteredWhere = Object.filter({
                SongId : songId,
                UserId: userId
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
