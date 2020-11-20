const config = require('config')
const models = require('../models')
// const { AGREE_FOR_DOCUSIGN_TEMPLATE, ELECT_AGREEABLE } = require('../../app-constants')
const logger = require('../util/logger')
// const moment = require('moment')
const Project = models.Project
const { Op } = require('sequelize')

const DIRECT_PROJECT_TEMPLATE_ID = config.get('DIRECT_PROJECT_TEMPLATE_ID')

async function createProject (projectObj) {
  const obj = {
    directProjectId: projectObj.directProjectId,
    billingAccountId: projectObj.billingAccountId || null,
    name: projectObj.name,
    type: 'app_dev',
    status: 'completed',
    templateId: DIRECT_PROJECT_TEMPLATE_ID,
    version: 'v3',
    createdAt: projectObj.createdAt,
    createdBy: projectObj.createdBy,
    updatedAt: projectObj.updatedAt,
    updatedBy: projectObj.updatedBy,
    lastActivityAt: projectObj.lastActivityAt,
    lastActivityUserId: projectObj.lastActivityUserId
  }
  console.log(obj)
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
