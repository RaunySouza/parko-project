'use strict';

module.exports = function(parko) {
    var mongoose = parko.db.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        name:  {type: String, required: true},
        email: {type: String, required: true},
        vehicle: {type: Schema.Types.ObjectId, ref: 'Vehicle', required: true}
    });

    return parko.registerModel('User', UserSchema);
}
