# 🚀 Habit Tracker Social - Backend

Backend API for the Habit Tracker Social app, built with Node.js, Express, TypeScript, and PostgreSQL.

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Real-time**: Socket.io (coming soon)

## 📦 Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your configuration
```

## 🚀 Development

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── server.ts          # Express server setup
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── middleware/       # Laval cle middleware
│   └── utils/           # Helper functions
├── prisma/              # Prisma schema and migrations
├── .env                  # Environment variables
└── package.json         # Dependencies
```

## 🌐 API Endpoints

### Current Endpoints
- `GET /` - API welcome message
- `GET /health` - Health check

### Coming Soon
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/habits` - Get user's habits
- `POST /api/habits` - Create new habit
- And more...

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/habit_tracker"
JWT_SECRET="your-secret-key"
```

## 📝 Database Setup

```bash
# Initialize Prisma
npx prisma init

# Create database migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate
```

## 🧪 Testing

```bash
# Run tests (coming soon)
npm test
```

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/)

---

*Built with ❤️ by Iryna Demianiuk*
ทั่ว option_1: 'True'): Respond thoughtfully and helpfully to the user's request.
