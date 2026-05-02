# ⚡ TaskFlow — Team Task Manager


> A full-stack Team Task Manager with Role-Based Access Control (Admin/Member), built with Node.js + Express + MongoDB + Vanilla HTML/CSS/JS.

---

## 🌐 Live Demo

### 👉 [https://taskflow-production-e186.up.railway.app](https://taskflow-production-e186.up.railway.app)

---

## ✅ Features

- 🔐 **JWT Authentication** — Secure Login & Register
- 👥 **Role-Based Access Control** — Admin & Member roles
- 📁 **Project Management** — Create projects, add/remove members
- ✅ **Task Management** — Create, assign, update & delete tasks
- 📊 **Dashboard** — Stats: total tasks, completed, overdue, projects
- 🎯 **Task Status** — Todo / In Progress / Done
- 🔥 **Priority Levels** — Low / Medium / High
- 📅 **Due Date Tracking** — Overdue warnings
- 🌙 **Dark UI** — Clean, responsive design

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Tokens) |
| Frontend | Vanilla HTML + CSS + JavaScript |
| Deployment | Railway |

---

## 📁 Project Structure
taskflow/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── tasks.js
│   │   └── users.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
├── index.html
├── dashboard.html
├── projects.html
├── tasks.html
└── style.css


👨‍💻 Author

Ritik Ranjan
B.Tech IT Student | Full Stack Developer