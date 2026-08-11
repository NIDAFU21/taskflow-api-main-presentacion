import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize.js';

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'active',
    },

    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
    underscored: true,
    paranoid: true,
  }
);

export default Project;
