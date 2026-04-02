# 🗂️ Fullstack Task Management Application

A modern and scalable **Task Management Application** built using **React (Frontend)** and **Node.js + Express + MySQL (Backend)**.
The application provides secure authentication, efficient task tracking, and a clean user experience with real-world architecture practices.

---

## 🌐 Overview

This application allows users to manage their daily tasks with ease, featuring secure login, personalized task management, and responsive UI design. It follows a **full-stack architecture** with RESTful APIs and JWT-based authentication.

---

## 🚀 Features

### 🔐 Authentication & Security

* User Signup & Login
* JWT-based Authentication
* Protected Routes
* Secure Password Hashing (bcrypt)
* Change Password functionality

---

### 👤 User Profile Management

* Fetch user profile details
* Update profile information
* Secure account handling

---

### 📋 Task Management

* Create new tasks
* Retrieve user-specific tasks
* Update existing tasks
* Delete tasks
* Task status management:

  * 📝 TODO
  * 🚧 IN_PROGRESS
  * ✅ DONE

---

### 🎨 Frontend Highlights

* Fully responsive design (Mobile + Desktop)
* Dark / Light mode support 🌙
* Smooth animations using Framer Motion ✨
* Clean UI with Tailwind CSS
* Form validation using React Hook Form + Zod

---

### ⚙️ Backend Highlights

* RESTful API architecture
* MySQL database integration
* JWT authentication middleware
* Secure password handling with bcrypt
* Automatic database table creation

---

## 🧠 Tech Stack

### 🖥️ Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Axios
* React Hook Form
* Zod

---

### 🗄️ Backend

* Node.js
* Express.js
* MySQL (mysql2)
* JSON Web Token (JWT)
* bcrypt
* dotenv

---

## 📁 Project Structure

```bash
client/                 # Frontend (React)
server/                 # Backend (Node.js + Express)

client/src/
├── components/
├── pages/
├── hooks/
├── services/
└── utils/

server/
├── controllers/
├── routes/
├── middleware/
├── models/
├── config/
└── utils/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/task-management-app.git
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
npm run dev
```

Create a `.env` file in the server folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=task_db
JWT_SECRET=your_secret_key
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 API Highlights

* Authentication using JWT tokens
* Protected routes using middleware
* CRUD APIs for task management
* User-specific data isolation

---

## 📱 UI/UX Highlights

* Clean and minimal design
* Responsive across all devices
* Smooth transitions and animations
* User-friendly task management flow

---

## 🎯 Purpose

This project demonstrates:

* Full-stack development skills
* Secure authentication implementation
* REST API design
* State management and form validation
* Scalable project architecture

---

## 📌 Future Enhancements

* Role-based access control (Admin/User)
* Task categories & tagging system
* Notifications & reminders
* Real-time updates (WebSockets)
* Deployment with CI/CD

---

## 👨‍💻 Author

**Tushar Vagh**

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub!
