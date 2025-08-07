# Medicare Hospital Web App

A full-stack hospital management web application built with React (frontend) and Node.js/Express (backend), using MongoDB Atlas for data storage.

## Features

- User registration and login (JWT authentication)
- Contact form
- Services, Gallery, About, and more
- Simple chatbot for user queries
- Responsive UI

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/ashish07-singh/hospital.git
   cd hospital
   ```

2. **Backend setup:**
   ```sh
   cd backend
   npm install
   # Create a .env file (see .env.example)
   npm run dev
   ```

3. **Frontend setup:**
   ```sh
   cd ../frontend
   npm install
   # Create a .env file (see .env.example)
   npm run dev
   ```

4. **Environment Variables:**

   - **backend/.env**
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     FRONTEND_URL=http://localhost:5173
     PORT=5000
     ```

   - **frontend/.env**
     ```
     VITE_BACKEND_URL=http://localhost:5000
     ```

5. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:5000](http://localhost:5000)
   - admin: [http://localhost:5000/admin](http://localhost:5000/admin)


## License

MIT
