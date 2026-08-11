import * as repository from '../repositories/project.repository.js';
import { AppError } from '../utils/AppError.js';

export const getProjects = async (userId) => {
  return await repository.findAllByUser(userId);
};

export const getProject = async (id, userId) => {
  const project = await repository.findById(id, userId);

  if (!project) {
    throw new AppError('Proyecto no encontrado', 404);
  }

  return project;
};

export const createProject = async (data, userId) => {
  return await repository.create({
    ...data,
    userId,
  });
};

export const updateProject = async (id, userId, data) => {
  const project = await repository.findById(id, userId);

  if (!project) {
    throw new AppError('Proyecto no encontrado', 404);
  }

  return await repository.update(project, data);
};

export const deleteProject = async (id, userId) => {
  const project = await repository.findById(id, userId);

  if (!project) {
    throw new AppError('Proyecto no encontrado', 404);
  }

  await repository.remove(project);
};
