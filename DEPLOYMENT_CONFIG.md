# 🚀 Deployment Configuration Guide

## 📋 Environment Variables Required

### Backend Environment Variables (Set in Vercel Dashboard)

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hms?retryWrites=true&w=majority
DB_NAME=hms

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Configuration
CORS_ORIGIN=https://your-project-name.vercel.app

# Server Configuration
NODE_ENV=production
```

### Frontend Environment Variables (Set in Vercel Dashboard)

```bash
# Backend API URL
VITE_BACKEND_URL=https://your-project-name.vercel.app

# App Configuration
VITE_APP_NAME=TAJPE Hospital Management System
VITE_APP_VERSION=2.0.0
```

## 🔧 Vercel Configuration

### Project Settings
- **Framework Preset**: Other
- **Root Directory**: `./` (root of monorepo)
- **Build Command**: `npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm run install:all`

### Build Configuration
The root `vercel.json` handles:
- Frontend build output to `frontend/dist`
- Backend API routes to `/api/*`
- Security headers and rewrites

## 📁 File Structure for Deployment

```
hospital/
├── frontend/          # React frontend
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   ├── package.json  # Frontend dependencies
│   └── vite.config.js
├── backend/           # Node.js backend
│   ├── routes/       # API routes
│   ├── models/       # Database models
│   ├── middleware/   # Auth middleware
│   ├── package.json  # Backend dependencies
│   └── server.js     # Entry point
├── package.json      # Root monorepo config
├── vercel.json       # Vercel configuration
└── DEPLOYMENT.md     # This guide
```

## 🚀 Deployment Steps

### 1. Database Setup
1. Create MongoDB Atlas cluster
2. Create database named `hms`
3. Get connection string
4. Add IP whitelist (0.0.0.0/0 for all IPs)

### 2. Vercel Deployment
1. Connect GitHub repository: `ashish07-singh/hms`
2. Configure environment variables (see above)
3. Deploy and wait for build completion

### 3. Post-Deployment
1. Test frontend: `https://your-project.vercel.app`
2. Test backend: `https://your-project.vercel.app/api/auth/test`
3. Test admin panel: `/admin/dashboard`
4. Verify chatbot functionality

## 🔐 Admin Access Setup

### Automatic Admin Access
- Register with email ending in `@webarclight.com`
- Automatically gets admin privileges
- Access `/admin/dashboard` after login

### Manual Admin Creation (if needed)
```bash
POST /api/admin/signup
{
  "username": "admin",
  "email": "admin@webarclight.com",
  "password": "securepassword"
}
```

## 🧪 Testing Checklist

- [ ] Frontend loads without errors
- [ ] All pages accessible (Home, Services, About, Contact, Pricing)
- [ ] User registration/login works
- [ ] Chatbot responds to messages
- [ ] Admin panel accessible with @webarclight.com email
- [ ] Contact form submits successfully
- [ ] Mobile responsiveness verified
- [ ] API endpoints return proper responses

## 🚨 Common Issues & Solutions

### Build Failures
```bash
# Local testing
npm run install:all
npm run build
```

### CORS Errors
- Verify `CORS_ORIGIN` matches frontend URL exactly
- Check browser console for CORS errors

### Database Connection
- Verify MongoDB connection string
- Check IP whitelist
- Ensure database `hms` exists

### Admin Access Issues
- Use @webarclight.com email
- Check JWT token in localStorage
- Verify environment variables

## 📊 Monitoring

### Vercel Analytics
- Built-in performance monitoring
- Real-time analytics
- Error tracking

### Database Monitoring
- MongoDB Atlas performance insights
- Connection monitoring
- Query optimization

## 🔄 Updates

### Automatic Updates
- Push to GitHub main branch
- Vercel auto-redeploys
- Monitor build status

### Manual Updates
- Update environment variables in Vercel dashboard
- Redeploy if needed
- Test functionality

---

**Ready for Deployment! 🚀**

Your TAJPE HMS is configured for Vercel monorepo deployment with:
- ✅ Frontend and backend in single repository
- ✅ Proper API routing configuration
- ✅ Security headers and CORS setup
- ✅ Environment variable templates
- ✅ Comprehensive testing checklist
