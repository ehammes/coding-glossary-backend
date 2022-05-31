'use strict';

const Term = require('../models/termSchema.js');
// const spellCheck = require('./jspell-api.js');

async function updateTerm(req, res, next) {
  try {
    const { term_name, definition, user_email } = req.body;
    // let spellChecked = spellCheck();
    // if (spellChecked.spellingErrorCount !== 0) {
    const updatedTerm = await Term.findByIdAndUpdate(req.params.id, { term_name, definition, user_email }, { new: true, overwrite: true });
    res.status(200).send(updatedTerm);
    // }
  } catch (e) {
    next(e);
  }
}

module.exports = updateTerm;
