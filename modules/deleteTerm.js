'use strict';

const Term = require('../models/termSchema.js');

async function deleteTerm(req, res, next) {
  try {
    await Term.findByIdAndDelete(req.params.id);
    res.status(200).send('term deleted');
  } catch (e) {
    next(e);
  }
}

module.exports = deleteTerm;
