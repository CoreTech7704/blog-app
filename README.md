# Core Blog 

Core Blog is a developer-focused blogging platform built with Node.js, Express, MongoDB, and EJS, emphasizing performance, security, and clean architecture.

It is designed to evolve gradually starting with server-rendered pages and later transitioning to an API-driven React frontend, while keeping the admin panel server-rendered for control and auditing.

## ✨ Features

- Secure authentication (sessions, bcrypt, rate limiting)
- Blog creation with cover image upload
- Draft & published blog support
- Author-only access control
- Server-side rendering with EJS (SEO-friendly)
- Clean, scalable folder structure
- API-ready architecture for future React frontend
- Minimal, developer-centric UI

## 🛠 Tech Stack

- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Frontend (V1): EJS, Bootstrap
- Auth: Sessions, bcrypt
- File Uploads: Multer
- Security: Helmet, rate limiting
- Future Frontend: React (V2)

## 📂 Project Structure
```
.
├── models/
├── routes/
│   ├── web/        # EJS routes
│   └── api/        # API routes (V2)
├── middleware/
├── views/
├── public/
├── index.js
└── README.md
```

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/your-username/core-blog.git
cd core-blog
```
2. Install dependencies
```bash
npm install
```

3. Environment variables

- Create a .env file:
```bash
MONGO_URL=mongodb://localhost:27017/core-blog
SESSION_SECRET=your_long_random_secret
```
4. Run the app
```bash
npm run dev
```

- App will be available at:
http://localhost:8000

## 🔐 Authentication Notes

- Passwords are hashed using bcrypt
- Sessions are stored securely
- Rate limiting is applied to auth routes
- Admin logic is server-side only

## 🧭 Roadmap

### V1 (Under Progress)-Core blogging features
- SSR with EJS
- Secure authentication
- Image uploads
- Homepage & blog views
### V2 (Planned)
- React frontend
- API-only public backend
- Pagination & search
- Comments & interactions
- Email verification

## 🤝 Contributing

This project follows an open-source, improvement-driven approach.
Feel free to fork, improve, and adapt it for your own needs.

## 📜 License

MIT License

## 👤 Author

Patel Sarvam  
GitHub: [@CoreTech7704](https://github.com/CoreTech7704)  
LinkedIn: [@Sarvam-Patel](https://www.linkedin.com/in/sarvam-patel-89a414300/)

Built with a focus on developers, performance, and clean architecture.