/**
 * Populate the Projects V5 Table with V4 Projects
 */
global.Promise = require('bluebird')
const config = require('config')
const util = require('util')
const _ = require('lodash')
const informixProjectService = require('./services/informixProjectService')
const postgresProjectService = require('./services/postgresProjectService')
const logger = require('./util/logger')

const migrate = async () => {
  const offset = config.get('BATCH_SIZE')
  let finish = false
  let skip = 0
  let batch = 1
  let projectCount = 0

  while (!finish) {
    try {
      logger.info(`Batch-${batch} - Loading ${offset} projects`)
      const nextSetOfProjects = await informixProjectService.getProjectsFromIfx(skip, offset)
      const projectIds = _.map(nextSetOfProjects, 'directprojectid')
      if (nextSetOfProjects.length > 0) {
        const v5Projects = await postgresProjectService.getV5ProjectIdsForDirectProjectIds(projectIds)
        const filteredArray = _.xorBy(nextSetOfProjects, v5Projects, 'directprojectid')

        // logger.info('Create Projects for These IDs', filteredArray)
        for (const project of filteredArray) {
          projectCount += 1
          postgresProjectService.createProject({
            name: project.name,
            directProjectId: project.directprojectid,
            billingAccountId: project.billing_account_id,
            createdAt: project.create_date,
            createdBy: project.createdby,
            updatedAt: project.modify_date,
            updatedBy: project.updatedby,
            lastActivityAt: project.lastactivityat,
            lastActivityUserId: project.lastactivityuserid
          })
        }
      } else {
        finish = true
      }
    } catch (e) {
      logger.error(util.inspect(e))
      finish = true
      throw e
    }
    skip += offset
    batch++
  }
  console.log(`${projectCount} projects created`)
}

migrate().then(() => {
  logger.info('Done!')
  process.exit()
}).catch((e) => {
  logger.logFullError(e)
  process.exit()
})
