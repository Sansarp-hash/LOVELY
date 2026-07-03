import { Router } from 'express';
import MediaController from '../controllers/mediaController';
import { authenticateToken, authorize } from '../middleware/auth';

const router = Router();

router.get('/', (req, res) => MediaController.getMedia(req, res));
router.get('/:id', (req, res) => MediaController.getMediaById(req, res));
router.get('/:id/related', (req, res) => MediaController.getRelatedContent(req, res));

router.post('/', authenticateToken, authorize('premium_verified', 'actress_creator', 'admin'), 
  (req, res) => MediaController.createMedia(req, res)
);

router.post('/:id/rate', authenticateToken, (req, res) => MediaController.rateMedia(req, res));

export default router;