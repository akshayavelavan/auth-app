# Secure Auth Dashboard

A secure authentication system with JWT, bcrypt, rate limiting, and a responsive dashboard.

**Live Demo:**  
**Live Demo:**  
- Frontend: [https://auth-app-lyart-five.vercel.app/](https://auth-app-lyart-five.vercel.app/)  
- Backend: [https://auth-app-1-cq6l.onrender.com/](https://auth-app-1-cq6l.onrender.com/)



---

## Features

- User Registration & Login with strong passwords
- JWT Authentication & Protected Dashboard
- Password Hashing (bcrypt)
- Rate Limiting on auth routes

---

## Tech Stack

- Frontend: HTML, CSS, JS  
- Backend: Node.js, Express  
- Database: MongoDB  

---

## Setup

**Backend:**
```bash
cd backend
npm install
# add .env with MONGO_URI, JWT_SECRET, PORT
npm start
