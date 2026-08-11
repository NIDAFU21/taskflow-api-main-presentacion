import { Router } from 'express';

import * as taskController from '../controllers/task.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { uuidParamValidator } from '../validators/common.validator.js';
import { validate } from '../middlewares/validation.middleware.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /tasks/{projectId}:
 *   get:
 *     tags:
 *       - Tasks
 *     summary: Obtener las tareas de un proyecto con paginación
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Tareas obtenidas
 */
router.get(
  '/:projectId',
  uuidParamValidator('projectId'),
  validate,
  taskController.getAllTasks
);

/**
 * @swagger
 * /tasks/{projectId}:
 *   post:
 *     tags:
 *       - Tasks
 *     summary: Crear una nueva tarea en un proyecto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarea creada
 */
router.post(
  '/:projectId',
  uuidParamValidator('projectId'),
  validate,
  taskController.createTask
);

/**
 * @swagger
 * /tasks/{projectId}:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Actualizar una tarea
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tarea actualizada
 */
router.patch(
  '/:projectId',
  uuidParamValidator('projectId'),
  validate,
  taskController.updateTask
);

/**
 * @swagger
 * /tasks/{projectId}:
 *   delete:
 *     tags:
 *       - Tasks
 *     summary: Eliminar una tarea
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Tarea eliminada
 */
router.delete(
  '/:projectId',
  uuidParamValidator('projectId'),
  validate,
  taskController.deleteTask
);

/**
 * @swagger
 * /tasks/{projectId}/complete:
 *   patch:
 *     tags:
 *       - Tasks
 *     summary: Marcar una tarea como completada
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Tarea completada
 */
router.patch(
  '/:projectId/complete',
  uuidParamValidator('projectId'),
  validate,
  taskController.completeTask
);

export default router;
