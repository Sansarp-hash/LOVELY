# Development Setup Guide

## Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- PostgreSQL 14+ ([Download](https://www.postgresql.org/download/))
- Git
- Docker & Docker Compose (optional)

## Quick Start with Docker

1. Clone the repository
```bash
git clone https://github.com/Sansarp-hash/LOVELY.git
cd LOVELY
```

2. Create environment file
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Start services with Docker Compose
```bash
docker-compose up -d
```

4. Initialize database
```bash
docker exec samesky-backend npx prisma migrate dev
```

5. Access the application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database UI: http://localhost:5432 (PostgreSQL)

## Manual Setup

### Backend Setup

1. Navigate to backend directory
```bash
cd backend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment
```bash
cp .env.example .env
# Edit .env with your database URL and secrets
```

4. Initialize Prisma
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Start development server
```bash
npm run dev
```

Backend will run on http://localhost:3001

### Frontend Setup

1. Navigate to frontend directory
```bash
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Configure environment
```bash
cp .env.example .env
# Update REACT_APP_API_URL if needed
```

4. Start development server
```bash
npm start
```

Frontend will run on http://localhost:3000

## Database Setup

### Using PostgreSQL Locally

1. Create database
```bash
createdb samesky_db
```

2. Update `.env` with connection string
```
DATABASE_URL="postgresql://user:password@localhost:5432/samesky_db"
```

3. Run migrations
```bash
cd backend
npx prisma migrate dev
```

### Using Prisma Studio (GUI)

```bash
cd backend
npx prisma studio
```

This opens a web interface to browse and edit database data.

## Environment Variables

### Backend (.env)
```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/samesky_db

# Server
NODE_ENV=development
PORT=3001

# JWT
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRY=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# AWS S3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=samesky-media

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_STRIPE_KEY=pk_test_...
REACT_APP_ENVIRONMENT=development
```

## Development Workflow

### Making Database Changes

1. Edit `backend/prisma/schema.prisma`
2. Create migration
```bash
cd backend
npx prisma migrate dev --name describe_changes
```
3. Review generated migration file
4. Commit changes

### Adding New Backend Features

1. Create service in `backend/src/services/`
2. Create controller in `backend/src/controllers/`
3. Create routes in `backend/src/routes/`
4. Import routes in `backend/src/index.ts`
5. Add TypeScript types in `backend/src/types/`

### Adding New Frontend Features

1. Create components in `frontend/src/components/`
2. Create pages in `frontend/src/pages/`
3. Add routes in `frontend/src/App.tsx`
4. Create API service methods in `frontend/src/services/`
5. Add i18n translations in `frontend/src/i18n/locales/`

## Useful Commands

### Backend
```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build TypeScript
npm run lint         # Lint code
npm run format       # Format code

# Database
npx prisma migrate dev      # Create and run migration
npx prisma migrate deploy   # Apply migrations
npx prisma generate         # Generate Prisma client
npx prisma studio           # Open database GUI

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

### Frontend
```bash
# Development
npm start            # Start dev server
npm run build        # Build for production
npm test             # Run tests
npm run lint         # Lint code
npm run format       # Format code
```

## Troubleshooting

### Database connection issues
- Verify PostgreSQL is running
- Check DATABASE_URL in .env
- Ensure database exists: `createdb samesky_db`

### Port already in use
- Backend: `lsof -i :3001` then kill the process
- Frontend: `lsof -i :3000` then kill the process
- Or change PORT in .env files

### Module not found errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Prisma cache: `rm -rf node_modules/.prisma`

### Prisma type errors
- Generate Prisma client: `npx prisma generate`
- Ensure schema.prisma is valid

## Next Steps

1. Implement authentication endpoints
2. Build age verification flow
3. Create media encyclopedia endpoints
4. Implement Stripe payment integration
5. Build raffle system
6. Set up live streaming
7. Create social features
8. Deploy to production

## Support

For issues or questions:
- Check [Backend README](../backend/README.md)
- Check [Frontend README](../frontend/README.md)
- Review API documentation: [docs/API.md](./API.md)
