# 🚗 UrbanMove - Corporate Shuttle Platform

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-8.0.3-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Material%20UI-5.15.3-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="Material UI">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-3.4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</div>

<div align="center">
  <h3>🌟 A modern corporate shuttle booking and management platform 🌟</h3>
  <p>Streamlining employee transportation with real-time tracking, scheduling, and analytics</p>
</div>

## 📋 Table of Contents

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
- [🚦 Routes](#-routes)
- [⚙️ Installation](#️-installation)
- [🚀 Getting Started](#-getting-started)
- [📱 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🚀 Features

### 🎯 Core Features
- **👥 Multi-Role System**: Admin, Driver, and Passenger roles
- **📅 Real-time Booking**: Schedule and book rides instantly
- **🗺️ Live Tracking**: Real-time GPS tracking of shuttles
- **💳 Payment Integration**: Multiple payment methods and wallet system
- **📊 Analytics Dashboard**: Comprehensive ride and user analytics
- **🔔 Smart Notifications**: Real-time alerts and updates

### 🎨 User Experience
- **📱 Responsive Design**: Mobile-first approach with Material UI
- **🌙 Dark Mode**: Toggle between light and dark themes
- **🎭 Smooth Animations**: Framer Motion and Lottie animations
- **🗣️ Multi-language Support**: Internationalization ready
- **♿ Accessibility**: WCAG compliant design

### 🔧 Technical Features
- **🔐 JWT Authentication**: Secure token-based authentication
- **🛡️ Rate Limiting**: API protection against abuse
- **📧 Email Verification**: Secure user onboarding
- **🔄 Real-time Updates**: Socket.io for live data
- **☁️ Cloud Storage**: Cloudinary for file uploads
- **📈 Performance**: Optimized with React and Vite

## 🛠️ Tech Stack

### 🎨 Frontend
```
React 18.2.0          ⚛️  UI Library
React Router 6.21.1    🛣️  Routing
Material UI 5.15.3     🎨  Component Library
Tailwind CSS 3.4.0     🎭  Styling
Framer Motion 10.16.16 🎬  Animations
Redux Toolkit 2.0.1    🔄  State Management
Axios 1.6.2           🌐  HTTP Client
Socket.io Client 4.6.1 🔌  Real-time
```

### 🖥️ Backend
```
Node.js                🟢  Runtime
Express 4.18.2        🚀  Framework
MongoDB 8.0.3         🍃  Database
Mongoose 8.0.3        🔗  ODM
JWT 9.0.2            🔐  Authentication
Socket.io 4.6.1       🔌  Real-time
Cloudinary 1.41.0     ☁️  Cloud Storage
Nodemailer 6.9.7      📧  Email Service
```

### 🛠️ Development Tools
```
Vite 5.0.8            ⚡  Build Tool
ESLint 8.55.0         🔍  Linting
Prettier 3.1.1        💅  Code Formatting
Nodemon 3.0.2         🔄  Auto-restart
```

## 🏗️ Project Structure

```
UrbanMove/
├── 📁 client/                 # React Frontend
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable Components
│   │   ├── 📁 context/        # React Context
│   │   ├── 📁 pages/          # Page Components
│   │   ├── 📁 routes/         # Route Definitions
│   │   ├── 📁 hooks/          # Custom Hooks
│   │   ├── 📁 utils/          # Utility Functions
│   │   └── 📁 styles/         # CSS/Styles
│   ├── 📄 package.json
│   └── 📄 vite.config.js
├── 📁 server/                 # Node.js Backend
│   ├── 📁 controllers/        # Route Controllers
│   ├── 📁 models/            # Database Models
│   ├── 📁 routes/            # API Routes
│   ├── 📁 middleware/        # Custom Middleware
│   ├── 📁 utils/             # Utility Functions
│   └── 📄 package.json
├── 📄 README.md
└── 📄 .gitignore
```

## 🚦 Routes

### 🏠 Public Routes
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Landing | 🏠 Main landing page |
| `/home` | Home | 🏡 Home page |
| `/login` | Login | 🔐 User authentication |
| `/register` | Register | 📝 User registration |
| `/forgot-password` | ForgotPassword | 🔑 Password recovery |
| `/email-verification` | EmailVerification | ✉️ Email verification |
| `/about` | About | ℹ️ About us |
| `/contact` | Contact | 📞 Contact page |
| `/faq` | FAQ | ❓ Frequently asked questions |
| `/help` | Help | 💡 Help center |
| `/terms` | Terms | 📄 Terms of service |
| `/privacy` | Privacy | 🔒 Privacy policy |

### 👤 User Routes (Protected)
| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard` | Dashboard | 📊 User dashboard |
| `/profile` | Profile | 👤 User profile |
| `/settings` | Settings | ⚙️ Account settings |
| `/change-password` | ChangePassword | 🔐 Password change |
| `/book` | Booking | 📅 Book a ride |
| `/rides` | Rides | 🚗 My rides |
| `/ride-history` | RideHistory | 📜 Ride history |
| `/ride-details/:id` | RideDetails | 📋 Ride details |
| `/find-ride` | FindRide | 🔍 Find available rides |
| `/schedule-ride` | ScheduleRide | ⏰ Schedule ride |
| `/ride-tracking/:id` | RideTracking | 📍 Track ride |
| `/payment-methods` | PaymentMethods | 💳 Payment methods |
| `/payment-history` | PaymentHistory | 💰 Payment history |
| `/wallet` | Wallet | 👛 Digital wallet |
| `/billing` | Billing | 🧾 Billing info |
| `/notifications` | Notifications | 🔔 Notifications |
| `/messages` | Messages | 💬 Messages |
| `/map-view` | MapView | 🗺️ Map view |

### 🚗 Driver Routes (Protected)
| Route | Component | Description |
|-------|-----------|-------------|
| `/driver-dashboard` | DriverDashboard | 🚗 Driver dashboard |

### 🛡️ Admin Routes (Protected)
| Route | Component | Description |
|-------|-----------|-------------|
| `/admin-dashboard` | AdminDashboard | 🛡️ Admin dashboard |
| `/user-management` | UserManagement | 👥 Manage users |
| `/ride-management` | RideManagement | 🚗 Manage rides |
| `/analytics` | Analytics | 📊 System analytics |
| `/reports` | Reports | 📈 Generate reports |

## ⚙️ Installation

### 📋 Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- MongoDB database
- Git

### 🚀 Quick Start

1. **🍴 Clone the repository**
```bash
git clone https://github.com/yourusername/UrbanMove.git
cd UrbanMove
```

2. **📦 Install dependencies**
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. **🔧 Environment Setup**
```bash
# Create .env file in server directory
cd server
cp .env.example .env
# Edit .env with your configuration
```

4. **🗄️ Database Setup**
```bash
# Start MongoDB service
# Create database and collections as needed
```

5. **🚀 Run the application**
```bash
# Start server (in server directory)
npm run dev

# Start client (in client directory)
npm run dev
```

## 🎯 Environment Variables

### 🖥️ Server (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/urbanmove
PORT=5000

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Other
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 📱 Available Scripts

### 🎨 Client Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### 🖥️ Server Scripts
```bash
npm start           # Start production server
npm run dev         # Start development server with nodemon
```

## 🔧 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### 👤 Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/rides` - Get user rides

### 🚗 Rides
- `POST /api/rides/book` - Book a ride
- `GET /api/rides/available` - Get available rides
- `GET /api/rides/:id` - Get ride details
- `PUT /api/rides/:id/status` - Update ride status

### 💳 Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/history` - Payment history
- `POST /api/payments/wallet` - Wallet operations

## 🎨 Component Library

### 🧩 Reusable Components
- **🎭 LottieLoader** - Animated loading components
- **🗺️ GoogleMapComponent** - Interactive maps
- **📊 DataGrid** - Material UI data tables
- **🔔 NotificationSystem** - Toast notifications
- **🎨 ThemeToggle** - Dark/light mode switcher
- **📱 ResponsiveLayout** - Mobile-friendly layouts

### 🎯 Custom Hooks
- **🔐 useAuth** - Authentication state management
- **📍 useGeolocation** - GPS location tracking
- **💳 usePayments** - Payment processing
- **🔔 useNotifications** - Real-time notifications

## 📊 Features in Detail

### 🎯 User Roles
- **👤 Passenger**: Book rides, track shuttles, manage payments
- **🚗 Driver**: Accept rides, update status, navigate routes
- **🛡️ Admin**: Manage users, analytics, system settings

### 📅 Booking System
- **⚡ Instant Booking**: Book available rides immediately
- **⏰ Scheduled Booking**: Plan rides in advance
- **🔄 Recurring Rides**: Set up daily/weekly commutes
- **📍 Route Planning**: Optimize pickup and dropoff points

### 💳 Payment System
- **💳 Multiple Methods**: Credit cards, debit cards, digital wallets
- **👛 Digital Wallet**: Store funds for quick payments
- **🧾 Auto-billing**: Automatic payment processing
- **📊 Transaction History**: Complete payment records

### 📊 Analytics
- **📈 Ride Statistics**: Usage patterns and trends
- **👥 User Analytics**: Active users and engagement
- **💰 Revenue Tracking**: Financial performance metrics
- **📍 Route Analytics**: Popular routes and efficiency

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch**
```bash
git checkout -b feature/AmazingFeature
```
3. **💾 Commit your changes**
```bash
git commit -m 'Add some AmazingFeature'
```
4. **📤 Push to the branch**
```bash
git push origin feature/AmazingFeature
```
5. **🔀 Open a Pull Request**

### 📝 Development Guidelines
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 🐛 Bug Reporting

Found a bug? Please report it by:
1. Creating an issue on GitHub
2. Providing detailed description
3. Including steps to reproduce
4. Adding screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing UI library
- **Material UI** - For the beautiful component library
- **MongoDB** - For the flexible database solution
- **Google Maps API** - For mapping and geolocation services

## 📞 Contact

- **👤 Author**: Your Name
- **📧 Email**: your.email@example.com
- **🔗 LinkedIn**: [Your LinkedIn Profile]
- **🐦 Twitter**: [@yourusername]

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub!

---

<div align="center">
  <p>Made with ❤️ and ☕ by the UrbanMove Team</p>
  <p>© 2026 UrbanMove. All rights reserved.</p>
</div>
