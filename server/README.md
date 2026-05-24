# Server — Smart Expense+

This folder contains the Express API and Mongoose models used by Smart Expense+.

Environment

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWT tokens
- `PORT` — server port (default 5000)

Install and run

```bash
cd server
npm install
Copy-Item .env.example .env    # PowerShell
# Edit .env
npm run dev
```

Available endpoints (examples)

- `POST /api/auth/register` — register new user { name, email, password }
- `POST /api/auth/login` — login { email, password }
- `GET /api/expenses` — get user expenses (Authorization: Bearer <token>)
- `POST /api/expenses` — create expense
- `PUT /api/expenses/:id` — update expense
- `DELETE /api/expenses/:id` — delete expense

Notes

- The `middleware/auth.js` extracts JWT from `Authorization: Bearer <token>` header.
- Add logging and more robust validation for production.
