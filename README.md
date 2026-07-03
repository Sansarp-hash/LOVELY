# SameSky - Girls' Love Entertainment Platform

## Project Overview

SameSky is a centralized global encyclopedia, interactive fan community, native live entertainment platform, virtual gifting hub, and physical reward ecosystem dedicated exclusively to Girls' Love (GL) and lesbian content across all international markets.

### Core Features
- 18+ age-verified user system with strict access control
- Media encyclopedia with rating and review system
- Live streaming with virtual gifting (GL Coins)
- 5-tier raffle system (Design Directive, Personal Item, Fan Meet, Merch, Fan Letter)
- Premium subscription with loyalty badges
- Social feed with community engagement
- Creator/Actress profiles and monetization
- AI-powered content moderation
- International support (English/Spanish with extensible i18n)

## Tech Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS
- Playfair Display & Inter fonts
- Axios for API calls
- i18next for localization

### Backend
- Node.js + Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Stripe API Integration

### Infrastructure
- AWS S3 for media storage
- Docker for containerization
- GitHub Actions for CI/CD

## Project Structure

```
LOVELY/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Database, env, payment config
│   │   ├── controllers/    # Route handlers
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── routes/         # API endpoints
│   │   ├── schemas/        # Database schemas (Prisma)
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Helper functions
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── .env.example        # Environment variables template
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API client & hooks
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── styles/         # Global styles
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Helper functions
│   │   └── i18n/           # Localization files
│   ├── public/             # Static assets
│   ├── package.json
│   └── tsconfig.json
├── docs/                    # Documentation
├── docker-compose.yml       # Docker setup
└── .gitignore
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose (optional)
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/Sansarp-hash/LOVELY.git
cd LOVELY
```

2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Setup environment variables
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

4. Initialize database
```bash
cd backend
npx prisma migrate dev
```

5. Start development servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

## Development Phases

### Phase 1: Foundation (Weeks 1-2)
- [ ] Database schema setup
- [ ] Authentication & authorization
- [ ] Age verification system
- [ ] Role-based access control

### Phase 2: Core Features (Weeks 3-4)
- [ ] Media encyclopedia
- [ ] Search & filtering
- [ ] Review & rating system
- [ ] Watchlist functionality
- [ ] Subscription system

### Phase 3: Community (Weeks 5-6)
- [ ] Social feed
- [ ] Comments & interactions
- [ ] Direct messaging
- [ ] Follow system
- [ ] Fan art upload

### Phase 4: Creator Tools (Weeks 7-8)
- [ ] Live streaming
- [ ] Virtual gifting
- [ ] Raffle systems
- [ ] Earnings dashboard
- [ ] Creator profiles

### Phase 5: Polish & Launch (Weeks 9-10)
- [ ] AI moderation
- [ ] Leaderboards
- [ ] Analytics
- [ ] Testing & security
- [ ] Deployment

## API Documentation

See [docs/API.md](docs/API.md) for detailed API endpoint documentation.

## Database Schema

See [docs/DATABASE.md](docs/DATABASE.md) for complete schema documentation.

## Contributing

1. Create feature branch from `develop`
2. Commit changes with descriptive messages
3. Push to branch
4. Create Pull Request

## License

MIT

## Contact

For questions, reach out to the development team.
