# WarmPro API Backend

This is the Express backend for the WarmPro Installer App.

## Setup Locally
```bash
npm install
npm start
```

## Deployment (Recommended: Render)
1. Go to [https://render.com](https://render.com)
2. Click **"New +"** → **Web Service**
3. Connect your GitHub repo
4. Use these settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Node Version:** `18`
5. Click Deploy

Once deployed, update your frontend to use your Render URL.
