'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:  {type: String, default: ''},
  email: {type: String, default: ''}
});

mongoose.model('User', UserSchema);
