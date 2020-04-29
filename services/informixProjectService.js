const _ = require('lodash')
// const logger = require('../util/logger')
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
      DISTINCT(project_id) as directProjectId,
      name
    FROM
      tc_direct_project p`

  return execQuery(sql, 'order by p.project_id')
}

/**
 * Execute query
 *
 * @param {Object} conn informix connection instance
 * @param {String} sql sql
 * @param {Array} ids Array of challenge to fetch
 * @param {String} order addition sql for ordering
 */
async function execQuery (sql, ids, order) {
  let filter = ''

  if (!_.isUndefined(ids) && _.isArray(ids)) {
    filter = `and p.project_id in (${ids.join()})`
  }
  if (_.isUndefined(order)) {
    order = ''
  }
  // console.log(`Query - Executing: ${sql} ${filter} ${order}`)
  // const result = connection.query(`${sql} ${filter} ${order}`)
  return executeQueryAsync('tcs_catalog', `${sql} ${filter} ${order}`)
}

module.exports = {
  getProjectsFromIfx
}
