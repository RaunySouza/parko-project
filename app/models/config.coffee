'use strict'

module.exports = (parko) ->
    mongoose = parko.db.mongoose
    Schema = mongoose.Schema

    ConfigSchema = new Schema
        key:
            type: String
            required: true
        value:
            type: String
            required: true

    parko.registerModel 'Config', ConfigSchema
