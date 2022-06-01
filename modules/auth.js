'use strict';

// Copied from 301 class repo

const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// the jwks uri come Auth0 account page -> advanced settings -> Endpoints -> 0auth -> JSON Web Key Set
const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

// from: https://www.npmjs.com/package/jsonwebtoken
function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyUser(req, errorFirstOrUserCallbackFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction);
  } catch (error) {
    errorFirstOrUserCallbackFunction('Not authorized');
  }
}

module.exports = verifyUser;
