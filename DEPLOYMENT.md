# 🚀 Vercel Deployment Guide

## Prerequisites
- Vercel account (free at vercel.com)
- MongoDB Atlas account (free tier available)
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Prepare Your Database

### MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Add your IP address to the whitelist (or use 0.0.0.0/0 for all IPs)

## Step 2: Deploy Backend to Vercel

### 1. Push Backend to GitHub
```bash
cd backend
git init
git add .
git commit -m "Initial backend commit"
git remote add origin https://github.com/yourusername/hospital-backend.git
git push -u origin main
```

### 2. Deploy Backend on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your backend repository
4. Configure environment variables:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hms?retryWrites=true&w=majority
   DB_NAME=hms
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ```
5. Deploy

### 3. Get Backend URL
- Your backend will be deployed to: `https://your-backend-name.vercel.app`

## Step 3: Deploy Frontend to Vercel

### 1. Update Frontend Environment
Create `.env` file in frontend folder:
```
VITE_BACKEND_URL=https://your-backend-name.vercel.app
VITE_APP_NAME=Hospital Management System
```

### 2. Push Frontend to GitHub
```bash
cd frontend
git init
git add .
git commit -m "Initial frontend commit"
git remote add origin https://github.com/yourusername/hospital-frontend.git
git push -u origin main
```

### 3. Deploy Frontend on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your frontend repository
4. Configure environment variables:
   ```
   VITE_BACKEND_URL=https://your-backend-name.vercel.app
   VITE_APP_NAME=Hospital Management System
   ```
5. Deploy

## Step 4: Update CORS in Backend

After frontend deployment, update the backend CORS_ORIGIN:
```
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

## Step 5: Test Your Deployment

### Test URLs:
- Frontend: `https://your-frontend-domain.vercel.app`
- Admin Panel: `https://your-frontend-domain.vercel.app/admin/dashboard`
- Backend API: `https://your-backend-name.vercel.app`

### Test Features:
1. User registration/login
2. Chatbot functionality
3. Admin panel access (use @webarclight.com email)
4. Contact form
5. All pages and navigation

## Environment Variables Summary

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hms?retryWrites=true&w=majority
DB_NAME=hms
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

### Frontend (.env)
```
VITE_BACKEND_URL=https://your-backend-name.vercel.app
VITE_APP_NAME=Hospital Management System
```

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure CORS_ORIGIN matches your frontend URL exactly
2. **Database Connection**: Check MongoDB Atlas connection string and IP whitelist
3. **Build Errors**: Ensure all dependencies are in package.json
4. **Environment Variables**: Double-check all variables are set in Vercel dashboard

### Support:
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Documentation: https://docs.atlas.mongodb.com

## Security Notes
- Change JWT_SECRET to a strong, unique key
- Use environment variables for all sensitive data
- Enable MongoDB Atlas security features
- Consider adding rate limiting for production 