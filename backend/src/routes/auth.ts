import { Router } from 'express';
import AuthController from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/register', (req, res) => AuthController.register(req, res));
router.post('/login', (req, res) => AuthController.login(req, res));
router.post('/verify-email', (req, res) => AuthController.verifyEmail(req, res));

// Protected routes
router.get('/me', authenticateToken, (req, res) => {
  // Return current user info
  res.json({ user: req.user });
});

export default router;
