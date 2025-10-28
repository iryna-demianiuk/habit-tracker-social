# 📚 Learning Notes - Habit Tracker Social

## JavaScript Fundamentals

### What is JavaScript?
- **JavaScript** = Programming language used for web development
- Runs in browsers (frontend) and on servers (backend with Node.js)
- Dynamic, interpreted language

### Example:
```javascript
// Variables
const name = 'Iryna';           // Const - cannot change
let age = 25;                   // Let - can change
var city = 'New York';          // Var - old way (avoid)

// Functions
function greet(name) {
  return `Hello ${name}!`;
}

const greet = (name) => {       // Arrow function (modern)
  return `Hello ${name}!`;
};
```

---

## TypeScript Overview

### What is TypeScript?
- **TypeScript** = JavaScript with types
- Adds type checking to catch errors before runtime
- Compiles to JavaScript

### Why Use TypeScript?
```typescript
// Without types (JavaScript)
function add(a, b) {
  return a + b;
}
add(5, "hello");  // Returns "5hello" (bug!)

// With types (TypeScript)
function add(a: number, b: number): number {
  return a + b;
}
add(5, "hello");  // ❌ Error! TypeScript catches it
```

### Common Types:
```typescript
const name: string = "Iryna";
const age: number = 25;
const isActive: boolean = true;
const items: string[] = ["apple", "banana"];
const user: { name: string; age: number } = { name: "Iryna", age: 25 };
```

---

## Node.js Explained

### What is Node.js?
- **Node.js** = Runtime environment for JavaScript
- Allows JavaScript to run outside the browser
- Built on Chrome's V8 engine

### Browser vs Node.js:
```
Browser JavaScript          Node.js JavaScript
─────────────────          ─────────────────
- Runs in Chrome           - Runs on server
- Can manipulate DOM       - Cannot manipulate DOM
- Limited file access      - Full file access
- Needs browser            - Needs Node.js installed
```

### NPM (Node Package Manager):
```bash
npm install express    # Install package
npm list               # List installed packages
npm update package     # Update package
npm uninstall package  # Remove package
```

---

## Express.js Framework

### What is Express?
- **Express** = Web framework for Node.js
- Makes it easy to create HTTP servers and APIs
- Handles routing, middleware, and requests

### Creating an Express Server:
```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables

const app = express();                    // Create Express app
const PORT = process.env.PORT || 5000;    // Get port from .env

// Middleware
app.use(cors());              // Allow cross-origin requests
app.use(express.json());      // Parse JSON in request body

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### HTTP Methods:
```typescript
app.get('/users', getUsers);      // GET - Read data
app.post('/users', createUser);   // POST - Create data
app.put('/users/:id', updateUser); // PUT - Update data
app.delete('/users/:id', deleteUser); // DELETE - Remove data
```

### Middleware Explained:
```typescript
// Middleware runs before routes
app.use(express.json());        // Parse JSON from requests
app.use(cors());                // Allow cross-origin requests
app.use(authMiddleware);        // Custom authentication

// Middleware executes in order
app.use(express.json());        // 1st: Parse JSON
app.use(cors());                // 2nd: Add CORS headers
app.get('/users', handler);     // 3rd: Handle route
```

---

## Environment Variables (dotenv)

### What are Environment Variables?
- **Environment Variables** = Configuration values stored outside code
- Used for secrets, API keys, database URLs
- Not committed to Git

### Using dotenv:
```bash
# .env file
PORT=5000
DATABASE_URL=postgresql://localhost:5432/db
JWT_SECRET=my-secret-key
```

```typescript
import dotenv from 'dotenv';

dotenv.config();  // Load .env into process.env

const port = process.env.PORT;           // Access variables
const dbUrl = process.env.DATABASE_URL;
```

### Why Use .env Files?
```
Hardcoding (❌ Bad):
const JWT_SECRET = "my-secret";  // Secret in code! Committed to Git!

Using .env (✅ Good):
const JWT_SECRET = process.env.JWT_SECRET;  // Secret in .env, not committed
```

---

## Prisma ORM

### What is Prisma?
- **Prisma** = Object-Relational Mapping tool
- Helps manage database with type-safe code
- Generates database client from schema

### Prisma Schema Example:
```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  habits    Habit[]
}

model Habit {
  id              String   @id @default(uuid())
  name            String
  period          String
  completionDates String[]
  user            User     @relation(fields: [userId], references: [id])
  userId          String
  createdAt       DateTime @default(now())
}
```

### Prisma Operations:
```typescript
// Create
const user = await prisma.user.create({
  data: {
    name: 'Iryna',
    email: 'iryna@example.com',
    password: 'hashed-password'
  }
});

// Read
const users = await prisma.user.findMany();
const user = await prisma.user.findUnique({ where: { email: 'iryna@example.com' } });

// Update
const updated = await prisma.user.update({
  where: { id: '123' },
  data: { name: 'Iryna Updated' }
});

// Delete
await prisma.user.delete({ where: { id: '123' } });
```

### Prisma Commands:
```bash
npx prisma init           # Initialize Prisma
npx prisma generate       # Generate Prisma Client
npx prisma migrate dev    # Create database tables
npx prisma studio         # Open database GUI
npx prisma format         # Format schema file
```

### Schema Decorators Explained:
```prisma
model User {
  id        String   @id                 // Primary key (unique identifier)
  email     String   @unique             // Must be unique
  name      String                       // Required field
  isActive  Boolean  @default(true)      // Default value
  createdAt DateTime @default(now())     // Auto-set on creation
  updatedAt DateTime @updatedAt          // Auto-update on change
  
  habits    Habit[]                      // One-to-many relationship
}
```

---

## Database Concepts

### What is a Database?
- **Database** = Organized storage for data
- Stores data permanently (unlike arrays in memory)
- Allows efficient querying and relationships

### SQL vs NoSQL:
```
SQL (Relational)           NoSQL (Document)
─────────────────          ─────────────────
- PostgreSQL              - MongoDB
- MySQL                   - Redis
- Structured tables       - Flexible documents
- Relationships           - Collections
```

### Common Database Operations:
```sql
-- Create table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  name VARCHAR(255)
);

-- Insert data
INSERT INTO users (email, name) VALUES ('iryna@example.com', 'Iryna');

-- Read data
SELECT * FROM users WHERE email = 'iryna@example.com';

-- Update data
UPDATE users SET name = 'Iryna Updated' WHERE id = 1;

-- Delete data
DELETE FROM users WHERE id = 1;
```

---

## React Native Recap

### What is React Native?
- **React Native** = Framework for building mobile apps
- Uses React principles for mobile development
- Write once, run on iOS and Android

### Basic Components:
```typescript
import { View, Text, Button } from 'react-native';

function App() {
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text>Count: {count}</Text>
      <Button 
        title="Increment" 
        onPress={() => setCount(count + 1)} 
      />
    </View>
  );
}
```

### State Management:
```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => {
    setCount(count + 1);  // Update state
  };
  
  return <Text>{count}</Text>;
}
```

---

## Project Structure

### Backend Structure:
```
backend/
├── src/
│   ├── server.ts         # Main server file
│   ├── routes/           # API routes
│   ├── controllers/      # Route handlers
│   └── middleware/       # Custom middleware
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── migrations/       # Database changes
├── .env                  # Environment variables
├── package.json          # Dependencies
└── tsconfig.json         # TypeScript config
```

### Frontend Structure:
```
app/
├── (tabs)/
│   ├── index.tsx         # Main habits screen
│   └── stats.tsx         # Stats screen
├── types/
│   └── Habit.tsx         # Type definitions
├── utils/
│   └── streakUtils.ts    # Helper functions
└── _layout.tsx           # Root layout
```

---

## Key Concepts Summary

### const vs let vs var:
```javascript
const name = 'Iryna';     // Cannot reassign, use for constants
let age = 25;             // Can reassign, use for variables
var city = 'NYC';         // Old way, avoid using
```

### Arrow Functions:
```javascript
// Traditional function
function greet(name) {
  return `Hello ${name}`;
}

// Arrow function
const greet = (name) => {
  return `Hello ${name}`;
};

// Arrow function (implicit return)
const greet = (name) => `Hello ${name}`;
```

### Async/Await:
```javascript
// Promise with .then()
fetch('/api/users')
  .then(res => res.json())
  .then(data => console.log(data));

// Async/await (cleaner)
const fetchUsers = async () => {
  const res = await fetch('/api/users');
  const data = await res.json();
  console.log(data);
};
```

### Template Literals:
```javascript
const name = 'Iryna';
const age = 25;

// Old way
const message = 'My name is ' + name + ' and I am ' + age;

// Template literal (better)
const message = `My name is ${name} and I am ${age}`;
```

---

## Common NPM Scripts

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",    // Development with hot reload
    "build": "tsc",                                    // Compile TypeScript
    "start": "node dist/server.js",                    // Run production build
    "test": "jest"                                     // Run tests
  }
}
```

---

## Useful Commands

### Git Commands:
```bash
git add .                    # Stage all changes
git commit -m "message"      # Commit changes
git push                     # Push to GitHub
git status                   # Check status
git log                      # View commit history
```

### Backend Commands:
```bash
npm install                  # Install dependencies
npm run dev                  # Start development server
npm run build                # Build for production
npx prisma generate          # Generate Prisma client
npx prisma migrate dev       # Create database tables
```

### Frontend Commands:
```bash
npm start                    # Start Expo
npm run ios                  # Run on iOS
npm run android              # Run on Android
```

---

## Important Takeaways

### ✅ DO:
- Use TypeScript for type safety
- Store secrets in .env files
- Commit your code regularly
- Use meaningful variable names
- Comment complex logic
- Test your code

### ❌ DON'T:
- Commit .env files to Git
- Hardcode secrets in code
- Use `var` (use `const` or `let`)
- Ignore error messages
- Skip documentation
- Copy-paste without understanding

---

## Next Steps to Learn

1. **Authentication** - JWT tokens, password hashing
2. **Database Relationships** - Foreign keys, joins
3. **API Design** - RESTful principles, status codes
4. **Error Handling** - Try-catch, error middleware
5. **Testing** - Unit tests, integration tests
6. **Deployment** - Hosting, CI/CD
7. **Security** - Input validation, SQL injection prevention

---

*This cheat sheet will grow as we learn more! Update it regularly.*

