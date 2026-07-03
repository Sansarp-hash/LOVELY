# SameSky API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## Endpoints

### Auth Endpoints

#### POST /auth/register
Register a new user with age verification.

**Request:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "dob": "2000-01-01",
  "countryCode": "US",
  "preferredLanguage": "en"
}
```

**Response:**
```json
{
  "user": { ... },
  "accessToken": "string"
}
```

#### POST /auth/login
Login with email and password.

**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```

#### POST /auth/verify-email
Verify email address.

**Request:**
```json
{
  "token": "string"
}
```

### User Endpoints

#### GET /users/:id
Get user profile by ID.

#### PUT /users/:id
Update user profile (authenticated).

#### GET /users/:id/watchlist
Get user's watchlist (authenticated).

#### POST /users/:id/watchlist
Add item to watchlist (authenticated).

### Media Endpoints

#### GET /media
Get all media with filtering and search.

**Query Parameters:**
- `type`: series, movie, short_drama, novel, ship
- `country`: ISO country code
- `year`: Production year
- `rating`: sfw, mature, explicit
- `search`: Search query
- `page`: Pagination page
- `limit`: Results per page

#### GET /media/:id
Get media details.

#### POST /media
Create new media entry (premium members only).

#### POST /media/:id/rate
Rate a media item (authenticated).

**Request:**
```json
{
  "rating": 1-5,
  "review": "optional text review"
}
```

### Raffle Endpoints

#### GET /raffles
Get all active raffles.

#### POST /raffles/:id/enter
Enter a raffle (authenticated).

**Request:**
```json
{
  "entries": 1,
  "paymentMethod": "coins"
}
```

#### GET /raffles/:id/status
Get raffle status and winner info.

### Live Stream Endpoints

#### GET /live
Get active live streams.

#### POST /live/:id/gift
Send a gift during live stream (authenticated).

**Request:**
```json
{
  "giftId": "string",
  "quantity": 1
}
```

### Coin Endpoints

#### GET /coins/balance
Get user's coin balance (authenticated).

#### POST /coins/purchase
Purchase GL Coins (authenticated).

**Request:**
```json
{
  "packageId": "string",
  "paymentMethodId": "string"
}
```

#### GET /coins/transactions
Get user's coin transaction history (authenticated).

### Subscription Endpoints

#### GET /subscriptions/plans
Get available subscription plans.

#### POST /subscriptions/create
Create a subscription (authenticated).

**Request:**
```json
{
  "planId": "string",
  "paymentMethodId": "string"
}
```

#### POST /subscriptions/:id/cancel
Cancel subscription (authenticated).

## Error Responses

All errors return appropriate HTTP status codes with error messages:

```json
{
  "error": "Error description",
  "code": "ERROR_CODE"
}
```

### Common Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

## Rate Limiting
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Webhook Events

### Raffle Draw Completed
```json
{
  "event": "raffle.draw_completed",
  "raffleId": "string",
  "winnerId": "string",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Payment Completed
```json
{
  "event": "payment.completed",
  "userId": "string",
  "amount": 99.99,
  "type": "subscription|coins",
  "timestamp": "2024-01-01T00:00:00Z"
}
```
