import { Router } from 'express';
import CoinController from '../controllers/coinController';
import { authenticateToken, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

router.get('/balance', (req, res) => CoinController.getBalance(req, res));
router.get('/transactions', (req, res) => CoinController.getTransactionHistory(req, res));

export default router;