'use strict'

module.exports = (parko) ->
    mongoose = parko.db.mongoose
    Schema = mongoose.Schema

    ConfigSchema = new Schema
        availableControllers:
            type: Number
            required: true

    parko.registerModel 'Config', ConfigSchema
