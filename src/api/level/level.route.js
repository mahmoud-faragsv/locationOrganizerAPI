import express from 'express';
import { createLevel } from './level.controller.js';
import { validateLevelsInputs } from './level.validator.js';

const router = express.Router();

router.route('/').post(validateLevelsInputs, createLevel);
export default router;
