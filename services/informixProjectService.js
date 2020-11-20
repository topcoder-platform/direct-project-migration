const _ = require('lodash')
const logger = require('../util/logger')
const { executeQueryAsync } = require('../util/informixWrapper')

/**
 * Get project from informix
 *
 * @param {Number} skip number of row to skip
 * @param {Number} offset number of row to fetch
 * @param {Object} filter the filter object
 */
function getProjectsFromIfx (skip, offset, filter) {
  let limitOffset = ''
  limitOffset += !_.isUndefined(skip) && skip > 0 ? 'skip ' + skip : ''
  limitOffset += !_.isUndefined(offset) && offset > 0 ? ' first ' + offset : ''
  const sql = `
    SELECT  ${limitOffset}
      DISTINCT(p.project_id) as directProjectId,
      p.name,
      (SELECT MAX(dpa1.billing_account_id) FROM direct_project_account dpa1 WHERE dpa1.project_id = p.project_id) as billing_account_id,
      p.create_date,
      p.modify_date,
      p.modify_date as lastactivityat,
      p.user_id as createdby,
      p.user_id as updatedby,
      p.user_id as lastactivityuserid
    FROM
      tc_direct_project p
      LEFT JOIN direct_project_account dpa on p.project_id = dpa.project_id`

  return execQuery(sql, 'order by p.project_id ASC')
}

/**
 * Execute query
 *
 * @param {Object} conn informix connection instance
 * @param {String} sql sql
 * @param {Array} ids Array of challenge to fetch
 * @param {String} order addition sql for ordering
 */
async function execQuery (sql, order) {
  if (_.isUndefined(order)) {
    order = ''
  }
  logger.debug(`Query - Executing: ${sql} ${order}`)
  // const result = connection.query(`${sql} ${order}`)
  return executeQueryAsync('tcs_catalog', `${sql} ${order}`)
}

module.exports = {
  getProjectsFromIfx
}
