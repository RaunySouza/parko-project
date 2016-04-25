'use strict';

module.exports = function(parko) {
    var mongoose = parko.db.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        name:  {type: String, required: true},
        email: {type: String, required: true},
        is_blocked: {type: Boolean, required: true, default: false},
        vehicle: {
            vendor: {type: String, required: true},
            model: {type: String, required: true},
            color: {type: String, required: true},
            plate: {type: String, required: true}
        }
    });

    return parko.registerModel('User', UserSchema);
}
