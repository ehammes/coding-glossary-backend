'use strict';

const Term = require('../models/termSchema.js');

async function getTerms(req, res, next) {
  let queryObj = {};
  if (req.query.term_name) {
    queryObj = {
      term_name: req.query.term_name,
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
