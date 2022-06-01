'use strict';

const Term = require('../models/termSchema.js');
const spellCheck = require('./jspell-api.js');

async function updateTerm(req, res, next) {
  try {
    const { term_name, definition, user_email, category, documentation_url, override } = req.body;
    let spellCheckedName = await spellCheck(term_name);
    let spellCheckedDef = await spellCheck(definition);
    if (override || (spellCheckedName.spellingErrorCount === 0 && spellCheckedDef.spellingErrorCount === 0)) {
      const updatedTerm = await Term.findByIdAndUpdate(req.params.id, { term_name, definition, user_email, category, documentation_url }, { new: true, overwrite: true });
      res.status(200).send(updatedTerm);
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

module.exports = updateTerm;
