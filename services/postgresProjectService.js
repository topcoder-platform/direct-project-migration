const models = require('../models')
// const { AGREE_FOR_DOCUSIGN_TEMPLATE, ELECT_AGREEABLE } = require('../../app-constants')
const logger = require('../util/logger')
// const moment = require('moment')
const Project = models.Project
const { Op } = require('sequelize')

async function createProject (projectObj) {
  const obj = {
    directProjectId: projectObj.directProjectId,
    name: projectObj.name,
    type: 'app_dev',
    status: 'completed',
    createdAt: projectObj.createdAt,
    createdBy: projectObj.createdBy,
    updatedAt: projectObj.updatedAt,
    updatedBy: projectObj.updatedBy,
    lastActivityAt: projectObj.lastActivityAt,
    lastActivityUserId: projectObj.lastActivityUserId
  }
  logger.debug('Creating', obj)
  const project = await Project.create(obj)
  return project
}

async function getV5ProjectIdsForDirectProjectIds (arrayOfDirectProjectIds) {
  return Project.findAll({
    attributes: ['id', ['directProjectId', 'directprojectid']],
    raw: true,
    where: {
      directProjectId: { [Op.in]: arrayOfDirectProjectIds }
    }
  })
}

module.exports = {
  createProject,
  getV5ProjectIdsForDirectProjectIds
}
