# IT Helpdesk Response Library

A full-stack IT Helpdesk web application built with the **MEVN stack** (MongoDB, Express.js, Vue.js 3, Node.js). Developed as coursework for COMP1842 Web Programming 2 at the University of Greenwich.

---

## Overview

The system allows employees to search a self-help knowledge base for common IT issues, submit support tickets when self-help fails, and take an auto-generated training quiz. Administrators can manage the knowledge base, reply to tickets, and view analytics.

### User Roles

| Role | Access |
|------|--------|
| **Admin** | Full CRUD on knowledge base, ticket management, analytics dashboard |
| **Staff** | Browse knowledge base, submit tickets, take the training quiz |
| **User** | Browse knowledge base, submit tickets |

---

## Features

- **Live search & category filtering** — searches key and value fields in real time
- **Rich text editor** — Quill editor for formatted article content (bold, lists, images)
- **Support ticket system** — users submit tickets; admins view and reply
- **Analytics dashboard** — Chart.js pie and bar charts showing ticket status and article distribution
- **Training quiz** — auto-generated from live knowledge base data
- **User authentication** — bcrypt password hashing, role-based navigation
- **Toast notifications** — instant feedback on all actions

---

## Tech Stack

**Backend**
- Node.js + Express 
- MongoDB (local) + Mongoose 
- bcryptjs — password hashing
- cors

**Frontend**
- Vue 3 + Vite 7
- Vue Router 5
- Bootstrap 5.3
- Chart.js 4 + vue-chartjs
- Quill (@vueup/vue-quill)
- vue3-toastify

---

## 📁 Project Structure

```
CW-IThelpdesk/
├── server/                         # Express backend
│   ├── server.js                   # Entry point
│   └── api/
│       ├── controllers/
│       │   ├── authController.js   # Register & login
│       │   ├── responseController.js # CRUD for articles
│       │   └── ticketController.js # Ticket management
│       ├── models/
│       │   ├── HelpdeskResponse.js # Article schema
│       │   ├── Ticket.js           # Ticket schema
│       │   └── User.js             # User schema + bcrypt hook
│       └── routes/
│           ├── authRoutes.js
│           ├── responseRoutes.js
│           └── ticketRoutes.js
│
└── front-end/                      # Vue 3 frontend
    └── src/
        ├── main.js                 # App entry point
        ├── router.js               # Vue Router config
        ├── App.vue                 # Root layout
        ├── helpers/
        │   └── api.js              # Centralised fetch calls
        ├── components/
        │   ├── Navbar.vue
        │   ├── ArticleCard.vue
        │   ├── AdminArticleTab.vue # Core CRUD component
        │   ├── AdminAnalyticsTab.vue
        │   ├── AdminTicketTab.vue
        │   ├── TicketForm.vue
        │   └── TicketList.vue
        └── views/
            ├── HomeView.vue        # Public knowledge base
            ├── LoginView.vue
            ├── AdminDashboardView.vue
            ├── UserDashboardView.vue
            ├── QuizView.vue
            └── IssueDetailView.vue
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on port 27017

### 1. Clone the repository

```bash
git clone https://github.com/your-username/CW-IThelpdesk.git
cd CW-IThelpdesk
```

### 2. Start the backend

```bash
cd server
npm install
node server.js
```

You should see:
```
Server is running on http://localhost:3000
Successfully connected to MongoDB Compass!
```

### 3. Start the frontend

Open a **second terminal**:

```bash
cd front-end
npm install
npm run dev
```

You should see:
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### 4. Open the app

Visit **http://localhost:5173** in your browser.

---

## First-Time Setup

The database starts empty. You need to create an admin account first.

1. Go to **http://localhost:5173/login**
2. Click **"Sign up now"**
3. Register with any username and password

> **Note:** New accounts default to the `user` role. To make an account an admin, open **MongoDB Compass**, connect to `localhost:27017`, open the `helpdeskDB` database → `users` collection, and manually change the `role` field to `"admin"`.

Then log in with your admin account and start adding articles from the **Admin Dashboard → Manage Articles** tab.

---

## API Endpoints

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/responses` | Get all articles |
| GET | `/api/responses/:id` | Get one article |
| POST | `/api/responses` | Create article |
| PUT | `/api/responses/:id` | Update article |
| DELETE | `/api/responses/:id` | Delete article |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new user |
| POST | `/api/login` | Login |

### Tickets

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tickets` | Create ticket |
| GET | `/api/tickets` | Get all tickets (admin) |
| GET | `/api/tickets/user/:userId` | Get user's own tickets |
| PUT | `/api/tickets/:id/reply` | Admin reply to ticket |

---

## Screenshots

| Page | Description |
|------|-------------|
| Homepage | Public knowledge base with live search |
| Admin Dashboard | Analytics, article CRUD, ticket management |
| Training Quiz | Auto-generated from live data |
| User Dashboard | Submit and track support tickets |

---

## Environment Notes

- The MongoDB connection string is hardcoded to `mongodb://127.0.0.1:27017/helpdeskDB` in `server/server.js`. Change this if your MongoDB runs on a different host or port.
- The frontend API base URL is hardcoded to `http://localhost:3000` in `front-end/src/helpers/api.js`. Update this if deploying to a remote server.

---

## Author

**Ho The Hung** - GCC230015 - 001420372
University of Greenwich — COMP1842 Web Programming 2