# 🏋️ Gym Management System

<div align="center">

![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)


A full-stack web application for managing gym memberships, session bookings, and administrative operations — built with the MERN Stack.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Future Improvements](#-future-improvements)
- [Learning Outcomes](#-learning-outcomes)
- [Author](#-author)

---

## 📖 Overview

The **Gym Management System** is a full-stack web application developed using the **MERN Stack** (MongoDB, Express.js, React, Node.js). It provides a complete platform for gym members and administrators to manage sessions, memberships, and bookings through a clean and responsive interface.

**Members** can register, log in securely, browse available membership plans, book gym sessions, and track their booking history through a personal dashboard. **Administrators** have elevated access to manage all bookings, update booking statuses, and monitor overall activity through a dedicated admin dashboard.

This project demonstrates core full-stack development competencies including REST API design, JWT-based authentication and authorization, MongoDB data modeling, React component architecture, protected routing, and responsive UI design.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React** | Component-based UI development |
| **React Router** | Client-side routing and navigation |
| **Axios** | HTTP requests to the REST API |
| **Pure CSS** | Custom responsive styling |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | Server-side JavaScript runtime |
| **Express.js** | RESTful API framework |

### Database
| Technology | Purpose |
|---|---|
| **MongoDB** | NoSQL document database |
| **Mongoose** | ODM for schema modeling and validation |

### Authentication & Security
| Technology | Purpose |
|---|---|
| **JWT (JSON Web Token)** | Stateless authentication tokens |
| **bcrypt** | Secure password hashing |

### Development Tools
| Tool | Purpose |
|---|---|
| **VS Code** | Primary code editor |
| **Postman** | API testing and documentation |
| **Git & GitHub** | Version control and collaboration |

---

## ✨ Features

### 🔐 Authentication
- User registration with form validation
- Secure user login with JWT token issuance
- Password hashing using bcrypt
- Protected routes for authenticated users
- Role-based access control (User / Admin)

### 👤 User Features
- Personal dashboard with booking summary
- View and manage own profile
- Browse available membership plans and pricing
- Book gym sessions by date and time
- View full booking history
- Delete own bookings

### 🛡️ Admin Features
- Admin dashboard with booking statistics
- View all bookings across all users
- Update booking status (Pending → Confirmed / Cancelled)
- Delete any booking from the system
- Overview of total, pending, and confirmed bookings

### 📅 Booking System
- Select session date and time
- Instant booking confirmation
- Booking status tracking (Pending / Confirmed / Cancelled)
- Full booking history per user

### 💳 Membership System
- Display of available membership plans
- Pricing information page

### 📊 Dashboard
**User Dashboard**
- Total number of bookings
- Latest booking details

**Admin Dashboard**
- Total bookings count
- Pending bookings count
- Confirmed bookings count

### 🎨 UI/UX
- Fully responsive design (mobile-friendly)
- Role-based navigation (User vs Admin menus)
- Clean, modern layout using Pure CSS

---

## 📁 Project Structure

```
gym-management-system/
│
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── layouts/           # Page layout wrappers
│   │   ├── pages/             # Route-level page components
│   │   ├── routes/            # Protected route definitions
│   │   ├── services/          # Axios API service functions
│   │   ├── context/           # React Context (Auth state)
│   │   └── assets/            # Images and static files
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/           # Route handler logic
│   ├── middleware/            # Auth middleware (JWT verification)
│   ├── models/                # Mongoose schemas (User, Booking)
│   ├── routes/                # Express route definitions
│   ├── config/                # Database connection config
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gym-management-system.git
cd gym-management-system
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables

In the `backend/` directory, create a `.env` file:

```bash
cd ../backend
cp .env.example .env
```

Then update the values (see [Environment Variables](#-environment-variables) below).

### 5. Run the Backend Server

```bash
# From the backend/ directory
npm run dev
```

The API will be available at `http://localhost:5000`

### 6. Run the Frontend

```bash
# Open a new terminal, from the frontend/ directory
cd frontend
npm start
```

The app will be available at `http://localhost:3000`

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gym-management
JWT_SECRET=your_jwt_secret_key_here
```

| Variable | Description |
|---|---|
| `PORT` | Port number for the Express server |
| `MONGO_URI` | MongoDB connection string (local or Atlas) |
| `JWT_SECRET` | Secret key for signing JWT tokens |

> ⚠️ **Never commit your `.env` file to version control.** It is listed in `.gitignore` by default.

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and receive JWT token |

### User

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/user/profile` | Private (User) | Get authenticated user profile |

### Bookings

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/bookings` | Private (User) | Create a new booking |
| `GET` | `/api/bookings/my` | Private (User) | Get current user's bookings |
| `DELETE` | `/api/bookings/:id` | Private (User) | Delete own booking by ID |

### Admin

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/bookings/admin/all` | Private (Admin) | Get all bookings |
| `PUT` | `/api/bookings/admin/:id` | Private (Admin) | Update booking status |
| `DELETE` | `/api/bookings/admin/:id` | Private (Admin) | Delete any booking by ID |

> 🔒 **Private** routes require a valid JWT token in the `Authorization: Bearer <token>` header.
> 🛡️ **Admin** routes additionally require the user to have the `admin` role.

---


## 🔮 Future Improvements

The following features are planned as future enhancements and are **not currently implemented** in this version:

| # | Feature | Description |
|---|---|---|
| 1 | 💳 **Online Payment Integration** | Allow members to pay for memberships online |
| 2 | 📧 **Email Notifications** | Send booking confirmations and reminders via email |
| 3 | 📱 **QR Code Check-In** | Generate QR codes for session check-in at the gym |
| 4 | 📋 **Attendance Tracking** | Track member attendance history per session |
| 5 | 🏃 **Trainer Management** | Assign and manage personal trainers per member |
| 6 | 🗓️ **Workout Scheduling** | Allow trainers to create and assign workout plans |
| 7 | 📈 **Admin Analytics** | Visual charts and reports for gym usage trends |
| 8 | 🖼️ **Profile Image Upload** | Allow users to upload and update their profile picture |

---

## 🎓 Learning Outcomes

This project was developed as part of an internship-level portfolio to demonstrate the following skills:

- ✅ **MERN Stack Development** — End-to-end full-stack application using MongoDB, Express, React, and Node.js
- ✅ **REST API Development** — Designing and building structured RESTful API endpoints
- ✅ **Authentication** — Implementing secure user login and registration with JWT
- ✅ **Authorization** — Role-based access control separating User and Admin permissions
- ✅ **CRUD Operations** — Full Create, Read, Update, Delete functionality for bookings
- ✅ **MongoDB Relationships** — Referencing User documents within Booking records
- ✅ **React Routing** — Multi-page navigation using React Router
- ✅ **Protected Routes** — Restricting frontend routes based on authentication and role
- ✅ **State Management** — Managing global auth state using React Context API
- ✅ **Responsive UI Design** — Mobile-friendly layout built with Pure CSS
- ✅ **Full Stack Integration** — Seamless communication between React frontend and Express backend via Axios

---

## 👨‍💻 Author

Nipun Induwara 


---



<div align="center">

⭐ If you found this project helpful, please consider giving it a star on GitHub!



</div>
