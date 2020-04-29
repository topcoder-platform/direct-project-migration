/**
 * Populate the ChallengeMigrationProgress based on data that was already migrated
 */
global.Promise = require('bluebird');

const config = require('config');
const util = require('util');
const _ = require('lodash');
// const { getOrCreateWorkingChallenge } = require('../actions')
const informixProjectService = require('./services/informixProjectService')
const postgresProjectService = require('./services/postgresProjectService')
const logger = require('./util/logger');

const migrate = async () => {
  const offset = config.get('BATCH_SIZE');
  let finish = false
  let skip = 0
  let batch = 1

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
          postgresProjectService.createProject(project.directprojectid, project.name)
        }
      } else {
        finish = true
      }
    } catch (e) {
      logger.debug(util.inspect(e))
      finish = true
      throw e
    }
    skip += offset
    batch++
  }
}

migrate().then(() => {
  logger.info('Done!')
  process.exit()
}).catch((e) => {
  logger.logFullError(e)
  process.exit()
})
