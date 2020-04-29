const models = require('../models')
// const { AGREE_FOR_DOCUSIGN_TEMPLATE, ELECT_AGREEABLE } = require('../../app-constants')
// const logger = require('../util/logger')
const moment = require('moment')
const Project = models.Project
const { Op } = require('sequelize')

async function createProject (directProjectId, name, status) {
  const project = await Project.create({
    directProjectId,
    name,
    type: 'app_dev',
    status: 'completed',
    createdAt: moment(),
    createdBy: 40152856,
    updatedAt: moment(),
    updatedBy: 40152856,
    lastActivityAt: moment(),
    lastActivityUserId: 40152856
  })
  return project
  // logger.info('Create Project', { directProjectId, name })
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
