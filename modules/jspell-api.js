'use strict';

const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://jspell-checker.p.rapidapi.com/check',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Host': 'jspell-checker.p.rapidapi.com',
    'X-RapidAPI-Key': `${process.env.JSPELL_API_KEY}`
  },
  data: `{
    "language": "enUS",
    "fieldvalues": "this is intresting",
    "config": {
      "forceUpperCase": false,
      "ignoreIrregularCaps": false,
      "ignoreFirstCaps": true,
      "ignoreNumbers": true,
      "ignoreUpper": false,
      "ignoreDouble": false,
      "ignoreWordsWithNumbers": true
    }
  }`
};

let spellCheck = () => {
  axios.request(options).then(function (response) {
    console.log(response.data);
    return response.data;
  }).catch(function (error) {
    console.error(error);
  });
};


// async function spellCheck(req, res, next) {
//   try {
//     let errorsResponse = await axios.request(options);
//     if (errorsResponse.spellingErrorCount !== 0) {
//       res.status(200).send(errorsResponse.elements[0].errors);
//     } else {
//       res.status(200).send([]);
//     }
//   } catch (e) {
//     next(e);
//   }
// }

module.exports = spellCheck;
