# SUB v1 – Fast & Private Web Proxy

Modern anonymous web proxy service with clean UI and robust backend.

## Features
- Unblock YouTube, Twitter/X, Reddit, Instagram, TikTok, etc.
- Full HTTPS support (CONNECT tunneling)
- No logs (client-side only tracking disabled)
- Beautiful dark/neon UI with custom background
- Quick access buttons
- Rate limiting & basic security headers
- Easy local / Docker / Netlify / Vercel deploy

## Quick Start (Local)

```bash
# Backend
cd backend
npm install
npm start                # runs on http://localhost:3000

# Frontend (open in browser)
open frontend/public/index.html
# or serve it: npx serve frontend/public -p 8080
