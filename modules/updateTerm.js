'use strict';

const Term = require('../models/termSchema.js');

async function updateTerm (req, res, next) {
  try {
    const { term_name, definition, user_email, category, documentation_url } = req.body;
    const updatedTerm = await Term.findByIdAndUpdate(req.params.id, { term_name, definition, user_email, category, documentation_url }, {new: true, overwrite: true});
    res.status(200).send(updatedTerm);
  } catch (e) {
    next(e);
  }
}

module.exports = updateTerm;
