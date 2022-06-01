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
    "fieldvalues": "",
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

async function spellCheck(string) {
  let parsedConfigData = JSON.parse(options.data);
  parsedConfigData.fieldvalues = string;
  let stringifiedData = JSON.stringify(parsedConfigData);
  options.data = stringifiedData;
  console.log(options);
  try {
    let spellCheckData = await axios.request(options);
    return spellCheckData.data;
  } catch (e) {
    console.error(e);
  }
}

module.exports = spellCheck;
