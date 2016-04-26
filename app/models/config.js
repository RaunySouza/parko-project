'use strict';

module.exports = function(parko) {
    var mongoose = parko.db.mongoose;
    const Schema = mongoose.Schema;

    const ConfigSchema = new Schema({
        key:  {type: String, required: true},
        value: {type: String, required: true}
    });

    return parko.registerModel('Config', ConfigSchema);
}
