# 📊 MERN Dashboard System

A full-stack MERN dashboard application with authentication, course management, analytics visualization, and CRUD functionality.

---

## 🚀 Features

🔐 JWT Authentication System  
📝 User Registration & Login  
📚 Course CRUD Operations  
📊 Analytics Dashboard with Charts  
🎨 Responsive Bootstrap UI  
📁 Protected Routes  
📡 REST API Integration  
🗄️ MongoDB Atlas Database  
⚡ Express & Node.js Backend  
🔄 Dynamic React Frontend  

---

## 🧩 Tech Stack

| Component | Technology |
|------------|------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Authentication | JWT |
| Styling | Bootstrap |
| Charts | Recharts |
| Icons | React Icons |
| API Client | Axios |
| ODM | Mongoose |

---

## ⚙️ How It Works

User → React Frontend → Express API → MongoDB Atlas

1. User registers or logs into the system  
2. JWT token is generated after authentication  
3. Token stored in localStorage  
4. Protected routes verify user access  
5. Users can create, update, delete, and view courses  
6. Dashboard analytics dynamically update using chart data  
7. React frontend communicates with Express backend through REST APIs  

---

## 🔑 Authentication Flow

1. User logs in with email & password  
2. Backend validates credentials  
3. JWT token generated using jsonwebtoken  
4. Token returned to frontend  
5. Frontend stores token in localStorage  
6. Protected API routes verify token before access  

---

## 📊 Dashboard Analytics

The dashboard dynamically visualizes:

- Total number of courses
- Courses added over time
- Course creation trends by date

Charts are generated using Recharts.

---
