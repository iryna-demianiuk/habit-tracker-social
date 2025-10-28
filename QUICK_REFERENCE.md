# ⚡ Quick Reference Cheat Sheet

## 🚀 Start Development Server
```bash
cd backend
npm run dev          # Backend (runs on http://localhost:5000)
npm start            # Frontend
```

---

## 🔧 Essential Backend Commands

### Prisma Commands:
```bash
npx prisma init              # Initialize Prisma
npx prisma generate          # Generate Prisma Client
npx prisma migrate dev       # Create database tables
npx prisma studio            # Open database GUI
npx prisma format            # Format schema
```

### NPM Commands:
```bash
npm install                 # Install all dependencies
npm install <package>       # Install single package
npm run dev                 # Start development server
npm run build               # Build for production
npm run start               # Run production build
```

---

## 📝 Common Code Snippets

### Express Server Setup:
```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Create API Route:
```typescript
app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
```

### Create with Prisma:
```typescript
const user = await prisma.user.create({
  data: { name: 'Iryna', email: 'iryna@example.com' }
});
```

### Read with Prisma:
```typescript
const users = await prisma.user.findMany();
const user = await prisma.user.findUnique({ where: { id: '123' } });
```

### Update with Prisma:
```typescript
const user = await prisma.user.update({
  where: { id: '123' },
  data: { name: 'Iryna Updated' }
});
```

### Delete with Prisma:
```typescript
await prisma.user.delete({ where: { id: '123' } });
```

---

## 🗃️ Prisma Schema Template

```prisma
model ModelName {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relationships
  relation Model[]
  
  @@map("table_name")
}
```

---

## 🔑 Environment Variables (.env)
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/db"
JWT_SECRET="your-secret-key"
NODE_ENV=development
```

---

## 📦 Common NPM Packages

```bash
# Backend
npm install express cors dotenv prisma @prisma/client
npm install bcrypt jsonwebtoken

# Dev Tools
npm install --save-dev typescript nodemon ts-node
npm install --save-dev @types/node @types/express

# Frontend
npm install @react-navigation/native
npm install @react-native-async-storage/async-storage
```

---

## 🧠 Key Concepts

### const vs let:
```javascript
const name = 'Iryna';        // Cannot reassign
let age = 25;                // Can reassign
```

### Async/Await:
```javascript
const data = await fetch('/api/users');
```

### Template Literals:
```javascript
const message = `Hello ${name}, you are ${age} years old`;
```

### Spread Operator:
```javascript
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProperty: value };
```

---

## 🔍 Debugging Tips

### Check if Server is Running:
```bash
curl http://localhost:5000
```

### View Database:
```bash
npx prisma studio
```

### Check Logs:
```bash
# Backend logs appear in terminal
# Frontend logs appear in terminal or browser console
```

---

## 📞 Common Issues & Solutions

### "Cannot find module"
```bash
npm install
```

### "Port already in use"
```bash
# Find process
lsof -ti:5000

# Kill process
kill -9 <PID>
```

### "Database connection error"
```bash
# Check DATABASE_URL in .env
# Make sure database is running
```

---

## 🎯 Project Files

```
backend/
├── src/server.ts              # Main server
├── prisma/schema.prisma       # Database schema
└── .env                       # Environment variables

app/
├── (tabs)/index.tsx           # Main screen
└── utils/streakUtils.ts       # Helper functions
```

---

*Keep this cheat sheet handy for quick lookups!*

