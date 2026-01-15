# 🚀 Deployment Guide - Get Your Public Website URL

Follow these simple steps to deploy your Flight Price Tracker and get a public web address.

## 🎯 Easiest Method: Railway (5 minutes)

Railway can deploy your app directly from GitHub with just a few clicks.

### Backend Deployment (API Server)

1. **Go to Railway**: https://railway.app/
2. **Sign up/Login** (use your GitHub account for easiest setup)
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**: `MAPASOST/TravelInfo`
6. **Choose branch**: `claude/flight-price-tracker-VmimY`
7. **Add root directory**: Enter `backend` as the root directory
8. **Deploy** - Railway will automatically detect it's a Node.js app
9. **Once deployed, click on your service** and find the public URL (looks like: `https://backend-production-xxxx.up.railway.app`)
10. **Copy this URL** - you'll need it for the frontend!

### Frontend Deployment (Website)

1. **In Railway, click "New"** to add another service to the same project
2. **Select "Deploy from GitHub repo"** again
3. **Choose the same repository**: `MAPASOST/TravelInfo`
4. **Add root directory**: Enter `frontend` as the root directory
5. **Add Environment Variable**:
   - Click on the frontend service
   - Go to "Variables" tab
   - Add variable:
     - Name: `NEXT_PUBLIC_API_URL`
     - Value: (paste the backend URL from step 9 above)
6. **Deploy**
7. **Get your public URL** - Railway will provide a URL like: `https://frontend-production-xxxx.up.railway.app`

🎉 **That's it!** Visit your frontend URL and your app is live!

---

## 🌐 Alternative: Vercel (Frontend) + Render (Backend)

If you prefer Vercel for the frontend:

### Backend on Render

1. Go to https://render.com/
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your `MAPASOST/TravelInfo` repository
5. Configure:
   - **Name**: flight-tracker-api
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click "Create Web Service"
7. Copy your backend URL (like `https://flight-tracker-api.onrender.com`)

### Frontend on Vercel

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click "Add New..." → "Project"
4. Import `MAPASOST/TravelInfo`
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Environment Variables**:
     - `NEXT_PUBLIC_API_URL` = (your Render backend URL)
6. Click "Deploy"
7. Visit your Vercel URL!

---

## 💡 Quick Comparison

| Service | Best For | Free Tier | Speed |
|---------|----------|-----------|-------|
| Railway | Full-stack apps | ✅ $5 credit/month | ⚡ Fastest setup |
| Vercel | Next.js frontend | ✅ Generous | ⚡ Very fast |
| Render | Backend APIs | ✅ 750 hours/month | 🐢 Slower cold starts |

---

## 🔧 After Deployment

Once deployed, you can:
- Share your public URL with anyone
- Access it from any device
- It will stay online 24/7
- Railway/Vercel automatically redeploy when you push to GitHub

## 🆘 Troubleshooting

**Frontend can't connect to backend?**
- Make sure `NEXT_PUBLIC_API_URL` environment variable is set correctly
- Include the full URL with `https://`
- Redeploy frontend after changing environment variables

**Backend not working?**
- Check the logs in Railway/Render dashboard
- Make sure the start command is `npm start` or `node src/server.js`

---

**Need help?** Check the service's documentation:
- Railway: https://docs.railway.app/
- Vercel: https://vercel.com/docs
- Render: https://render.com/docs
