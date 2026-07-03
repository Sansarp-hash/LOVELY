import { Request, Response } from 'express';
import CoinService from '../services/coinService';

export class CoinController {
  async getBalance(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const balance = await CoinService.getBalance(userId);
      res.json(balance);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTransactionHistory(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { limit = 50, offset = 0 } = req.query;
      const history = await CoinService.getTransactionHistory(
        userId,
        parseInt(limit as string),
        parseInt(offset as string)
      );

      res.json(history);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new CoinController();