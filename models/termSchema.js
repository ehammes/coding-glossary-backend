'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const termSchema = new Schema({
  name: { type: String, required: true },
  definition: { type: String, required: true },
  user_email: { type: String, required: true },
  category: { type: String, required: false },
  documentation_url: { type: String, required: false }
});

const termModel = mongoose.model('Term', termSchema);

module.exports = termModel;
