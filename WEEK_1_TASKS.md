# 📅 Week 1: Backend Foundation Setup

**Goal**: Create backend infrastructure and basic API

**Time Commitment**: 10 hours (2 hours daily)
**Focus**: Backend development basics

---

## 🎯 Daily Tasks

### **Day 1: Choose Tech Stack & Setup Environment**
**Time**: 2 hours
**Focus**: Backend technology decisions

**Tasks:**
- [ ] Research backend options (Next.js vs Express)
- [ ] Choose database (PostgreSQL vs MongoDB)
- [ ] Set up development environment
- [ ] Create backend project structure
- [ ] Install necessary dependencies
- [ ] Test basic setup

**Learning Goals:**
- Understand different backend approaches
- Learn about database options
- Set up development workflow

**Deliverables:**
- Backend project created
- Dependencies installed
- Basic setup working

---

### **Day 2: Database Design & Schema**
**Time**: 2 hours
**Focus**: Database design principles

**Tasks:**
- [ ] Design user table schema
- [ ] Design habit table schema
- [ ] Design circle table schema
- [ ] Design relationships between tables
- [ ] Create database migration files
- [ ] Test database connection

**Learning Goals:**
- Understand database design
- Learn about table relationships
- Practice schema design

**Deliverables:**
- Database schema designed
- Migration files created
- Database connection working

---

### **Day 3: Basic API Endpoints**
**Time**: 2 hours
**Focus**: API development basics

**Tasks:**
- [ ] Create user CRUD endpoints
- [ ] Create habit CRUD endpoints
- [ ] Add input validation
- [ ] Add error handling
- [ ] Test endpoints with Postman
- [ ] Document API endpoints

**Learning Goals:**
- Understand RESTful API design
- Learn about HTTP methods
- Practice API development

**Deliverables:**
- Basic API endpoints working
- Input validation implemented
- API documentation started

---

### **Day 4: Authentication System**
**Time**: 2 hours
**Focus**: Authentication concepts

**Tasks:**
- [ ] Implement JWT token generation
- [ ] Create login endpoint
- [ ] Create registration endpoint
- [ ] Add password hashing
- [ ] Add token validation middleware
- [ ] Test authentication flow

**Learning Goals:**
- Understand JWT tokens
- Learn about password security
- Practice authentication implementation

**Deliverables:**
- Authentication system working
- JWT tokens implemented
- Login/registration working

---

### **Day 5: Testing & Documentation**
**Time**: 2 hours
**Focus**: Testing and documentation

**Tasks:**
- [ ] Write unit tests for API endpoints
- [ ] Test authentication flows
- [ ] Test database operations
- [ ] Complete API documentation
- [ ] Fix any bugs found
- [ ] Prepare for Week 2

**Learning Goals:**
- Understand testing strategies
- Learn about API documentation
- Practice debugging skills

**Deliverables:**
- Test suite working
- API documentation complete
- Week 1 goals achieved

---

## 🛠️ Technical Implementation

### **Backend Stack**
```typescript
// Recommended tech stack
- Runtime: Node.js 18+
- Framework: Express.js
- Database: PostgreSQL
- ORM: Prisma
- Authentication: JWT
- Testing: Jest
- Documentation: Swagger
```

### **Project Structure**
```
backend/
├── src/
│   ├── controllers/     # API route handlers
│   ├── models/         # Database models
│   ├── middleware/     # Custom middleware
│   ├── routes/         # API routes
│   ├── utils/          # Helper functions
│   └── app.js          # Express app setup
├── prisma/
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Database migrations
├── tests/              # Test files
├── docs/               # API documentation
└── package.json
```

### **Database Schema**
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Habits table
CREATE TABLE habits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  period VARCHAR(20) NOT NULL,
  completion_dates TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Circles table
CREATE TABLE circles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎯 Success Criteria

### **Technical Success**
- [ ] Backend server runs without errors
- [ ] Database connection works
- [ ] API endpoints respond correctly
- [ ] Authentication system works
- [ ] Tests pass

### **Learning Success**
- [ ] Understand backend development
- [ ] Know how to design databases
- [ ] Can create API endpoints
- [ ] Understand authentication
- [ ] Can write tests

### **Project Success**
- [ ] Week 1 goals completed
- [ ] Ready for Week 2
- [ ] Documentation complete
- [ ] Code is clean and organized

---

## 🚀 Getting Started

### **Immediate Next Steps**
1. **Create backend project** (30 minutes)
2. **Set up database** (30 minutes)
3. **Create first API endpoint** (30 minutes)
4. **Test everything** (30 minutes)

### **Daily Workflow**
1. **Review yesterday's work** (15 minutes)
2. **Learn new concept** (30 minutes)
3. **Implement feature** (60 minutes)
4. **Test and debug** (15 minutes)

---

## 📞 Support & Questions

### **When to Ask for Help**
- **Stuck for more than 30 minutes** - Ask for guidance
- **Error messages you don't understand** - Share the error
- **Concept you don't understand** - Ask for explanation
- **Implementation approach** - Discuss options

### **How to Ask for Help**
1. **Describe what you're trying to do**
2. **Show what you've tried**
3. **Include error messages**
4. **Ask specific questions**

---

*This is your learning journey - embrace the challenges and celebrate the wins!* 🚀
