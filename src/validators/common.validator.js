import { param } from 'express-validator';

export const uuidParamValidator = (name = 'id') => [
  param(name).isUUID().withMessage('Formato de ID inválido'),
];
