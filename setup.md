# Hospital Management System Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Quick Setup

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Environment Setup

#### Backend (.env file in backend folder)
Create a `.env` file in the `backend` folder with:
```
MONGODB_URI=mongodb://localhost:27017
DB_NAME=hms
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

#### Frontend (.env file in frontend folder)
Create a `.env` file in the `frontend` folder with:
```
VITE_BACKEND_URL=http://localhost:5000
VITE_APP_NAME=Hospital Management System
```

### 3. Start Development Servers

#### Option 1: Start both servers together
```bash
npm run dev
```

#### Option 2: Start servers separately
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Admin Dashboard: http://localhost:5173/admin/dashboard

## Features

### Chatbot
- Quick reply buttons for common questions
- Email-based routing:
  - `@webarclight.com` → Admin access
  - `@gmail.com` → Regular user access
- Auto-responses for keywords
- Default message appears only once per session

### Admin Panel
- Access via `/admin/dashboard`
- View and respond to chat messages
- Manage users
- Real-time updates

### User Features
- Registration and login
- Contact form
- Chat with support team
- Gallery and services pages

## Security Features
- JWT-based authentication
- Admin route protection
- Password hashing
- CORS configuration

## Database Collections
- `users` - Regular user accounts
- `admins` - Admin user accounts  
- `chats` - Chat sessions and messages
- `contacts` - Contact form submissions 