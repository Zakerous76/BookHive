#  BookHive


![JavaScript](https://img.shields.io/badge/JavaScript-ES7-yellow?logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?logo=redux)
![MUI](https://img.shields.io/badge/MUI-Material-blue?logo=mui)
![Render](https://img.shields.io/badge/Deployed%20on-Render-blue?logo=render)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

BookHive is a full-stack MERN application that connects readers with free books
via the [Gutendex API](https://gutendex.com/).  
Users can browse and search for books, download them in different formats, and
leave reviews with ratings.

> **Live Demo**: [https://bookhive-hyx1.onrender.com]

---

## ✨ Features

- 🔐 **Authentication & Authorization**

  - User login/signup with JWT.
  - Role-based access (admin & regular users).

- 📖 **Book Discovery**

  - Integrated with the Gutendex API.
  - Search and filter books.
  - Direct download links for multiple formats.

- ⭐ **Community Reviews**

  - Star ratings & text reviews.
  - Each review is linked to both the user and the book.

- 🎨 **Responsive UI**
  - Built with React, MUI, and custom theming.
  - Dark/light mode support.

---

## 🏗 Tech Stack

**Frontend**

- React (Vite)
- Redux Toolkit (state management)
- Material UI (styling)

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- REST API architecture

**Other**

- Hosted on [Render](https://render.com/)
- API data from [Gutendex](https://gutendex.com/)

---

## 📂 Project Structure

```
.
├── backend/             # Express server + MongoDB models
│   ├── src/
│   ├── dist/            # Built frontend production code served by Express
│   └── ...
├── frontend/            # React app (Vite + MUI)
│   └── src/
│   └── ...
```

---

## ⚡ Getting Started (Development)

### 1. Clone the repo

```bash
git clone https://github.com/Zakerous76/BookHive.git
cd BookHive
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Environment variables

Create a `.env` file in `backend/` with:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```


### 4. Run locally

```bash
# Backend (from /backend)
npm run dev

# Frontend (from /frontend)
npm run dev
```

---

## 🚀 Deployment (Production)

- The frontend is built with Vite (`npm run build` in `/frontend`).
- The output is copied into `/backend/dist`, by running (`npm run build:ui`) check `/backend/package.json`.
- Express serves the static frontend files and also provides the REST API.
- (In production, The backend (with bundled frontend) is deployed as a **single Render web
  service**.)

---

## 📌 Future Improvements

- AI-based book recommendations
- Better caching for Gutendex results.
- Social login (Google, GitHub).

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

- [Fullstackopen](https://fullstackopen.com/en/) curriculum for the foundation.
- [Gutendex API](https://gutendex.com/) for book data.
- [Render](https://render.com/) for deployment.
