# 🚀 UrbanMove API Documentation

Welcome to the UrbanMove API documentation. This guide provides everything you need to test and integrate with the corporate shuttle platform backend.

## 📌 Base URL
All API requests should be made to:
`http://localhost:5000/api`

---

## 🛠️ Quick Start (Postman)
To make testing easier, I have provided a pre-configured Postman Collection.

1.  Locate the file **`UrbanMove.postman_collection.json`** in the project root.
2.  Open Postman and click **Import**.
3.  Drag and drop the file.
4.  The collection includes **Automatic Token Handling**—just login, and other routes will work automatically!

---

## 🔐 Authentication
The API uses **JWT (JSON Web Tokens)** for security.

### Demo Credentials
Use these accounts to test different roles without needing a database setup:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@urbanmove.com` | `Admin1234` |
| **Driver** | `driver@urbanmove.com` | `Driver1234` |
| **Employee** | `demo@urbanmove.com` | `Demo1234` |

### How to Authenticate
Include the token in the request header:
`Authorization: Bearer <your_token_here>`

---

## 📡 Key Endpoints

### 1. Authentication
*   **`POST /auth/login`**: Authenticate a user and receive a token.
*   **`POST /auth/logout`**: Terminate the current session.

### 2. User Profile
*   **`GET /users/profile`**: Get current user details (Protected).
*   **`PUT /users/profile`**: Update user information.

### 3. Rides
*   **`GET /rides`**: List all rides (Returns dummy data if DB is empty).
*   **`POST /rides`**: Book a new shuttle ride.
*   **`PUT /rides/:id/cancel`**: Cancel a pending ride.

### 4. Admin Panel
*   **`GET /admin/stats`**: Get system-wide statistics (Users, Rides, Vehicles).
*   **`GET /admin/users`**: List and manage all registered users.

### 5. Vehicles & Notifications
*   **`GET /vehicles`**: List available shuttle vehicles.
*   **`GET /notifications`**: Get real-time alerts and updates.

---

## 💡 Smart Fallback Data
To ensure a great presentation, the API is equipped with **Smart Fallbacks**. If your MongoDB database is empty, the following routes will automatically return professional **dummy data**:
*   `GET /api/admin/stats`
*   `GET /api/rides`
*   `GET /api/notifications`
*   `GET /api/vehicles`

---

## 🚦 Health Check
To verify if the server is running, visit:
`http://localhost:5000/api/health`
