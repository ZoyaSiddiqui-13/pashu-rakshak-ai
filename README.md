# PASHU-RAKSHAK AI — 10/10 Production-Ready Build

A mobile-first livestock health surveillance and farm management platform.

## Architecture
- React + Vite frontend
- Express + MongoDB/Mongoose backend
- JWT authentication + bcrypt password hashing
- Exactly two public login roles: Farmer and Super Admin
- Super Admin creates Staff/Veterinarian accounts
- Farmer data is owner-scoped: Farmer → Farm → Animal → Health Record
- Farm and animal photos are stored as small data-URI images in MongoDB so the Vercel deployment does not depend on an ephemeral server filesystem
- AI disease detection is an early-warning symptom classifier, not a veterinary diagnosis
- English / Hindi / Marathi UI
- Responsive desktop + mobile navigation
- Vercel-ready single-domain `/api` deployment

## Local setup
1. Copy `backend/.env.example` to `backend/.env`.
2. Put your MongoDB Atlas connection string in `MONGODB_URL`.
3. Change `JWT_SECRET` to a long random value.
4. Keep the admin values or change them.
5. Install and run:

```bash
npm run install-all
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

The first backend startup creates the Super Admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD` if it does not already exist.

## Default local Super Admin
- Email: `admin@pashurakshak.ai`
- Password: `Admin@12345`

Change these values before any real/public deployment.

## Vercel deployment
This repository is prepared for a single Vercel project. The Express API is exposed through `api/index.js` and the frontend is built to `frontend/dist`.

Add these Vercel Environment Variables:

- `MONGODB_URL` — MongoDB Atlas connection string
- `JWT_SECRET` — long random secret
- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CLIENT_URL` — your Vercel URL (or leave unset for same-origin deployment)

Then deploy the project root. The frontend uses `/api` automatically when `VITE_API_URL` is not set.

## MongoDB Atlas network access
For a Vercel deployment, MongoDB Atlas must allow connections from your deployed backend. For a college/demo deployment you can temporarily allow `0.0.0.0/0`, but use a restricted production network policy where practical.

## Security notes
- Never commit `.env` or real MongoDB credentials.
- Passwords are never stored in plain text in MongoDB.
- Farmer records are queried using the authenticated owner ID.
- Super Admin is the only public role with system-wide access.
- Staff/Veterinarian accounts are not separate public login roles.

## Feature map
Farmer: Dashboard, Farms, Animals, Health Records, Vaccination, AI Disease Detection, Disease Map, Alerts, Veterinary Support, Reports & Analytics, Voice Assistant, Profile.

Super Admin: Dashboard, Farmers, Staff & Veterinarians, All Farms, All Animals, Health Cases, Disease Map, Reports, System Settings.
