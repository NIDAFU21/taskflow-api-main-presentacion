import * as taskService from '../services/task.service.js';
import { successResponse } from '../utils/response.js';

export const getAllTasks = async (req, res) => {
  const { projectId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const tasks = await taskService.findAllTasks(
    projectId,
    page,
    limit
  );

  return successResponse(res, tasks, 'Tareas obtenidas');
};

export const createTask = async (req, res) => {
  const task = await taskService.createTask(
    req.params.projectId,
    req.user.id,
    req.body
  );

  return successResponse(res, task, 'Tarea creada', 201);
};

export const updateTask = async (req, res) => {
  const { id, title, description } = req.body;

  const task = await taskService.updateTask(
    id,
    req.params.projectId,
    {
      title,
      description,
    }
  );

  return successResponse(res, task, 'Tarea actualizada');
};

export const deleteTask = async (req, res) => {
  await taskService.deleteTask(
    req.body.id,
    req.params.projectId
  );

  return successResponse(res, null, 'Tarea eliminada');
};

export const completeTask = async (req, res) => {
  const task = await taskService.completeTask(
    req.body.id,
    req.params.projectId
  );

  return successResponse(res, task, 'Tarea completada');
};