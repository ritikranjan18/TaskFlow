# ⚡ TaskFlow — Team Task Manager

Full-stack task management app with role-based access control.

**Stack:** Node.js + Express + MongoDB + Vanilla HTML/CSS/JS

---

## 🚀 Local Setup (VS Code mein kaise chalao)

### Step 1: Prerequisites
- Node.js v18+ install karo: https://nodejs.org
- MongoDB Atlas free account: https://cloud.mongodb.com
  - New cluster banao → Connect → Get your connection string

### Step 2: Project Clone / Download
```bash
# Agar git se clone kar rahe ho:
git clone https://github.com/YOUR_USERNAME/taskflow.git
cd taskflow
```

### Step 3: Backend Setup
```bash
cd backend

# Dependencies install karo
npm install

# .env file banao
cp .env.example .env
```

Phir `.env` file kholo aur apni MongoDB URI dalo:
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow
JWT_SECRET=koi_bhi_random_string_daal_do
```

### Step 4: Server Start Karo
```bash
# Development mode (auto-restart on change)
npm run dev

# Ya production mode
npm start
```

**Server chalega:** http://localhost:5000

### Step 5: Browser mein kholo
App automatically frontend serve karta hai:
- http://localhost:5000 → Login/Register
- http://localhost:5000/dashboard.html → Dashboard
- http://localhost:5000/projects.html → Projects
- http://localhost:5000/tasks.html → My Tasks

---

## 📁 Folder Structure

```
taskflow/
├── backend/
│   ├── middleware/
│   │   └── auth.js          ← JWT verify + role check
│   ├── models/
│   │   ├── User.js          ← User schema (name, email, password, role)
│   │   ├── Project.js       ← Project schema (name, owner, members)
│   │   └── Task.js          ← Task schema (title, status, priority, assignee)
│   ├── routes/
│   │   ├── auth.js          ← POST /api/auth/login & /register
│   │   ├── projects.js      ← CRUD + member management
│   │   ├── tasks.js         ← CRUD + filters
│   │   └── users.js         ← Profile, search, role change
│   ├── .env.example
│   ├── package.json
│   └── server.js            ← Main entry point
└── frontend/
    ├── index.html           ← Login / Register
    ├── dashboard.html       ← Stats + my tasks
    ├── projects.html        ← All projects + member management
    ├── tasks.html           ← Project tasks + create/edit
    └── style.css            ← All styles
```

---

## 🔑 API Endpoints

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login + get JWT |
| GET | /api/users/me | Auth | Own profile + stats |
| GET | /api/users/search?q= | Auth | Search users |
| GET | /api/users | Admin | All users |
| PUT | /api/users/:id/role | Admin | Change user role |
| GET | /api/projects | Auth | My projects |
| POST | /api/projects | Auth | Create project |
| PUT | /api/projects/:id | Owner | Update project |
| DELETE | /api/projects/:id | Owner | Delete project |
| POST | /api/projects/:id/members | Owner | Add member |
| DELETE | /api/projects/:id/members/:uid | Owner | Remove member |
| GET | /api/tasks?project=id | Member | Project tasks |
| GET | /api/tasks/my | Auth | My assigned tasks |
| POST | /api/tasks | Member | Create task |
| PUT | /api/tasks/:id | Member | Update task |
| DELETE | /api/tasks/:id | Creator/Admin | Delete task |

---

## 🌐 Railway pe Deploy Kaise Karo

### Step 1: GitHub pe push karo
```bash
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/YOUR_USERNAME/taskflow.git
git push -u origin main
```

### Step 2: Railway Setup
1. Railway.app pe jao → New Project → Deploy from GitHub
2. Apna repo select karo
3. **Root Directory** set karo: `backend`
4. **Start Command:** `npm start`

### Step 3: Environment Variables (Railway Dashboard mein)
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
NODE_ENV=production
```

### Step 4: Frontend ke liye Static Path
Railway pe backend se frontend serve ho raha hai automatically.
Frontend files `/frontend` folder mein hain, server.js unhe serve karta hai.

> ⚠️ Ek zaroori cheez: Railway mein deploy karte waqt root directory `backend` set karo, aur `frontend` folder bhi saath mein upload hona chahiye (pura repo push karo).

---

## 👥 Roles

| Role | Can Do |
|------|--------|
| **Admin** | All users dekh sakte hain, kisi bhi task delete kar sakte hain, roles change kar sakte hain |
| **Member** | Apne projects banao, tasks create karo, assigned tasks dekho |
| **Project Owner** | Members add/remove karo (owner woh hota hai jo project banata hai) |

---

## ✅ Features

- JWT-based Authentication (Login/Register)
- Role-Based Access Control (Admin / Member)  
- Project creation with member management
- Task creation with status (todo/in_progress/done) and priority (low/medium/high)
- Task assignment to project members
- Due date tracking with overdue warnings
- Dashboard with stats (total tasks, completed, overdue, projects)
- Filter tasks by status
- Clean dark UI — no frameworks needed
