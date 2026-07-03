# SameSky Frontend

React.js frontend for the SameSky Girls' Love Platform.

## Tech Stack
- React 18
- TypeScript 5
- React Router v6
- Tailwind CSS
- Axios
- i18next (Localization)

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Page components
├── services/         # API client & external services
├── hooks/            # Custom React hooks
├── contexts/         # React Context providers
├── types/            # TypeScript interfaces
├── utils/            # Helper functions
├── styles/           # Global CSS
├── i18n/             # Localization files
├── App.tsx           # Root component
└── index.tsx         # Application entry point

public/              # Static assets
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

### Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

Application will run on http://localhost:3000

## Design System

### Colors
- **Primary**: Blush Pink (#F9D5E5), Lavender (#C9B8E8)
- **Accents**: Dusty Rose (#D4849A), Soft Violet (#9B7FC7)
- **Premium**: Shimmering Gold (#D4AF37)
- **Background**: Warm Cream (#FDF6EC)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## Key Features

### Age Gate
- Non-dismissible age verification modal on first visit
- 15+ required to browse, 18+ required for mature content
- Persistent verification in localStorage

### Authentication
- User registration with age verification
- Email verification flow
- JWT-based session management
- Role-based UI rendering

### Media Discovery
- Browse media encyclopedia
- Filter by type, country, year, rating
- Full-text search
- Personalized recommendations

### Social Features
- User profiles with public/private visibility
- Follow creators and actresses
- Social feed with posts and comments
- Direct messaging (premium only)

### Virtual Economy
- GL Coin purchases with Stripe
- Coin balance tracking
- Transaction history
- Premium subscription management

### Live Streaming
- Live stream directory
- Viewer engagement
- Virtual gifting
- Stream chat

### Raffle System
- Browse active raffles
- Purchase entries
- Track raffle status
- Winner notifications

## Localization

Supported languages:
- English (en) - default
- Spanish (es)

Add new languages in `src/i18n/locales/`

## API Integration

API client is configured in `src/services/api.ts` with:
- Automatic token injection
- Error handling
- Response interceptors

## Responsive Design

### Desktop Navigation
- Sticky top navigation bar
- Logo, search, live indicator, coins, notifications, language switcher, user avatar

### Mobile Navigation
- Bottom tab bar
- Home, Discover, Community, Live, Career, Profile

## Performance

- Code splitting with React.lazy
- Image optimization
- Lazy loading for content
- Caching strategy with localStorage

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Building for Production

```bash
# Build
npm run build

# Analyze bundle
npm install -g source-map-explorer
source-map-explorer 'build/static/js/*.js'
```
