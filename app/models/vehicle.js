'use strict';

module.exports = function(parko) {
    var mongoose = parko.mongoose;
    const Schema = mongoose.Schema;

    const VehicleSchema = new Schema({
        vendor: {type: String, required: true},
        model: {type: String, required: true},
        color: {type: String, required: true},
        plate: {type: String, required: true}
    });

    mongoose.model('Vehicle', VehicleSchema);

    return VehicleSchema;
}
