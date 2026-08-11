import { Router } from 'express';

import * as projectController from '../controllers/project.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { uuidParamValidator } from '../validators/common.validator.js';
import { validate } from '../middlewares/validation.middleware.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Obtener todos los proyectos del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Proyectos obtenidos
 */
router.get('/', projectController.getProjects);

/**
 * @swagger
 * /projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Crear un nuevo proyecto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proyecto creado
 */
router.post('/', projectController.createProject);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Obtener un proyecto con sus tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Proyecto obtenido
 *       404:
 *         description: Proyecto no encontrado
 */
router.get(
  '/:id',
  uuidParamValidator('id'),
  validate,
  projectController.getProject
);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Actualizar un proyecto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proyecto actualizado
 */
router.put(
  '/:id',
  uuidParamValidator('id'),
  validate,
  projectController.updateProject
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Eliminar un proyecto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Proyecto eliminado
 */
router.delete(
  '/:id',
  uuidParamValidator('id'),
  validate,
  projectController.deleteProject
);

export default router;
