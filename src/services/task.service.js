import * as repository from '../repositories/task.repository.js';
import * as projectRepository from '../repositories/project.repository.js';
import { AppError } from '../utils/AppError.js';

export const createTask = async (projectId, userId, data) => {
  const project = await projectRepository.findById(
    projectId,
    userId
  );

  if (!project) {
    throw new AppError('Proyecto no encontrado', 404);
  }

  return await repository.create({
    ...data,
    projectId,
  });
};

export const findAllTasks = async (
  projectId,
  page = 1,
  limit = 10
) => {
  page = Number(page);
  limit = Number(limit);

  if (!Number.isInteger(page) || page < 1) {
    throw new AppError(
      'La página debe ser un número entero positivo',
      400
    );
  }

  if (!Number.isInteger(limit) || limit < 1) {
    throw new AppError(
      'El límite debe ser un número entero positivo',
      400
    );
  }

  const result = await repository.findAllByProject(
    projectId,
    page,
    limit
  );

  return {
    items: result.items,
    pagination: {
      page,
      limit,
      totalItems: result.totalItems,
      totalPages: Math.ceil(
        result.totalItems / limit
      ),
    },
  };
};

export const updateTask = async (
  id,
  projectId,
  data
) => {
  const task = await repository.findById(
    id,
    projectId
  );

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return await repository.update(task, data);
};

export const deleteTask = async (
  id,
  projectId
) => {
  const task = await repository.findById(
    id,
    projectId
  );

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  await repository.remove(task);
};

export const completeTask = async (
  id,
  projectId
) => {
  const task = await repository.findById(
    id,
    projectId
  );

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return await repository.update(task, {
    completed: true,
  });
};