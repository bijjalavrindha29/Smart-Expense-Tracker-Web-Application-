
# Smart Expense+ — Smart Expense Tracker

Professional, production-ready MERN starter for a personal finance web application. This repository provides a clear project structure, basic authentication, expense CRUD APIs, and a minimal React frontend ready to be extended.

Badges

- Build: ![CI status](https://img.shields.io/badge/ci-pending-lightgrey)
- License: MIT

Highlights

- Full-stack: React (frontend) + Node.js/Express (API) + MongoDB (database)
- Secure auth using JWT
- Expense CRUD with category, date and amount fields
- Chart-ready frontend with Chart.js included
- CSV export hooks and category filtering (client-side placeholders)

Prerequisites

- Node.js >= 16
- npm
- MongoDB (local or Atlas)

Quick start

1. Clone the repo:

```bash
git clone <repo-url>
cd "c:\\Users\\PC\\OneDrive\\Desktop\\New folder"
```

2. Server

```bash
cd server
npm install
Copy-Item .env.example .env    # PowerShell
# or: cp .env.example .env    # Bash
# Edit .env to add MONGODB_URI and JWT_SECRET
npm run dev
```

3. Client (new terminal)

```bash
cd client
npm install
npm start
```

Project layout

- `server/` — Express API, Mongoose models, auth middleware, routes
- `client/` — React app (create-react-app structure), Chart.js integration

Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines and code style.

License

This project is licensed under the MIT License — see [LICENSE](LICENSE).
