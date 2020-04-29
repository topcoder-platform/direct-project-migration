/**
 * helper methods
 */
const _ = require('lodash')
const config = require('config')
const elasticsearch = require('elasticsearch')
const moment = require('moment-timezone')
const AWS = require('aws-sdk')
const m2mAuth = require('tc-core-library-js').auth.m2m
const m2m = m2mAuth(_.pick(config, ['AUTH0_URL', 'AUTH0_AUDIENCE', 'TOKEN_CACHE_TIME', 'AUTH0_PROXY_SERVER_URL']))

// Elasticsearch client
let esClient

AWS.config.update({
  s3: config.AMAZON.S3_API_VERSION,
  accessKeyId: config.AMAZON.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AMAZON.AWS_SECRET_ACCESS_KEY,
  region: config.AMAZON.AWS_REGION
})


/**
 * Get M2M token.
 * @returns {Promise<String>} the M2M token
 */
async function getM2MToken () {
  return m2m.getMachineToken(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_SECRET)
}

module.exports = {
  getM2MToken
}
