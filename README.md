# Aurora Library Management System

Aurora Library is a full-stack library management system built with Spring Boot, React, and MongoDB. It provides book management, member management, borrowing, reservations, authentication, and reporting features.

## Features

* User Authentication with JWT
* Role-Based Access Control (User, Librarian, Admin)
* Book Catalog Management
* Borrowing and Return Tracking
* Book Reservation System
* Member Profile Management
* Dashboard with Library Statistics
* Reports and Transaction Monitoring
* Database Seed Scripts for Sample Data

## Tech Stack

### Backend

* Java 17
* Spring Boot 3
* Spring Security
* JWT Authentication
* Spring Data MongoDB

### Frontend

* React 18
* Vite
* React Router
* Axios
* CSS

### Database

* MongoDB

## Installation

### Prerequisites

* Java 17+
* Node.js 18+
* MongoDB

### Initialize Database

```bash
cd database/seed
mongosh seed-books.mongosh.js
```

### Run Application

```bash
chmod +x run.sh
./run.sh
```

### Access Application

* Frontend: http://localhost:5173
* Backend API: http://localhost:8080

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Books

```http
GET    /api/books
GET    /api/books/{id}
POST   /api/admin/books
DELETE /api/admin/books/{id}
```

### Users

```http
GET /api/admin/users
```

## Screenshots

### Login Page

![Login](https://github.com/user-attachments/assets/2f37ba95-c89d-435b-8d91-443093254ea4)

### Dashboard

![Dashboard](https://github.com/user-attachments/assets/63e72298-f73d-4676-9566-cfc202682156)

## Notes

* MongoDB must be running before starting the application.
* The startup script launches both frontend and backend servers.
* JWT token is required for protected endpoints.
