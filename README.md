# PASHU-RAKSHAK AI — Live-ready demo

Built from the supplied Advanced Master Blueprint. The blueprint calls for Farmer + Super Admin roles, farmer-owned farms/animals/health/vaccination/vet workflows, platform-wide admin operations, AI risk workflow, GIS disease map, QR animal IDs, alerts, analytics, multilingual UI and responsive/mobile support.

## Demo login
Farmer: `farmer@pashurakshak.demo` / `Farmer@123`
Super Admin: `admin@pashurakshak.demo` / `Admin@123`

## Deploy
Push this folder to GitHub, import it into Vercel, and deploy. It is a static Vercel-ready app; no build step is required.

## Included
- Farmer and Super Admin login areas
- Responsive desktop/tablet/mobile UI
- Dashboard KPIs, alerts and health risk
- Farms, animals, health records, vaccination, treatment workflow
- Preliminary AI disease-risk assessment
- Disease/GIS map using Leaflet + OpenStreetMap
- Veterinary requests and Emergency SOS
- QR Animal ID generation in-browser
- Reports and analytics
- Admin: farmers, staff/vets, farms, animals, cases, alerts, AI monitoring, disease management, campaigns, reports, audit logs, settings
- English/Hindi/Marathi UI selector
- Browser localStorage persistence for demo records
- Open-Meteo weather card

## Important production note
This package is designed to go live immediately as a functional prototype/demo. Authentication and data persistence are browser-local for the no-backend deployment. For a real multi-user production system, connect the included UI to a server/API and database, then enforce the ownership/role rules described in the blueprint on the server.

AI results are preliminary and must not be treated as veterinary diagnosis.
