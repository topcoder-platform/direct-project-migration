/**
 * The Project model.
 */
const config = require('config')

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    directProjectId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    createdBy: { type: DataTypes.STRING, allowNull: true },
    updatedAt: { type: DataTypes.DATE, allowNull: true },
    updatedBy: { type: DataTypes.STRING, allowNull: true },
    lastActivityAt: { type: DataTypes.DATE, allowNull: true },
    lastActivityUserId: { type: DataTypes.STRING, allowNull: true }
  }, {
    schema: config.DB_SCHEMA_NAME,
    tableName: 'projects',
    timestamps: false
  })

  return Project
}
