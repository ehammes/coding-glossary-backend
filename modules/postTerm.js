'use strict';

const Term = require('../models/termSchema.js');

async function newTerm (req, res, next) {
  try {
    let newTerm = await Term.create(req.body);
    res.status(200).send(newTerm);
  } catch (e) {
    next(e);
  }
}

module.exports = newTerm;
