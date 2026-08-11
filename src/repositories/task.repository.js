import Task from '../entities/task.entity.js';

export const create = async (data) => {
  return await Task.create(data);
};

export const findAllByProject = async (
  projectId,
  page,
  limit
) => {
  const offset = (page - 1) * limit;

  const { count, rows } =
    await Task.findAndCountAll({
      where: { projectId },
      attributes: [
        'id',
        'title',
        'description',
        'completed',
      ],
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

  return {
    items: rows,
    totalItems: count,
  };
};

export const findById = async (
  id,
  projectId
) => {
  return await Task.findOne({
    where: {
      id,
      projectId,
    },
    attributes: [
      'id',
      'title',
      'description',
      'completed',
      'projectId',
    ],
  });
};

export const update = async (task, data) => {
  return await task.update(data);
};

export const remove = async (task) => {
  return await task.destroy();
};