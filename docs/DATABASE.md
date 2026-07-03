# SameSky Database Schema

## Overview
The database uses PostgreSQL with Prisma ORM. This document outlines the key entities and relationships.

## Core Entities

### User
Represents a platform user.

**Fields:**
- `id`: UUID primary key
- `name`: User's display name
- `email`: Unique email address
- `emailVerified`: Boolean flag for email verification
- `ageVerified`: Boolean flag for age verification
- `dob`: Date of birth
- `password`: Hashed password (bcrypt)
- `countryCode`: ISO 2-letter country code
- `preferredLanguage`: Language preference (en, es)
- `premiumStatus`: Boolean
- `role`: free_verified | premium_verified | actress_creator | moderator | admin | super_admin | banned
- `coinBalance`: User's GL Coin balance
- `aiViolationStrikes`: Counter for AI violation strikes
- `fanArtUploadBanned`: Boolean flag
- `blockedUsers`: Array of user IDs
- `mutedUsers`: Array of user IDs
- `createdAt`, `updatedAt`: Timestamps

### ActressProfile
Extends User for creators and actresses.

**Fields:**
- `type`: official | verified_creator
- `display_name`: Public display name
- `bio`, `photo_url`: Profile info
- `social_handles`: JSON map of social platforms
- `fan_letter_pool_open`: Boolean
- `live_stream_enabled`: Boolean
- `total_coins_earned`: Total lifetime earnings
- `pending_withdrawal_balance`: Pending withdrawal amount

### ContentEntry
Represents media content (series, movies, etc.)

**Fields:**
- `type`: series | movie | short_drama | novel | ship
- `country`: Production country
- `year`: Release year
- `genres`: Array of genre strings
- `synopsis`: Long description
- `contentRating`: sfw | mature | explicit
- `streamingLinks`: JSON array of platforms
- `cast`: JSON array of cast members
- `fanRatingAvg`: Calculated average rating
- `status`: draft | published | archived

### Review
User ratings and reviews for content.

**Fields:**
- `star_rating`: 1-5 rating
- `text_body`: Optional review text (premium only)
- `status`: pending | approved | rejected

### DesignDirectiveRaffle
Raffle for design directive merch creation.

**Fields:**
- `brand_name`: Partner brand
- `design_brief`: Description
- `design_options`: JSON array of 3-5 options
- `coin_cost_per_paid_entry`: Entry cost
- `status`: draft | pending_actress_approval | live | drawing | completed | rejected | cancelled
- `fulfillment_status`: pending | design_in_progress | produced | shipped | delivered
- `production_cost_usd`: Manufacturing cost

### PersonalItemRaffle
Raffle for personal items from actress.

**Fields:**
- `item_type`: clothing | accessory | gl_drama_prop
- `item_description`: Details about item
- `estimated_real_value_usd`: Item value
- `fulfillment_status`: pending | shipped | delivered
- `platform_cost_usd`: Operational cost

### FanMeetTicketRaffle
Raffle for fan meet tickets.

**Fields:**
- `event_country`: ISO 2-letter country code
- `official_ticket_price_usd`: Official price
- `platform_cost_usd`: Platform covers 90% of cost
- `digital_ticket_code`: Encrypted access code

### LiveStream
Live streaming sessions.

**Fields:**
- `status`: scheduled | live | ended | disconnected
- `viewer_count`: Current viewer count
- `raffle_type`: none | fan_letter | design_directive | personal_item
- `vod_url`: Video on demand URL after stream

### CoinTransaction
Ledger of all coin transactions.

**Fields:**
- `type`: purchase | spend | earn | withdrawal | bonus | raffle_entry | raffle_refund
- `amount`: Transaction amount
- `target_ref`: Polymorphic reference to transaction source

### Post
Social feed posts.

**Fields:**
- `body`: Post content
- `hashtags`: Array of hashtag strings
- `contentRating`: sfw | mature | explicit
- `likes_count`, `repost_count`: Engagement metrics

### FanLetter
User letters to actresses.

**Fields:**
- `subject`, `body`: Letter content (max 1000 words)
- `pool_status`: active_in_pool | drawn_winner | archived

## Key Relationships

```
User
├── 1:1 → ActressProfile
├── 1:many → WatchlistEntry → ContentEntry
├── 1:many → Review → ContentEntry
├── 1:many → FanArt
├── 1:many → Post
├── 1:many → Follow → ActressProfile
├── 1:many → FanLetter → ActressProfile
├── 1:many → CoinTransaction
├── 1:many → DirectMessage
├── 1:many → DMThread
├── 1:many → RaffleEntry
└── 1:many → Notification

ActressProfile
├── 1:many → DesignDirectiveRaffle
├── 1:many → PersonalItemRaffle
├── 1:many → FanMeetTicketRaffle
├── 1:many → LiveStream
└── 1:many → Follow

ContentEntry
├── 1:many → WatchlistEntry
├── 1:many → Review
└── 1:many → FanArt
```

## Indexing Strategy

**Indexed fields for performance:**
- `User.email`: Fast authentication lookups
- `ContentEntry.type`, `country`, `year`, `status`: Quick filtering
- `Review.content_ref`, `user_ref`: Fast comment retrieval
- `Post.author_ref`, `hashtags`: Social feed queries
- `CoinTransaction.user_ref`, `timestamp`: Ledger lookups
- `DesignDirectiveRaffle.actress_ref`, `status`: Raffle queries
- `LiveStream.actress_ref`, `status`: Stream discovery

## Migration Strategy

```bash
# Create migration
cd backend
npx prisma migrate dev --name init

# Apply migrations
npx prisma migrate deploy

# View database UI
npx prisma studio
```
