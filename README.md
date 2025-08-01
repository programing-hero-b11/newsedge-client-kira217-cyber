# 📰 NewsEdge - Modern Newspaper Web Application

🔗 [Live Demo](https://newsedge-fb8f6.web.app/)

---

## 🧾 Project Overview

**NewsEdge** is a feature-rich, full-stack newspaper web application designed to deliver, manage, and monetize news content efficiently. Built with modern technologies like **React**, **Firebase**, **Express**, and **MongoDB**, the platform supports user authentication, premium subscriptions via **Stripe**, article publishing workflows, and a dedicated **admin panel** for editorial control.

Whether you're a reader or a publisher, **NewsEdge** delivers a dynamic and responsive experience across all devices.

---

## 🖼️ Screenshot

![NewsEdge Screenshot](https://ibb.co/gMPN2Bzz)
<!-- Replace with your actual screenshot if different -->

---

## 🔧 Main Technologies Used

### 🌐 Frontend
- React.js
- React Router DOM
- Firebase Authentication
- Tailwind CSS + DaisyUI
- React Hook Form
- React Hot Toast
- Stripe (React Stripe JS)
- Axios
- TanStack React Query
- Framer Motion

### 🔙 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Firebase Admin SDK
- Stripe (Payment Integration)
- JSON Web Token (JWT)
- CORS & Dotenv

---

## 🚀 Core Features

### 👤 Authentication & Authorization
- Firebase Email/Password login
- Google Sign-in
- Role-based access (Admin, Premium, Normal User)
- Protected routes with JWT

### 📰 Article Management
- View all articles with search & filter
- Create article (based on role/subscription)
- Article approval system by admin
- Premium vs Normal article access control

### 💳 Stripe Payment Integration
- Subscribe to become a Premium User
- Secure Stripe checkout
- Auto-expiry of subscription based on time
- Admin dashboard to view payment history

### 📊 Admin Dashboard
- View platform statistics (Users, Articles, Payments)
- Approve/Decline Articles
- Manage Premium Articles
- Delete Articles
- Make Articles Premium

### 📈 User Dashboard
- View personal articles
- Edit or delete own articles
- Upgrade to premium
- View own payment history

### ✨ UI/UX Features
- Fully responsive layout
- Animations using Framer Motion
- Dark/Light mode toggle
- SweetAlert for confirmation dialogs
- Optimized loading states with React Query

---

## 📦 Project Structure & Dependencies

### Client:
- `react`, `react-dom`
- `react-router-dom`
- `firebase`
- `axios`
- `tailwindcss`, `daisyui`
- `react-hook-form`
- `react-hot-toast`
- `stripe`, `@stripe/react-stripe-js`, `@stripe/stripe-js`
- `framer-motion`
- `@tanstack/react-query`

### Server:
- `express`
- `cors`
- `dotenv`
- `mongodb` / `mongoose`
- `jsonwebtoken`
- `stripe`
- `firebase-admin`

---

## 🛠️ How to Run Locally

### ⚙️ Clone the Repositories

```bash
# Frontend
git clone https://github.com/programing-hero-b11/newsedge-client-kira217-cyber

# Backend
git clone https://github.com/programing-hero-b11/newsedge-server-kira217-cyber
