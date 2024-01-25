const _ = require('lodash')
const {History,
    Song} = require('../models')


module.exports = {
    
    async index (req, res) {
        try {
            const userId = req.user.id

            const historys = (await History.findAll({
                where:{
                    UserId: userId
                },
                include: [
                    {
                        model: Song
                    }
                ]
            }))
                .map(history => history.toJSON())
                .map(history => _.assignIn(
                    {}, history.Song,
                    history))
            res.send(historys)

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
    
            const newHistory = await History.create({
                SongId: songId,
                UserId: userId
            })
            res.send(newHistory) // if it does not exist, null is returned
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create a history object.'
            })
        }
    }
}
