import Project from '../entities/project.entity.js';
import Task from '../entities/task.entity.js';

export const findAllByUser = async (userId) => {
  return await Project.findAll({
    where: { userId },
    order: [['createdAt', 'DESC']],
  });
};

export const findById = async (id, userId) => {
  return await Project.findOne({
    where: {
      id,
      userId,
    },
    attributes: [
      'id',
      'name',
      'description',
      'status',
      'userId',
      'createdAt',
      'updatedAt',
    ],
    include: [
      {
        model: Task,
        as: 'tasks',
        attributes: ['id', 'title', 'description', 'completed'],
      },
    ],
  });
};

export const create = async (data) => {
  return await Project.create(data);
};

export const update = async (project, data) => {
  return await project.update(data);
};

export const remove = async (project) => {
  return await project.destroy();
};
