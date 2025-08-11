# 🏥 TAJPE Hospital Management System

A comprehensive **Hospital Management System consulting website** showcasing TAJPE's 42+ modules and services. Built with React (frontend) and Node.js/Express (backend), featuring a live chatbot and admin dashboard.

## ✨ Features

### 🌐 Website
- **Home**: Hero section, statistics, features overview
- **Services**: 12 comprehensive HMS modules with detailed descriptions
- **About**: Company story, milestones, mission/vision
- **Contact**: Contact form and client testimonials
- **Pricing**: Module comparison across different versions
- **Responsive Design**: Mobile-first, touch-friendly interface

### 💬 Live Chat System
- **Chatbot**: Automated responses for common queries
- **Admin Dashboard**: Real-time chat management
- **User Support**: Anonymous and registered user support
- **Smart Polling**: Auto-refresh for new messages

### 🔐 Authentication & Admin
- **User Registration/Login**: JWT-based authentication
- **Admin Panel**: Protected dashboard for support staff
- **Role-based Access**: @webarclight.com emails get admin access
- **Chat Management**: Status tracking, priority assignment, archiving

### 📱 Progressive Web App
- **Mobile Optimized**: Responsive design for all devices
- **Fast Loading**: Optimized assets and lazy loading
- **Offline Ready**: Service worker support

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB Atlas with Mongoose ODM
- **Authentication**: JWT tokens
- **Deployment**: Vercel (monorepo)
- **Real-time**: Smart polling system

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ashish07-singh/hms.git
   cd hms
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables:**
   
   **Backend (.env):**
   ```bash
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hms
   DB_NAME=hms
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=http://localhost:5173
   ```
   
   **Frontend (.env):**
   ```bash
   VITE_BACKEND_URL=http://localhost:5000
   VITE_APP_NAME=TAJPE Hospital Management System
   ```

4. **Start development servers:**
   ```bash
   # Start both frontend and backend
   npm run dev
   
   # Or start individually
   npm run dev:frontend  # Frontend only
   npm run dev:backend   # Backend only
   ```

5. **Access the application:**
   - 🌐 **Website**: [http://localhost:5173](http://localhost:5173)
   - 🔐 **Admin Panel**: [http://localhost:5173/admin/dashboard](http://localhost:5173/admin/dashboard)
   - 📡 **API**: [http://localhost:5000](http://localhost:5000)

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. **Push to GitHub**: Your code is already in `ashish07-singh/hms`
2. **Connect to Vercel**: Import the repository
3. **Configure Environment**: Set variables in Vercel dashboard
4. **Deploy**: Automatic deployment on every push

### Manual Deployment
See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🔐 Admin Access

### Automatic Admin Access
- Register with any email ending in `@webarclight.com`
- Automatically gets admin privileges
- Access `/admin/dashboard` after login

### Manual Admin Creation
```bash
POST /api/admin/signup
{
  "username": "admin",
  "email": "admin@webarclight.com",
  "password": "securepassword"
}
```

## 📁 Project Structure

```
hms/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   └── App.jsx         # Main app component
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
├── backend/                 # Node.js backend
│   ├── routes/             # API route handlers
│   ├── models/             # Database models
│   ├── middleware/         # Authentication middleware
│   └── server.js           # Server entry point
├── package.json            # Root monorepo config
├── vercel.json            # Vercel configuration
└── DEPLOYMENT.md          # Deployment guide
```

## 🧪 Testing

### Local Testing
```bash
# Test build process
npm run build

# Test production build
npm run start

# Run specific tests
npm run test:frontend
npm run test:backend
```

### Feature Testing
- [ ] Website pages load correctly
- [ ] User registration/login works
- [ ] Chatbot responds to messages
- [ ] Admin panel accessible
- [ ] Contact form submits
- [ ] Mobile responsiveness
- [ ] API endpoints work

## 🔧 Available Scripts

```bash
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only
npm run install:all      # Install all dependencies
npm run build            # Build frontend for production
npm run start            # Start production backend
npm run deploy           # Run deployment script
```

## 📊 Monitoring & Analytics

- **Vercel Analytics**: Built-in performance monitoring
- **MongoDB Atlas**: Database performance insights
- **Error Tracking**: Automatic error logging
- **Performance**: Core Web Vitals monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- **Documentation**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Configuration**: [DEPLOYMENT_CONFIG.md](DEPLOYMENT_CONFIG.md)
- **Issues**: GitHub Issues
- **Deployment**: Vercel Dashboard

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for TAJPE Hospital Management System**

**Last Updated**: December 2024  
**Version**: 2.0.0  
**Status**: Production Ready 🚀
