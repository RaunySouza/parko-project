'use strict'

module.exports = (parko) ->
    mongoose = parko.db.mongoose
    Schema = mongoose.Schema

    UserSchema = new Schema
        name:
            type: String
            required: true
        email:
            type: String
            required: true
        department:
            type: String
            required: true
        referenceDate:
            type: String
            required: true
            default: Date.now()
        isBlocked:
            type: String
            required: true
            default: false
        vehicle:
            vendor:
                type: String
                required: true
            model:
                type: String
                required: true
            color:
                type: String
                required: true
            plate:
                type: String
                required: true

    parko.registerModel 'User', UserSchema
