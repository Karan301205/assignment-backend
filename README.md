# Assignment Management System - Backend

A robust Node.js and Express.js backend for a role-based assignment portal. This API handles authentication, role-based access control (RBAC), and full CRUD operations for assignments and student submissions.

## 🚀 Tech Stack
* **Node.js & Express.js**: Server-side logic and API routing.
* **MongoDB & Mongoose**: NoSQL database for flexible data modeling.
* **JWT (JSON Web Tokens)**: Secure stateless authentication.
* **Bcrypt.js**: Industry-standard password hashing.

## 🛠️ Features
* **Authentication**: Register and Login with secure password hashing.
* **RBAC**: Middleware to protect routes specifically for Teachers or Students.
* **Assignment Engine**: Create, update, publish, and complete assignments.
* **Submission System**: Allows students to submit responses to published assignments.

## 🚦 Getting Started
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file with `MONGO_URI`, `JWT_SECRET`, and `PORT=5001`.
4. Run `npm start` or `node server.js`.

## 🔗 Live API
**URL:** https://assignment-backend-byxf.onrender.com
