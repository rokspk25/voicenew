# Netlify Deployment Guide

This guide will help you deploy the VoicePay app to Netlify.

## Prerequisites

1. A GitHub account
2. A Netlify account (free tier works fine)
3. Git installed on your machine

## Deployment Steps

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select your repository
   - Netlify will automatically detect the build settings from `netlify.toml`:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

3. **Wait for deployment:**
   - Netlify will install dependencies and build your app
   - The site will be live at `https://your-site-name.netlify.app`

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

## Configuration Files

The following files are configured for Netlify:

- **`netlify.toml`**: Build configuration and redirects
- **`public/_redirects`**: SPA routing support (redirects all routes to index.html)

## Important Notes

- The app uses React Router with BrowserRouter, which requires the `_redirects` file for client-side routing to work correctly
- All routes will redirect to `index.html` to support SPA navigation
- The build output directory is `dist` (Vite's default)
- Node.js version 18 is specified in the build environment

## Troubleshooting

### Build Fails
- Ensure all dependencies are listed in `package.json`
- Check that Node.js version is compatible (18+)
- Review build logs in Netlify dashboard

### Routes Not Working
- Verify `public/_redirects` file exists and contains `/*    /index.html   200`
- Check that `netlify.toml` has the redirects section

### Microphone Permission Issues
- The Web Speech API requires HTTPS in production
- Netlify provides HTTPS by default
- Users will need to grant microphone permission in their browser

## Environment Variables

If you need to add environment variables:
1. Go to Netlify Dashboard → Site settings → Environment variables
2. Add your variables
3. Redeploy the site

## Custom Domain

To add a custom domain:
1. Go to Netlify Dashboard → Domain settings
2. Add your custom domain
3. Follow DNS configuration instructions

