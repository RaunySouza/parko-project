'use strict'

module.exports = (parko) ->
    router = parko.createRouter()

    router.get '/', (req, res) ->
        res.render 'index', title: 'Express'
        return

    parko.registerRoute '/', router
    return router
