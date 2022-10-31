import express from 'express';
import {
  createLevelContent,
  deleteLevelContent,
  getAllLevelContents,
  getLevelContent,
  updateLevelContent
} from './level-content.controller.js';

const router = express.Router();

router.route('/').get(getAllLevelContents).post(createLevelContent);

router
  .route('/:id')
  .get(getLevelContent)
  .patch(updateLevelContent)
  .delete(deleteLevelContent);

export default router;
