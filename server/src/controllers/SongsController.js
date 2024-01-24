const {Song} = require('../models')

module.exports = {
    async index (req, res) {
        try {
            const song = await Song.findAll({
                limit: 10 // so UI is not overloaded
            })
            res.send(song)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the songs.'
            })
        }
    },
    async show (req, res) {
        try {
            console.log('right path', req.params)
            const song = await Song.findByPk(req.params.songId)
            if (!song){
                // there is no song returned
                res.status(403).send({
                    error: `There is no song with id ${req.params.songId}`
                })
                return;
            }
            res.send(song)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to fetch the songs.'
            })
        }
    },
    async post (req, res) {
        try {
            const song = await Song.create(req.body)
            res.send(song)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create the song.'
            })
        }
    },
    async put (req, res) {
        try {
            await Song.update(req.body,
                {
                    where: {
                        id: req.params.songId
                    }
                })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'An error has occured trying to create the song.'
            })
        }
    }
}
