'use strict';

const Term = require('../models/termSchema.js');
const verifyUser = require('./auth.js');

async function deleteTerm(req, res, next) {
  verifyUser(req, async (err, user) => {
    if (err) {
      console.error(err);
      res.status(401).send('invalid token');
    } else {
      try {
        await Term.findByIdAndDelete(req.params.id);
        res.status(200).send('term deleted');
      } catch (e) {
        next(e);
      }
    }
  });
}

module.exports = deleteTerm;
