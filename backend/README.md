# SameSky Backend

Node.js/Express backend for the SameSky Girls' Love Platform.

## Tech Stack
- Node.js 18+
- Express.js 4
- PostgreSQL 14+
- Prisma ORM
- TypeScript 5
- JWT Authentication
- Stripe API

## Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route handlers
├── middleware/       # Express middleware
├── routes/           # API routes
├── services/         # Business logic
├── types/            # TypeScript types
├── utils/            # Utility functions
└── index.ts          # Application entry point

prisma/
└── schema.prisma     # Database schema
```

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env
# Edit .env with your configuration
```

### Database Setup

```bash
# Run migrations
npx prisma migrate dev

# View database (GUI)
npx prisma studio
```

### Development

```bash
# Start development server
npm run dev

# Build
npm run build

# Start production server
npm start
```

## API Endpoints

See [docs/API.md](../../docs/API.md) for complete API documentation.

## Database Schema

See [docs/DATABASE.md](../../docs/DATABASE.md) for schema details.

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Key Features

- **Age Verification**: Strict 15+ entry with 18+ content restrictions
- **Role-Based Access Control**: Free, Premium, Actress, Moderator, Admin levels
- **Virtual Currency**: GL Coins for purchases and transactions
- **Raffle System**: 5 different raffle types with weighted random selection
- **Live Streaming**: Native video streaming with virtual gifting
- **Media Encyclopedia**: Comprehensive content database with ratings/reviews
- **Social Features**: Posts, comments, direct messaging, following
- **AI Moderation**: Automated AI generation detection for fan art

## Testing

```bash
npm test
```

## Deployment

See [docs/DEVELOPMENT.md](../../docs/DEVELOPMENT.md) for deployment instructions.
