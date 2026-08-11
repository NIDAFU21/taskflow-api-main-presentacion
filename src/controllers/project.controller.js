import * as projectService from '../services/project.service.js';
import { successResponse } from '../utils/response.js';

export const getProjects = async (req, res) => {
  const projects = await projectService.getProjects(req.user.id);

  return successResponse(res, projects, 'Proyectos obtenidos');
};

export const getProject = async (req, res) => {
  const project = await projectService.getProject(req.params.id, req.user.id);

  return successResponse(res, project, 'Proyecto obtenido');
};

export const createProject = async (req, res) => {
  const project = await projectService.createProject(req.body, req.user.id);

  return successResponse(res, project, 'Proyecto creado', 201);
};

export const updateProject = async (req, res) => {
  const project = await projectService.updateProject(
    req.params.id,
    req.user.id,
    req.body
  );

  return successResponse(res, project, 'Proyecto actualizado');
};

export const deleteProject = async (req, res) => {
  await projectService.deleteProject(req.params.id, req.user.id);

  return successResponse(res, null, 'Proyecto eliminado');
};
