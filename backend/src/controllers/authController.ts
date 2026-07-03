import { Request, Response } from 'express';
import AuthService from '../services/authService';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, dob, countryCode, preferredLanguage } = req.body;

      // Validation
      if (!name || !email || !password || !dob || !countryCode) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const result = await AuthService.register({
        name,
        email,
        password,
        dob: new Date(dob),
        countryCode,
        preferredLanguage: preferredLanguage || 'en',
      });

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
      }

      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: 'Token required' });
      }

      const result = await AuthService.verifyEmail(token);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new AuthController();
