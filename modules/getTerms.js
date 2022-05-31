'use strict';

const Term = require('../models/termSchema.js');

async function getTerms(req, res, next) {
  let queryObj = {};
  if (req.query.name) {
    queryObj = {
      name: req.query.name,
    };
  }
  try {
    let results = await Term.find(queryObj);
    res.status(200).send(results);
  } catch (e) {
    next(e);
  }
}

module.exports = getTerms;
