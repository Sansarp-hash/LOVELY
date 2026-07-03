import { Request, Response } from 'express';
import MediaService from '../services/mediaService';

export class MediaController {
  async getMedia(req: Request, res: Response) {
    try {
      const { type, country, year, search, sortBy, page = 1, limit = 20 } = req.query;
      const userAge = req.user?.age || 18;

      const filters = {
        type,
        country,
        year,
        search,
        sortBy,
      };

      const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
      const result = await MediaService.getMedia(filters, userAge, parseInt(limit as string), offset);

      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getMediaById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userAge = req.user?.age || 18;

      const media = await MediaService.getMediaById(id, userAge);
      res.json(media);
    } catch (error: any) {
      res.status(error.message.includes('not found') ? 404 : 400).json({ error: error.message });
    }
  }

  async createMedia(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const media = await MediaService.createMedia(req.body, userId);
      res.status(201).json(media);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async rateMedia(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const { id } = req.params;
      const { rating, review } = req.body;

      const result = await MediaService.rateMedia(id, userId, rating, review);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getRelatedContent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { limit = 10 } = req.query;

      const related = await MediaService.getRelatedContent(id, parseInt(limit as string));
      res.json(related);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new MediaController();