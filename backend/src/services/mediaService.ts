import prisma from '../config/database';
import { v4 as uuidv4 } from 'uuid';

export class MediaService {
  /**
   * Get all media with filtering
   */
  async getMedia(filters: any = {}, userAge: number = 18, limit: number = 20, offset: number = 0) {
    const where: any = {
      status: 'published',
    };

    if (userAge < 18) {
      where.contentRating = { in: ['sfw'] };
    } else {
      where.contentRating = { in: ['sfw', 'mature', 'explicit'] };
    }

    if (filters.type) where.type = filters.type;
    if (filters.country) where.country = filters.country;
    if (filters.year) where.year = filters.year;
    if (filters.genres) where.genres = { hasSome: filters.genres };

    if (filters.search) {
      where.OR = [
        { title: { search: filters.search } },
        { synopsis: { search: filters.search } },
      ];
    }

    const media = await prisma.contentEntry.findMany({
      where,
      orderBy: filters.sortBy === 'rating' ? { fanRatingAvg: 'desc' } : { createdAt: 'desc' },
      take: limit,
      skip: offset,
      include: {
        reviews: {
          select: { star_rating: true },
          take: 5,
        },
      },
    });

    const total = await prisma.contentEntry.count({ where });

    return {
      media,
      total,
      limit,
      offset,
    };
  }

  /**
   * Get media by ID
   */
  async getMediaById(id: string, userAge: number = 18) {
    const media = await prisma.contentEntry.findUnique({
      where: { id },
      include: {
        reviews: {
          where: { status: 'approved' },
          include: {
            user: {
              select: { name: true, avatar_url: true },
            },
          },
          take: 10,
        },
        fanArt: {
          where: { status: 'approved' },
          take: 20,
        },
      },
    });

    if (!media) {
      throw new Error('Media not found');
    }

    if (userAge < 18 && media.contentRating !== 'sfw') {
      throw new Error('Access denied: You must be 18+ to view this content');
    }

    return media;
  }

  /**
   * Create new media entry
   */
  async createMedia(data: any, userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, premiumStatus: true },
    });

    if (!user?.premiumStatus) {
      throw new Error('Premium membership required to submit media');
    }

    const media = await prisma.contentEntry.create({
      data: {
        id: uuidv4(),
        title: data.title,
        type: data.type,
        country: data.country,
        year: data.year,
        genres: data.genres || [],
        synopsis: data.synopsis,
        coverImageUrl: data.coverImageUrl,
        trailerUrl: data.trailerUrl,
        contentRating: data.contentRating || 'sfw',
        streamingLinks: data.streamingLinks || [],
        cast: data.cast || [],
        shipProfiles: data.shipProfiles || [],
        episodeList: data.episodeList,
        trivia: data.trivia || [],
        awards: data.awards || [],
        status: 'draft',
        submitted_by: userId,
        fanRatingAvg: 0,
        starRatingCount: 0n,
      },
    });

    return media;
  }

  /**
   * Add or update rating for media
   */
  async rateMedia(contentId: string, userId: string, rating: number, review?: string) {
    if (rating < 1 || rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        content_ref: contentId,
        user_ref: userId,
      },
    });

    let reviewRecord;

    if (existingReview) {
      reviewRecord = await prisma.review.update({
        where: { id: existingReview.id },
        data: {
          star_rating: rating,
          text_body: review,
          status: review ? 'pending' : 'approved',
        },
      });
    } else {
      reviewRecord = await prisma.review.create({
        data: {
          id: uuidv4(),
          content_ref: contentId,
          user_ref: userId,
          star_rating: rating,
          text_body: review,
          status: review ? 'pending' : 'approved',
          timestamp: new Date(),
        },
      });
    }

    await this.updateAverageRating(contentId);

    return reviewRecord;
  }

  /**
   * Update average rating for media
   */
  private async updateAverageRating(contentId: string) {
    const reviews = await prisma.review.findMany({
      where: { content_ref: contentId, status: 'approved' },
      select: { star_rating: true },
    });

    if (reviews.length === 0) {
      return;
    }

    const sum = reviews.reduce((acc, r) => acc + r.star_rating, 0);
    const average = sum / reviews.length;

    await prisma.contentEntry.update({
      where: { id: contentId },
      data: {
        fanRatingAvg: average,
        starRatingCount: BigInt(reviews.length),
      },
    });
  }

  /**
   * Get related content
   */
  async getRelatedContent(contentId: string, limit: number = 10) {
    const content = await prisma.contentEntry.findUnique({
      where: { id: contentId },
      select: { country: true, genres: true, type: true },
    });

    if (!content) {
      throw new Error('Media not found');
    }

    const related = await prisma.contentEntry.findMany({
      where: {
        id: { not: contentId },
        status: 'published',
        OR: [
          { country: content.country },
          { genres: { hasSome: content.genres } },
          { type: content.type },
        ],
      },
      take: limit,
      orderBy: { fanRatingAvg: 'desc' },
    });

    return related;
  }
}

export default new MediaService();