# 🚀 Vercel Deployment Guide - TAJPE HMS

## 📋 Prerequisites
- Vercel account (free at vercel.com)
- MongoDB Atlas account (free tier available)
- GitHub repository: https://github.com/ashish07-singh/hms.git
- Node.js 18+ installed locally

## 🏗️ Project Structure
This is a **monorepo** containing both frontend and backend:
```
hospital/
├── frontend/          # React.js frontend
├── backend/           # Node.js/Express backend
├── package.json       # Root package.json for monorepo
└── vercel.json        # Vercel configuration
```

## 🚀 Step 1: Prepare Your Database

### MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)
6. Create a database named `hms`

## 🚀 Step 2: Deploy to Vercel (Monorepo)

### 1. Connect GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `ashish07-singh/hms`
4. Vercel will automatically detect it's a monorepo

### 2. Configure Project Settings
- **Framework Preset**: Other
- **Root Directory**: `./` (root of monorepo)
- **Build Command**: `npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `npm run install:all`

### 3. Configure Environment Variables
Add these in Vercel dashboard:

#### Backend Environment Variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hms?retryWrites=true&w=majority
DB_NAME=hms
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

#### Frontend Environment Variables:
```
VITE_BACKEND_URL=https://your-backend-name.vercel.app
VITE_APP_NAME=TAJPE Hospital Management System
```

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## 🔧 Step 3: Configure Vercel Functions

### Backend API Routes
Vercel will automatically create serverless functions from your backend routes:
- `/api/auth/*` - Authentication endpoints
- `/api/admin/*` - Admin panel endpoints  
- `/api/chatbot/*` - Chatbot endpoints
- `/api/contact/*` - Contact form endpoints

### Verify Backend Deployment
Your backend API will be available at:
`https://your-project-name.vercel.app/api/*`

## 🌐 Step 4: Update Frontend Environment

After deployment, update your frontend environment:
1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Update `VITE_BACKEND_URL` to match your deployed backend URL
3. Redeploy if needed

## 🧪 Step 5: Test Your Deployment

### Test URLs:
- **Frontend**: `https://your-project-name.vercel.app`
- **Admin Panel**: `https://your-project-name.vercel.app/admin/dashboard`
- **Backend API**: `https://your-project-name.vercel.app/api/*`

### Test Features:
1. ✅ **Website Pages**: Home, Services, About, Contact, Pricing
2. ✅ **User Registration/Login**: Regular user accounts
3. ✅ **Chatbot**: Live chat functionality
4. ✅ **Admin Panel**: Access with @webarclight.com email
5. ✅ **Contact Form**: Message submission
6. ✅ **Responsive Design**: Mobile and desktop

## 🔐 Step 6: Admin Access Setup

### Create Admin Account
1. Register with an email ending in `@webarclight.com`
2. This automatically grants admin access
3. Login and access `/admin/dashboard`

### Alternative Admin Creation
If you need to create an admin manually:
```bash
# Use the admin signup endpoint
POST /api/admin/signup
{
  "username": "admin",
  "email": "admin@webarclight.com", 
  "password": "securepassword"
}
```

## 📱 Step 7: Mobile & PWA Features

### Progressive Web App
- Installable on mobile devices
- Offline functionality
- Push notifications (if configured)

### Mobile Responsiveness
- Optimized for all screen sizes
- Touch-friendly interface
- Fast loading on mobile networks

## 🔒 Security & Production

### Environment Variables
- ✅ JWT_SECRET: Strong, unique key
- ✅ MONGODB_URI: Secure database connection
- ✅ CORS_ORIGIN: Restricted to your domain

### Security Features
- ✅ JWT authentication
- ✅ Protected admin routes
- ✅ Input validation
- ✅ CORS protection
- ✅ Rate limiting (built into Vercel)

## 🚨 Troubleshooting

### Common Issues:

#### 1. Build Failures
```bash
# Check dependencies
npm run install:all
npm run build
```

#### 2. CORS Errors
- Verify `CORS_ORIGIN` matches your frontend URL exactly
- Check browser console for CORS errors

#### 3. Database Connection
- Verify MongoDB Atlas connection string
- Check IP whitelist (0.0.0.0/0 for all IPs)
- Ensure database `hms` exists

#### 4. Admin Access Issues
- Use @webarclight.com email for admin access
- Check JWT token in localStorage
- Verify backend environment variables

### Debug Commands
```bash
# Local testing
npm run dev          # Start both frontend and backend
npm run dev:frontend # Frontend only
npm run dev:backend  # Backend only

# Build testing
npm run build        # Test build process
npm run start        # Test production build
```

## 📊 Monitoring & Analytics

### Vercel Analytics
- Built-in performance monitoring
- Real-time analytics
- Error tracking

### Database Monitoring
- MongoDB Atlas performance insights
- Query optimization
- Connection monitoring

## 🔄 Updates & Maintenance

### Deploying Updates
1. Push changes to GitHub main branch
2. Vercel automatically redeploys
3. Monitor build status and logs

### Environment Variable Updates
1. Update in Vercel dashboard
2. Redeploy if needed
3. Test functionality

## 📞 Support & Resources

### Documentation
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)

### Community
- Vercel Community: https://github.com/vercel/vercel/discussions
- MongoDB Community: https://community.mongodb.com

## 🎯 Success Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Database connected and working
- [ ] Frontend deployed and accessible
- [ ] Backend API endpoints working
- [ ] Admin panel accessible
- [ ] Chatbot functionality working
- [ ] All website pages loading
- [ ] Mobile responsiveness verified
- [ ] Security measures in place

## 🚀 Ready to Deploy!

Your TAJPE Hospital Management System is now ready for production deployment. The monorepo structure ensures both frontend and backend are deployed together with proper configuration.

**Next Steps:**
1. Deploy to Vercel using the steps above
2. Test all functionality
3. Configure custom domain (optional)
4. Set up monitoring and alerts
5. Go live! 🎉

---

**Last Updated**: December 2024  
**Version**: 2.0 - Monorepo Deployment  
**Project**: TAJPE HMS Consulting Website 