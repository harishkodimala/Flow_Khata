# 🎨 Khata Flow Frontend

## 📖 Overview

The frontend of Khata Flow is built using React.js and Tailwind CSS, providing a modern, responsive, and user-friendly interface for managing customer credit, transactions, and business analytics.

The application is optimized for desktop, tablet, and mobile devices and communicates with the backend through REST APIs.

---

## 🚀 Features

### Authentication

* User Login
* Protected Routes
* Role-Based Navigation
* Persistent Authentication using HttpOnly Cookies

### Dashboard

* Business Overview
* Outstanding Balance Tracking
* Overdue Customer Monitoring
* Recent Transactions

### Customer Management

* Add Customers
* Edit Customers
* Delete Customers
* Search Customers
* Customer Status Tracking
* WhatsApp Payment Reminders

### Ledger Management

* Customer Transaction History
* Credit Records
* Payment Records
* Balance Tracking

### Reports

* Statement Generation
* Statement Email Requests

### Profile Management

* View Profile Information
* View Outstanding Balance

---

## 🛠 Tech Stack

### Core

* React.js
* Vite

### Styling

* Tailwind CSS
* React Icons

### Routing

* React Router DOM

### API Communication

* Axios

### Notifications

* React Hot Toast

---

## 📂 Folder Structure

```bash
frontend/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   └── axios.js
│   │
│   ├── components/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │   ├── auth/
│   │   ├── customer/
│   │   ├── dashboard/
│   │   └── public/
│   │
│   ├── routes/
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## 🎯 Main Pages

### Public Pages

* Home
* Features
* About
* Contact
* How It Works
* Login

### Shopkeeper Pages

* Dashboard
* Customers
* Customer Ledger
* Analytics
* Settings

### Customer Pages

* Dashboard
* Ledger
* Profile

---

## 🔗 API Integration

The frontend communicates with the backend using Axios.

Example:

```javascript
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
```

---

## 📱 Responsive Design

The application is fully responsive and supports:

* Mobile Devices
* Tablets
* Laptops
* Desktop Screens

Responsive layouts are implemented using:

* Flexbox
* CSS Grid
* Tailwind Responsive Utilities

---

## 🔒 Security Considerations

* Authentication handled through HttpOnly Cookies
* Protected Routes
* Unauthorized Route Protection
* Secure API Communication

---

## ⚡ Performance Optimizations

* Component-Based Architecture
* Reusable UI Components
* Lazy Rendering of Data
* Efficient API Calls
* Responsive Design Patterns

---

## 🚀 Local Setup

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

---

## 🎯 Future Improvements

* Dark Mode
* Advanced Filters
* Real-Time Notifications
* Progressive Web App (PWA)
* Offline Support

---

## 👨‍💻 Author

Harish Kodimala
