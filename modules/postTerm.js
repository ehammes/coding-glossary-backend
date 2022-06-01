'use strict';

const Term = require('../models/termSchema.js');
const spellCheck = require('./jspell-api.js');

async function newTerm(req, res, next) {
  try {
    const { term_name, definition, override } = req.body;
    let spellCheckedName;
    let spellCheckedDef;
    if (override) {
      const newTerm = await Term.create(req.body);
      res.status(200).send(newTerm);
      return;
    }
    else {
      spellCheckedDef = await spellCheck(definition);
      spellCheckedName = await spellCheck(term_name);
    }
    if (spellCheckedName.spellingErrorCount === 0 && spellCheckedDef.spellingErrorCount === 0) {
      const newTerm = await Term.create(req.body);
      res.status(200).send(newTerm);
    } else if (spellCheckedName.spellingErrorCount !== 0 && spellCheckedDef.spellingErrorCount !== 0) {
      res.status(400).send({
        term_name_errors: spellCheckedName.elements[0].errors,
        definition_errors: spellCheckedDef.elements[0].errors
      });
    } else if (spellCheckedName.spellingErrorCount !== 0) {
      res.status(400).send({ term_name_errors: spellCheckedName.elements[0].errors });
    } else {
      res.status(400).send({ definition_errors: spellCheckedDef.elements[0].errors });
    }
  } catch (e) {
    next(e);
  }
}

module.exports = newTerm;
