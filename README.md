# KBD-Havya

**Smart Commutes. Real-Time Routes.**

An on-demand corporate shuttle and van-pooling platform that dynamically routes vehicles based on real-time passenger requests for employees commuting to business parks and IT campuses.

---

## Problem Statement

Corporate employees commuting to business parks and IT campuses waste significant time waiting for scheduled company shuttles that run on fixed routes without demand-responsive scheduling. **KBD-Havya** solves this with on-demand van pooling that dynamically routes vehicles based on real-time passenger requests.

---

## Tech Stack

### Frontend
- **React 18** + **Vite**
- **Tailwind CSS** + **MUI (Material UI)**
- **Redux Toolkit** (state management)
- **React Router v6** (routing with lazy loading)
- **Formik + Yup** (forms + validation)
- **Framer Motion** (animations)
- **Lottie React** (animated loaders)
- **Socket.io-client** (real-time)
- **Axios** (HTTP client)
- **React Hot Toast** (notifications)

### Backend
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** Authentication
- **Socket.io** (real-time)
- **bcryptjs** (password hashing)
- **Multer** + **Cloudinary** (file uploads)

---

## Project Structure

```
KBD-Havya/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── features/      # Redux slices
│   │   ├── hooks/        # Custom hooks
│   │   ├── services/      # API services
│   │   ├── utils/        # Utilities
│   │   └── theme/        # MUI theme config
│   └── ...
├── server/                # Express backend
│   ├── controllers/        # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/        # Auth middleware
│   ├── services/         # Business services
│   └── ...
└── README.md
```

---

## Setup Instructions

### Prerequisites
- Node.js >= 18.x
- MongoDB (local or Atlas)
- npm or yarn

### Client Setup

```bash
cd client
npm install
npm run dev
```

### Server Setup

```bash
cd server
npm install
npm run dev
```

### Environment Variables

Create `.env` files:

**Client (`client/.env`)**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=kbd-havya
```

**Server (`server/.env`)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kbd-havya
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:3000
```

---

## Features

### Authentication
- [x] Email/Password registration & login
- [x] JWT authentication
- [x] Role-based access (Employee, Driver, Admin)
- [x] Session persistence

### Employee Dashboard
- [x] Live map with vehicle tracking
- [x] Book on-demand rides
- [x] Ride history
- [x] Real-time notifications
- [x] Profile management

### Driver Dashboard
- [x] Accept/reject ride requests
- [x] Route visualization
- [x] Status updates
- [x] Earnings tracking

### Admin Dashboard
- [x] User management
- [x] Vehicle management
- [x] Analytics overview
- [x] Role assignment

### Real-Time Features
- [x] Socket.io live updates
- [x] Vehicle location tracking
- [x] Ride status changes
- [x] Push notifications

---

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Rides
- `GET /api/rides` - Get user's rides
- `POST /api/rides` - Create new ride
- `PUT /api/rides/:id/cancel` - Cancel ride

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Add vehicle (admin)

### Admin
- `GET /api/admin/stats` - Dashboard stats
- `GET /api/admin/users` - Manage users

---

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Black | `#000000` | Primary background |
| Teal | `#008080` | Primary accent |
| Light Teal | `#00B4B4` | Highlights |
| Light Pink | `#FFB6C1` | Secondary accent |
| Dark Pink | `#C2185B` | Tertiary accent |

---

## Screenshots

_Add screenshots here_

---

## License

MIT License - See LICENSE file for details.

---

**Built with passion for smarter commutes.**