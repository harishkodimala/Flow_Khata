# ⚙️ Khata Flow Backend

## 📖 Overview

The Khata Flow Backend is a RESTful API built using Node.js, Express.js, and MongoDB. It handles authentication, customer management, transaction tracking, dashboard analytics, email services, PDF statement generation, and role-based access control.

The backend follows a modular architecture to ensure scalability, maintainability, and clean code organization.

---

## 🚀 Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* HttpOnly Cookie Authentication
* Logout Functionality
* Protected Routes
* Role-Based Access Control

### Customer Management

* Create Customer Accounts
* Update Customer Information
* Delete Customers
* View Customer Details
* Resend Login Credentials

### Transaction Management

* Add Credit Transactions
* Add Payment Transactions
* Balance Calculation
* Transaction History

### Dashboard Analytics

* Total Outstanding Balance
* Total Customers
* Credits Given Today
* Payments Received Today
* Overdue Customers
* Recent Transactions

### Statement Management

* Generate PDF Statements
* Email Statements to Customers
* Download Transaction Reports

### Notifications

* Welcome Emails
* Customer Credential Emails
* Statement Emails
* Contact Form Emails

---

## 🛠 Tech Stack

### Runtime

* Node.js

### Framework

* Express.js

### Database

* MongoDB Atlas
* Mongoose ODM

### Authentication

* JWT (JSON Web Tokens)
* bcryptjs

### Email Services

* Nodemailer
* Brevo SMTP

### PDF Generation

* PDFKit

### Middleware

* Cookie Parser
* CORS
* Authentication Middleware

### Deployment

* Render
* MongoDB Atlas

---

## 📂 Folder Structure

```bash
backend/
│
├── config/
│   ├── db.js
│
├── controllers/
│   ├── authController.js
│   ├── customerController.js
│   ├── dashboardController.js
│   ├── settingsController.js
│   └── transactionController.js
│
├── middleware/
│   ├── authMiddleware.js
│
├── models/
│   ├── User.js
│   └── Transaction.js
│
├── routes/
│   ├── authRoutes.js
│   ├── customerRoute.js
│   ├── dashboardRoutes.js
│   ├── settingRoutes.js
│   └── transactionRoute.js
│
├── utils/
│   ├── emailService.js
│   ├── generateStatementPDF.js
│
├── uploads/
│
├── server.js
│
└── README.md
```

---

## 🔐 Authentication Flow

### Login

```text
User Login
        ↓
Password Verification
        ↓
JWT Generation
        ↓
HttpOnly Cookie
        ↓
Authenticated Requests
```

### Protected Routes

All protected routes verify:

```text
JWT Token
        ↓
User Validation
        ↓
Role Validation
        ↓
Access Granted
```

---

## 🗄 Database Models

### User Model

```javascript
{
  name,
  email,
  phone,
  password,
  role,
  currentBalance,
  createdBy,
  mustChangePassword
}
```

### Transaction Model

```javascript
{
  customer,
  shopkeeper,
  type,
  amount,
  note,
  dueDate,
  isSettled
}
```

---

## 📡 API Endpoints

### Authentication

```http
POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /auth/check-auth
```

### Customers

```http
GET    /customer
POST   /customer
PUT    /customer/:id
DELETE /customer/:id
POST   /customer/resend-credentials/:id
POST   /customer/send-statement/:id
```

### Transactions

```http
GET    /transaction/:customerId
POST   /transaction
```

### Dashboard

```http
GET    /dashboard
GET    /dashboard/me
```

### Settings

```http
PUT    /settings/change-password
```

---

## 📧 Email Service

The backend uses Brevo SMTP through Nodemailer.

Supported emails:

* Welcome Emails
* Customer Credentials
* PDF Statements
* Contact Messages

---

## 📄 PDF Statement Generation

Customer statements are generated dynamically using PDFKit.

Statement includes:

* Customer Information
* Transaction History
* Credit Summary
* Payment Summary
* Outstanding Balance

---

## 🔒 Security Features

### Password Security

```text
bcrypt Password Hashing
```

### Authentication

```text
JWT Authentication
HttpOnly Cookies
```

### API Security

```text
Protected Routes
Role-Based Authorization
CORS Configuration
Input Validation
```

---

## 🌐 Environment Variables

Create a `.env` file:

```env
PORT=5000

db_url=

JWT_SECRET=

CLIENT_URL=

BREVO_USER=

BREVO_PASS=

SENDER_EMAIL=
```

---

## 🚀 Local Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm start
```

### Run with Nodemon

```bash
nodemon server.js
```

---

## ☁️ Deployment

### Backend

Hosted on Render

### Database

MongoDB Atlas

### Frontend

Vercel

---

## 🎯 Future Improvements

* Password Reset Flow
* Settlement Tracking
* SMS Notifications
* Excel Export
* Advanced Analytics
* Multi-Shop Support
* Audit Logs

---

## 💡 Interview Highlights

This project demonstrates:

* REST API Development
* JWT Authentication
* Role-Based Access Control
* MongoDB Data Modeling
* Email Integration
* PDF Generation
* Cloud Deployment
* MERN Stack Development

---

## 👨‍💻 Author

Harish Kodimala

---

## 📜 License

MIT License
