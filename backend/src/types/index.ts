// User Types
export type UserRole = 'free_verified' | 'premium_verified' | 'actress_creator' | 'moderator' | 'admin' | 'super_admin' | 'banned';
export type UserProfileVisibility = 'public' | 'private';

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  ageVerified: boolean;
  dob: Date;
  avatar_url?: string;
  bio?: string;
  countryCode: string;
  preferredLanguage: string;
  premiumStatus: boolean;
  subscriptionExpiry?: Date;
  subscriptionDurationMonths?: number;
  loyaltyBadge?: 'gl_fan' | 'gl_supporter' | 'loyal_fan' | 'gl_legend';
  profileVisibility: UserProfileVisibility;
  aiViolationStrikes: number;
  fanArtUploadBanned: boolean;
  coinBalance: number;
  role: UserRole;
  blockedUsers: string[];
  mutedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Content Types
export type ContentType = 'series' | 'movie' | 'short_drama' | 'novel' | 'ship';
export type ContentRating = 'sfw' | 'mature' | 'explicit';
export type ContentStatus = 'draft' | 'published' | 'archived';

export interface ContentEntry {
  id: string;
  title: string;
  type: ContentType;
  country: string;
  year: number;
  genres: string[];
  synopsis: string;
  coverImageUrl?: string;
  trailerUrl?: string;
  contentRating: ContentRating;
  streamingLinks: Array<{
    platformName: string;
    url: string;
    regions: string[];
  }>;
  cast: Array<{
    name: string;
    role: string;
    photoUrl?: string;
    socialHandles?: Record<string, string>;
  }>;
  shipProfiles: Array<{
    shipName: string;
    actressARef: string;
    actressBRef: string;
  }>;
  episodeList?: Array<{
    episodeNumber: number;
    title: string;
    runtimeMinutes: number;
  }>;
  trivia?: string[];
  awards?: string[];
  fanRatingAvg: number;
  starRatingCount: number;
  status: ContentStatus;
  submittedBy: string;
  isFeatured: boolean;
  relatedContentRefs?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Raffle Types
export type RaffleStatus = 'draft' | 'pending_actress_approval' | 'live' | 'drawing' | 'completed' | 'rejected' | 'cancelled';
export type FulfillmentStatus = 'pending' | 'design_in_progress' | 'produced' | 'shipped' | 'delivered';
export type PersonalItemType = 'clothing' | 'accessory' | 'gl_drama_prop';

// Subscription Types
export interface SubscriptionConfig {
  id: string;
  durationMonths: number;
  priceUsd: number;
  bonusCoins: number;
  loyaltyBadgeName: string;
}

// Coin Transaction Types
export type TransactionType = 'purchase' | 'spend' | 'earn' | 'withdrawal' | 'bonus' | 'raffle_entry' | 'raffle_refund';

// Auth Types
export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}
