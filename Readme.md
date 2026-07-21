<div align="center">

# 🎬 Video Hosting Backend API

### The Backend Powerhouse of a Full-Stack MERN Video Platform

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

> A production-grade, scalable **REST API** built with the **MERN Stack** (MongoDB · Express · React · Node.js) to power a YouTube-like video hosting platform — featuring JWT auth, Cloudinary media management, aggregation pipelines, and more.

**Author:** Mohammad Asfin &nbsp;|&nbsp; **Stack:** MERN &nbsp;|&nbsp; **License:** MIT &nbsp;|&nbsp; **Version:** 1.0.0

[🚀 Quick Start](#️-installation--setup) · [📬 API Docs](#-api-endpoints) · [🤝 Contributing](./CONTRIBUTING.md) · [🐛 Report Bug](https://github.com/Mohammad-Asfin/Video-Hosting-Backend-API/issues) · [💡 Request Feature](https://github.com/Mohammad-Asfin/Video-Hosting-Backend-API/issues)

</div>

---

## 📌 Project Overview

This is the **backend (M·E·N layer)** of a full-stack **MERN** video hosting web application — similar to YouTube. It exposes a complete REST API consumed by a React frontend, handling everything from user authentication to video streaming metadata, social interactions, and cloud media management.

> 🧩 **MERN Stack Breakdown:**
> | Layer | Technology | Role |
> |-------|-----------|------|
> | **M** | MongoDB + Mongoose | Database & ODM |
> | **E** | Express.js | REST API Framework |
> | **R** | React.js *(Frontend — separate repo)* | Client-side UI |
> | **N** | Node.js | JavaScript Runtime |

---

## ✨ Key Features

- 🔐 **JWT Authentication** — Stateless access & refresh token strategy
- 🔑 **Password Security** — bcrypt hashing (never stored as plain text)
- 📹 **Video Uploads** — Cloud media handling via Cloudinary + Multer
- 💬 **Comments & Replies** — Nested comment system
- 👍 **Likes / Dislikes** — On videos, comments, and tweets
- 📋 **Playlists** — Create, update, and manage video playlists
- 🔔 **Subscriptions** — Channel subscribe / unsubscribe with counts
- 📊 **Dashboard** — Channel analytics (views, subscribers, videos, likes)
- 🐦 **Tweets** — Short-form text posts per user
- 🩺 **Health Check** — `/healthcheck` endpoint for uptime monitoring
- 🌐 **CORS** — Fully configurable cross-origin resource sharing
- 📄 **Pagination** — MongoDB aggregation pipeline pagination
- 🧹 **Code Quality** — Prettier enforced across the codebase

---

## 🗂️ Project Structure

```
📦 Video-Hosting-Backend-API
├── 📁 public/
│   └── 📁 temp/                  # Temporary local file storage
├── 📁 src/
│   ├── 📁 controllers/           # Route handlers & business logic
│   │   ├── comment.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── healthcheck.controller.js
│   │   ├── like.controller.js
│   │   ├── playlist.controller.js
│   │   ├── subscription.controller.js
│   │   ├── tweet.controller.js
│   │   ├── user.controller.js
│   │   └── video.controller.js
│   ├── 📁 db/
│   │   └── index.js              # MongoDB connection setup
│   ├── 📁 middlewares/
│   │   ├── auth.middleware.js    # JWT verification middleware
│   │   └── multer.middleware.js  # File upload middleware
│   ├── 📁 models/                # Mongoose schemas & models
│   │   ├── comment.model.js
│   │   ├── like.model.js
│   │   ├── playlist.model.js
│   │   ├── subscription.model.js
│   │   ├── tweet.model.js
│   │   ├── user.model.js
│   │   └── video.model.js
│   ├── 📁 routes/                # Express route definitions
│   │   ├── comment.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── healthcheck.routes.js
│   │   ├── like.routes.js
│   │   ├── playlist.routes.js
│   │   ├── subscription.routes.js
│   │   ├── tweet.routes.js
│   │   ├── user.routes.js
│   │   └── video.routes.js
│   ├── 📁 utils/                 # Reusable utility helpers
│   │   ├── ApiError.js           # Custom error class
│   │   ├── ApiResponse.js        # Standardised API response
│   │   ├── asyncHandler.js       # Async error wrapper
│   │   └── cloudinary.js         # Cloudinary upload helper
│   ├── app.js                    # Express app & middleware setup
│   ├── constants.js              # App-wide constants (DB name, etc.)
│   └── index.js                  # Server entry point
├── .env.sample                   # Environment variable template
├── .gitignore
├── .prettierrc
├── .prettierignore
├── CONTRIBUTING.md
├── LICENSE
├── package.json
└── Readme.md
```

---

## 📐 Data Model (ER Diagram)

🔗 [View Full ER Diagram on Eraser.io](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share)

---

## 🔍 Understanding MongoDB Aggregation Pipelines

In this project, we extensively use **MongoDB Aggregation Pipelines** to perform complex data retrieval and transformation operations directly within the database. 

### What is an Aggregation Pipeline?
An aggregation pipeline consists of one or more "stages" that process documents. Each stage performs an operation on the input documents (e.g., filtering, grouping, calculating, or joining data) and passes the transformed documents to the next stage. It's highly efficient because the heavy processing happens on the database server rather than in the Node.js backend.

### Key Operators Used in this Project
Here are some of the most critical aggregation operators (`$`) we utilize, especially in controllers like `getUserChannelProfile` and `getWatchHistory`:

- **`$match`**: Acts like a standard query filter. It filters the document stream to allow only matching documents to pass into the next pipeline stage. We often use this as the very first stage to narrow down the dataset (e.g., finding a user by their `username` or `_id`).
- **`$lookup`**: Performs a "left outer join" with another collection. This is crucial for a relational-like data structure in NoSQL. For example, when fetching a video, we use `$lookup` to join the `users` collection to get the video owner's avatar and username. We also use it to fetch a channel's subscribers from the `subscriptions` collection.
- **`$addFields`**: Adds new fields to documents or overwrites existing ones. We use this to compute new properties on the fly. For instance, calculating `subscribersCount` by finding the length of the joined array.
- **`$size`**: Returns the number of elements in an array. Commonly used alongside `$addFields` to count things like total likes, total videos, or total subscribers.
- **`$cond`**: A ternary operator that evaluates a boolean condition and returns one of two values depending on the result (if-then-else logic). We use this to determine if the currently logged-in user is subscribed to a channel (e.g., checking if `req.user._id` exists in the subscribers list and returning `true` or `false`).
- **`$project`**: Reshapes each document in the stream. It can include, exclude, or add new fields. We use `$project` at the end of our pipelines to clean up the data and ensure we only send the necessary fields to the frontend, stripping out unnecessary nested arrays or sensitive data.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | ^4.x | REST API framework |
| **MongoDB** | Atlas | NoSQL document database |
| **Mongoose** | ^8.x | MongoDB ODM |
| **mongoose-aggregate-paginate-v2** | ^1.x | Aggregation pagination plugin |
| **jsonwebtoken** | ^9.x | JWT access & refresh tokens |
| **bcrypt** | ^5.x | Secure password hashing |
| **Cloudinary** | ^1.x | Cloud media upload & management |
| **Multer** | ^1.x | Multipart file upload middleware |
| **dotenv** | ^16.x | Environment variable loader |
| **cookie-parser** | ^1.x | HTTP cookie parsing |
| **cors** | ^2.x | Cross-Origin Resource Sharing |
| **nodemon** *(dev)* | ^3.x | Auto-restart on file changes |
| **Prettier** *(dev)* | ^3.x | Opinionated code formatter |

---

## ⚙️ Installation & Setup

### Prerequisites

Ensure the following are installed before proceeding:

- ✅ [Node.js](https://nodejs.org/) v18+
- ✅ [Git](https://git-scm.com/)
- ✅ [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- ✅ [Cloudinary](https://cloudinary.com/) account

---

### 1. Clone the Repository

```bash
git clone https://github.com/Mohammad-Asfin/Video-Hosting-Backend-API.git
cd Video-Hosting-Backend-API
```

---

### 2. Install All Dependencies

**Individual packages (with descriptions):**

```bash
# Dev — Auto-restart on file changes
npm i -D nodemon

# Dev — Opinionated code formatter
npm i -D prettier

# MongoDB object modeling (ODM)
npm i mongoose

# Fast, minimalist web framework for Node.js
npm i express

# Load environment variables from .env file
npm i dotenv

# HTTP cookie parsing middleware
npm i cookie-parser

# Node.js CORS middleware for Express
npm i cors

# Mongoose aggregation pipeline pagination plugin
npm i mongoose-aggregate-paginate-v2

# Secure password hashing library
npm i bcrypt

# JSON Web Token implementation
npm i jsonwebtoken

# Cloudinary Node SDK — media upload & transformation
npm i cloudinary

# Multipart/form-data middleware (file uploads)
npm i multer
```

**Or install everything at once:**

```bash
npm install
```

---

### 3. Configure Environment Variables

```bash
cp .env.sample .env
```

Open `.env` and fill in your values:

```env
PORT=8000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net

CORS_ORIGIN=*

# ⚠️ Use DIFFERENT secrets for access and refresh tokens
# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
ACCESS_TOKEN_SECRET=<your_64_byte_hex_secret_here>
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=<your_different_64_byte_hex_secret_here>
REFRESH_TOKEN_EXPIRY=10d

# Cloudinary (https://cloudinary.com/console)
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

**Generate secure secrets:**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Run this command **twice** — use one output for `ACCESS_TOKEN_SECRET` and a different one for `REFRESH_TOKEN_SECRET`.

> ⚠️ **Security Rules:**
> - Never use the same secret for both tokens
> - Use at least 64 random bytes (128 hex characters)
> - **NEVER commit `.env` to GitHub** — it's already in `.gitignore`

---

### 4. Run the Server

```bash
# Development (nodemon auto-restarts on changes)
npm run dev
```

Server running at → **`http://localhost:8000`**

---

## 📬 API Endpoints

### Base URL
```
http://localhost:8000/api/v1
```

### 👤 User — `/api/v1/user`

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|:----:|
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login & receive tokens | ❌ |
| `POST` | `/logout` | Logout current user | ✅ |
| `POST` | `/refresh-token` | Refresh access token | ❌ |
| `PATCH` | `/change-password` | Change current password | ✅ |
| `GET` | `/current-user` | Get logged-in user profile | ✅ |
| `PATCH` | `/update-account` | Update name & email | ✅ |
| `PATCH` | `/avatar` | Upload new avatar | ✅ |
| `PATCH` | `/cover-image` | Upload new cover image | ✅ |
| `GET` | `/c/:username` | Get channel profile | ✅ |
| `GET` | `/history` | Get watch history | ✅ |

### 🎥 Video — `/api/v1/videos`
### 💬 Comment — `/api/v1/comments`
### 👍 Like — `/api/v1/likes`
### 📋 Playlist — `/api/v1/playlist`
### 🔔 Subscription — `/api/v1/subscriptions`
### 🐦 Tweet — `/api/v1/tweets`
### 📊 Dashboard — `/api/v1/dashboard`
### 🩺 Health Check — `GET /api/v1/healthcheck`

---

## <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" width="32" height="32" align="center" alt="Postman"> Testing with Postman & Data Flow

This API relies on **MongoDB Atlas** for database storage and **Cloudinary** for media management. Here is a standard flow for testing authentication and media uploads using **Postman**:

> 💡 **Postman Tip:** To make testing easier, set up a Collection Variable named `Video Hosting` with the value `http://localhost:8000/api/v1`. You can then use `{{Video Hosting}}` in your URLs.

### 1️⃣ Register a New User (Uploads to Cloudinary & MongoDB)

*   **Method**: `POST`
*   **URL**: `{{Video Hosting}}/users/register`
*   **Body Type**: `form-data`

| Key | Type | Example Value | Description |
|-----|------|---------------|-------------|
| `fullName` | Text | `Levi Ackerman` | User's full name |
| `username` | Text | `leviackerman` | Unique username |
| `email` | Text | `levi@aot.com` | User's email |
| `password` | Text | `12345678` | Secure password |
| `avatar` | File | `Levi.jpg` | **Required.** Uploads to Cloudinary. |
| `coverImage` | File | `AOT cover.jpg` | **Optional.** Uploads to Cloudinary. |

> 🔄 **Data Flow:**
> *   **Cloudinary:** The `avatar` and `coverImage` files are processed by Multer and successfully uploaded to your Cloudinary Media Library. The secure URLs are returned.
> *   **MongoDB Atlas:** A new document is created in the `users` collection within your `videotube` database, securely storing the hashed password and the Cloudinary image URLs.

**Expected response:** `201 Created`

---

### 2️⃣ Login User (Generates JWT Tokens)

*   **Method**: `POST`
*   **URL**: `{{Video Hosting}}/users/login`
*   **Body Type**: `raw` (JSON)

```json
{
    "email": "levi@aot.com",
    "password": "12345678"
}
```

**Expected Response:** `200 OK`
The server validates the credentials and returns an `accessToken` (for authorizing requests) and a `refreshToken` (for getting new access tokens). These tokens are also securely set in HttpOnly cookies.

---

### 3️⃣ Get Current User

*   **Method**: `GET`
*   **URL**: `{{Video Hosting}}/users/current-user`
*   **Headers**: Requires the user to be logged in (cookies set by login).
*   **Body**: None

**Expected Response:** `200 OK`
```json
{
    "statusCode": 200,
    "data": {
        "_id": "6a5cb07f4822053c999663b8",
        "username": "leviackerman",
        "email": "levi@aot.com",
        "fullName": "Levi Ackerman",
        "avatar": "http://res.cloudinary.com/...",
        "coverImage": "http://res.cloudinary.com/...",
        "watchHistory": [],
        "createdAt": "2026-07-19T11:09:51.446Z",
        "updatedAt": "2026-07-21T09:09:51.918Z",
        "__v": 0
    },
    "message": "User fetched successfully",
    "success": true
}
```

---

### 4️⃣ Get User Channel Profile

*   **Method**: `GET`
*   **URL**: `{{Video Hosting}}/users/c/leviackerman`
*   **Headers**: Requires the user to be logged in (cookies set by login).
*   **Body**: None

**Expected Response:** `200 OK`
```json
{
    "statusCode": 200,
    "data": {
        "_id": "6a5cb07f4822053c999663b8",
        "username": "leviackerman",
        "email": "levi@aot.com",
        "fullName": "Levi Ackerman",
        "avatar": "http://res.cloudinary.com/...",
        "coverImage": "http://res.cloudinary.com/...",
        "subscribersCount": 0,
        "channelsSubscribedToCount": 0,
        "isSubscribed": false
    },
    "message": "User channel fetched successfully",
    "success": true
}
```

---

### 5️⃣ Get Watch History

*   **Method**: `GET`
*   **URL**: `{{Video Hosting}}/users/history`
*   **Headers**: Requires the user to be logged in (cookies set by login).
*   **Body**: None

**Expected Response:** `200 OK`
```json
{
    "statusCode": 200,
    "data": [],
    "message": "Watch history fetched successfully",
    "success": true
}
```

---

### 6️⃣ Change Password

*   **Method**: `POST`
*   **URL**: `{{Video Hosting}}/users/change-password`
*   **Headers**: Requires the user to be logged in (cookies set by login).
*   **Body Type**: `raw` (JSON)

```json
{
    "oldPassword": "123456789",
    "newPassword": "12345678"
}
```

**Expected Response:** `200 OK`
```json
{
    "statusCode": 200,
    "data": {},
    "message": "Password changed successfully",
    "success": true
}
```

---

### 7️⃣ Refresh Token

*   **Method**: `POST`
*   **URL**: `{{Video Hosting}}/users/refresh-token`
*   **Headers**: Requires the refresh token cookie.
*   **Body**: None

**Expected Response:** `200 OK`
```json
{
    "statusCode": 200,
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    },
    "message": "Access token refreshed",
    "success": true
}
```

---

### 8️⃣ Logout User (Clears Tokens)

*   **Method**: `POST`
*   **URL**: `{{Video Hosting}}/users/logout`
*   **Headers**: Requires the user to be logged in (cookies set by login).
*   **Body**: None

**Expected Response:** `200 OK`
```json
{
    "statusCode": 200,
    "data": {},
    "message": "User logged Out",
    "success": true
}
```

---

## 📄 npm Scripts

```json
{
  "dev": "nodemon -r dotenv/config --experimental-json-modules src/index.js"
}
```

---

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

**Quick steps:**

1. 🍴 Fork the repository
2. 🌿 Create a branch: `git checkout -b feature/your-feature`
3. ✅ Complete **all controller TODOs** in `src/controllers/`
4. 💅 Format code: `npx prettier --write .`
5. 📬 Open a Pull Request against `main`
6. 🔍 After review, your repo link gets added to this README

> Open issues at: [GitHub Issues](https://github.com/Mohammad-Asfin/Video-Hosting-Backend-API/issues)

---

## 🛡️ Security

If you discover a **security vulnerability**, please do **NOT** open a public issue.  
Instead, contact the maintainer directly via GitHub.

- Keep your `.env` file private — **never commit it**
- Rotate JWT secrets regularly in production
- Use environment-specific Cloudinary API keys

---

## 📜 License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for full details.

```
MIT License — Copyright (c) 2026 Mohammad Asfin
```

---

## 📎 Useful Links

| Resource | Link |
|----------|------|
| 🔗 ER Diagram | [Eraser.io Model](https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj?origin=share) |
| 🌐 GitHub Repository | [Video-Hosting-Backend-API](https://github.com/Mohammad-Asfin/Video-Hosting-Backend-API) |
| 🤝 Contributing Guide | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| ☁️ Cloudinary | [cloudinary.com](https://cloudinary.com/) |
| 🍃 MongoDB Atlas | [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) |
| 📗 Express Docs | [expressjs.com](https://expressjs.com/) |
| 🟢 Node.js | [nodejs.org](https://nodejs.org/) |

---

## 👨‍💻 Author

<div align="center">

**Mohammad Asfin**

[![GitHub](https://img.shields.io/badge/GitHub-Mohammad--Asfin-181717?style=for-the-badge&logo=github)](https://github.com/Mohammad-Asfin)

</div>

---

<div align="center">

*Built with ❤️ using the MERN Stack — MongoDB · Express · React · Node.js*

⭐ **Star this repo if you found it helpful!**

</div>