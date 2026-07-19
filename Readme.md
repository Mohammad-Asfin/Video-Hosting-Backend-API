# 🎬 Video Hosting Backend API

> A production-grade, scalable **REST API backend** for a YouTube-like video hosting platform — built with **Node.js**, **Express**, **MongoDB**, **Mongoose**, **JWT**, **Cloudinary**, and more.

**Author:** Mohammad Asfin  
**License:** ISC  
**Version:** 1.0.0

---

## 📌 Project Overview

This is a fully-featured backend project that powers a video hosting platform similar to YouTube. It implements all core backend features including authentication, authorization, video management, likes, comments, subscriptions, playlists, and a dashboard.

### Key Features

- 🔐 **JWT-based Authentication** — Access & Refresh token strategy
- 🔑 **Password Encryption** — Secure hashing using `bcrypt`
- 📹 **Video Uploads** — Cloud-based media handling via `Cloudinary` + `Multer`
- 💬 **Comments, Likes & Replies** — Full social interaction system
- 📋 **Playlists** — Create and manage video playlists
- 🔔 **Subscriptions** — Channel subscribe/unsubscribe functionality
- 📊 **Dashboard** — Channel stats and analytics
- 🐦 **Tweets** — Short text posts (Twitter-like feature)
- 🩺 **Health Check** — API health endpoint
- 🌐 **CORS** — Configured cross-origin resource sharing
- 🧹 **Prettier** — Opinionated code formatting enforced

---

## 🗂️ Project Structure

```
src/
├── controllers/        # Route handlers (business logic)
│   ├── comment.controller.js
│   ├── dashboard.controller.js
│   ├── healthcheck.controller.js
│   ├── like.controller.js
│   ├── playlist.controller.js
│   ├── subscription.controller.js
│   ├── tweet.controller.js
│   ├── user.controller.js
│   └── video.controller.js
├── db/                 # Database connection
│   └── index.js
├── middlewares/        # Custom middleware
│   ├── auth.middleware.js
│   └── multer.middleware.js
├── models/             # Mongoose schemas
│   ├── comment.model.js
│   ├── like.model.js
│   ├── playlist.model.js
│   ├── subscription.model.js
│   ├── tweet.model.js
│   ├── user.model.js
│   └── video.model.js
├── routes/             # Express route definitions
│   ├── comment.routes.js
│   ├── dashboard.routes.js
│   ├── healthcheck.routes.js
│   ├── like.routes.js
│   ├── playlist.routes.js
│   ├── subscription.routes.js
│   ├── tweet.routes.js
│   ├── user.routes.js
│   └── video.routes.js
├── utils/              # Utility helpers
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   └── cloudinary.js
├── app.js              # Express app setup
├── constants.js        # App-wide constants
└── index.js            # Server entry point
public/
└── temp/               # Temporary file storage (local uploads)
```

---

## 📐 Data Model

View the complete Entity-Relationship diagram:

🔗 [Model Link (Eraser.io)](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share)

---

## ⚙️ Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)
- [Cloudinary](https://cloudinary.com/) account
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Mohammad-Asfin/video-hosting-backend.git
cd video-hosting-backend
```

### 2. Install Dependencies

Run the following commands to install all required packages:

```bash
# Dev Dependency — Auto-restart server on file changes
npm i -D nodemon

# Opinionated code formatter
npm i prettier

# MongoDB object modeling tool
npm i mongoose

# Fast, unopinionated, minimalist web framework for Node.js
npm i express

# Loads environment variables from a .env file
npm i dotenv

# Parse Cookie header and populate req.cookies
npm i cookie-parser

# Node.js CORS middleware for Express/Connect
npm i cors

# Mongoose plugin for aggregate pagination
npm i mongoose-aggregate-paginate-v2

# Library to hash passwords securely
npm i bcrypt

# JSON Web Tokens implementation for Node.js
npm i jsonwebtoken

# Cloudinary Node SDK for media upload and management
npm i cloudinary

# Node.js middleware for handling multipart/form-data (file uploads)
npm i multer
```

> **Or install everything at once:**

```bash
npm install
```

---

## 🔐 Environment Variables Setup

Copy the sample environment file and fill in your own values:

```bash
cp .env.sample .env
```

### `.env` Configuration

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net
CORS_ORIGIN=*

# JWT Secrets — Use different secrets for access and refresh tokens
# Use at least 64 random bytes (128 hex characters)
ACCESS_TOKEN_SECRET=your_super_secret_access_token_key_here
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_super_secret_refresh_token_key_here
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 🔑 Generating Secure Secrets

Use Node.js to generate cryptographically strong secrets:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run this **twice** — once for `ACCESS_TOKEN_SECRET` and once for `REFRESH_TOKEN_SECRET`.

### ⚠️ Security Rules

> **NEVER commit your `.env` file to GitHub.** It contains sensitive credentials.

- ✅ Use **different secrets** for access and refresh tokens
- ✅ Use **at least 64 random bytes** (128 hex characters) for each secret
- ✅ Ensure `.env` is listed in your `.gitignore` file
- ❌ Never share your `.env` file publicly

---

## 🚀 Running the Server

```bash
# Development mode (with nodemon auto-restart)
npm run dev
```

The server will start at: **`http://localhost:8000`**

---

## 📬 API Endpoints

### Base URL

```
http://localhost:8000/api/v1
```

### 👤 User Routes — `/api/v1/user`

| Method | Endpoint           | Description                         | Auth Required |
|--------|--------------------|-------------------------------------|:-------------:|
| POST   | `/register`        | Register a new user                 | ❌            |
| POST   | `/login`           | Login and receive tokens            | ❌            |
| POST   | `/logout`          | Logout current user                 | ✅            |
| POST   | `/refresh-token`   | Refresh access token                | ❌            |
| GET    | `/current-user`    | Get currently logged-in user        | ✅            |
| PATCH  | `/update-account`  | Update account details              | ✅            |
| PATCH  | `/avatar`          | Update user avatar                  | ✅            |
| PATCH  | `/cover-image`     | Update cover image                  | ✅            |
| GET    | `/c/:username`     | Get channel profile                 | ✅            |
| GET    | `/history`         | Get watch history                   | ✅            |

### 🎥 Video Routes — `/api/v1/videos`
### 💬 Comment Routes — `/api/v1/comments`
### 👍 Like Routes — `/api/v1/likes`
### 📋 Playlist Routes — `/api/v1/playlist`
### 🔔 Subscription Routes — `/api/v1/subscriptions`
### 🐦 Tweet Routes — `/api/v1/tweets`
### 📊 Dashboard Routes — `/api/v1/dashboard`
### 🩺 Health Check — `/api/v1/healthcheck`

---

## 🧪 Testing with Postman

### Register a New User

1. Open **Postman** (web or desktop)
2. Create a new request:
   - **Method:** `POST`
   - **URL:** `http://localhost:8000/api/v1/user/register`
3. Go to the **Body** tab → select **form-data**
4. Add the following fields:

| Key        | Type   | Example Value                  |
|------------|--------|--------------------------------|
| `fullName` | Text   | `Mohammad Asfin`               |
| `email`    | Text   | `your@email.com`               |
| `username` | Text   | `mohammad_asfin`               |
| `password` | Text   | `your_secure_password`         |
| `avatar`   | File   | *(Upload a profile image)*     |

5. Click **Send**

> **Expected Response:** `201 Created` with user data (excluding password).

---

## 🛠️ Tech Stack

| Technology                          | Purpose                                              |
|-------------------------------------|------------------------------------------------------|
| **Node.js**                         | JavaScript runtime environment                       |
| **Express.js**                      | Fast, minimalist web framework                       |
| **MongoDB**                         | NoSQL document database                              |
| **Mongoose**                        | MongoDB object modeling (ODM)                        |
| **mongoose-aggregate-paginate-v2**  | Aggregation pipeline pagination plugin               |
| **JWT (jsonwebtoken)**              | Stateless auth with access & refresh tokens          |
| **bcrypt**                          | Secure password hashing                              |
| **Cloudinary**                      | Cloud media upload, transformation & management      |
| **Multer**                          | Multipart/form-data middleware for file uploads      |
| **dotenv**                          | Environment variable management                      |
| **cookie-parser**                   | HTTP cookie parsing middleware                       |
| **cors**                            | Cross-Origin Resource Sharing middleware             |
| **nodemon**                         | Dev tool for auto-restarting the server              |
| **Prettier**                        | Opinionated code formatter                           |

---

## 📄 npm Scripts

```json
{
  "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
}
```

---

## 🤝 Contributing

This is not a regular open-source project with general PRs. Contributions require completing **all TODO assignments** in the `controllers/` folder.

1. Fork the repository
2. Complete **all controllers** with the TODO assignments
3. Open a [GitHub Issue](https://github.com/Mohammad-Asfin/video-hosting-backend/issues) once all controllers are done
4. After code review, your repo link will be added to this README

---

## 📎 Useful Links

- 🔗 [ER Diagram (Eraser.io)](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share)
- 🌐 [GitHub Repository](https://github.com/Mohammad-Asfin/video-hosting-backend)
- ☁️ [Cloudinary Dashboard](https://cloudinary.com/)
- 🍃 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 👨‍💻 Author

**Mohammad Asfin**  
🔗 [GitHub — Mohammad-Asfin](https://github.com/Mohammad-Asfin)

---

*Built with ❤️ using Node.js, Express & MongoDB*