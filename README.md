# 📝 NoteBuild - Modern Note Taking Application

## 🌟 Key Features

### 🔐 Authentication & Security
- Secure user registration and login system
- JWT-based authentication with access and refresh tokens
- Password hashing and encryption
- Protected API routes
- HTTP-only cookies for enhanced security

### 👤 User Management
- Custom user profiles
- Profile picture upload with Cloudinary integration
- Username and email uniqueness validation
- Password strength requirements
- User session management

### 📋 Note Management
- Create, read, update, and delete notes
- Rich text editing capabilities
- Note categorization and organization
- Search functionality
- Real-time updates

### 💎 Technical Features
- RESTful API architecture
- MongoDB database integration
- Cloudinary media storage
- Error handling middleware
- Async operations handling
- Input validation and sanitization

## 🛠️ Tech Stack

### Frontend
```javascript
{
  "dependencies": {
    "react": "latest",
    "vite": "latest",
    "tailwindcss": "for styling",
    "axios": "for API calls",
    "react-router-dom": "for routing"
  }
}
```

### Backend
```javascript
{
  "dependencies": {
    "express": "for server",
    "mongoose": "for database",
    "cloudinary": "for media storage",
    "jsonwebtoken": "for authentication",
    "bcrypt": "for password hashing"
  }
}
```

## 📁 Project Structure

```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- Cloudinary Account
- Git

### Installation Steps

1. **Clone Repository**
```bash
git clone <repository-url>
cd NoteBuild
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

3. **Backend Setup**
```bash
cd backend
npm install
```

4. **Environment Configuration**
Create `.env` file in backend:
```env
PORT=8000
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ACCESS_TOKEN_SECRET=your_access_token
REFRESH_TOKEN_SECRET=your_refresh_token
```

5. **Start Backend**
```bash
npm run dev
```

## 🔗 API Endpoints

### Authentication
```
POST /api/users/register - Register new user
POST /api/users/login - User login
GET /api/users/logout - User logout
GET /api/users/current-user - Get current user
```

### Notes
```
GET /api/notes - Get all notes
POST /api/notes - Create note
PUT /api/notes/:id - Update note
DELETE /api/notes/:id - Delete note
```

## 🔒 Security Features

- Password Hashing
- JWT Authentication
- HTTP-only Cookies
- CORS Protection
- Input Validation
- XSS Protection
- Rate Limiting

## 🎯 Future Enhancements

- [ ] Note Sharing
- [ ] Collaborative Editing
- [ ] Tags and Categories
- [ ] Rich Text Editor
- [ ] Dark Mode
- [ ] Mobile App Version
- [ ] Export/Import Notes

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open Pull Request

## 📜 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React.js Community
- Node.js Community
- MongoDB Team
- Cloudinary
- All Contributors

## 📞 Contact & Support

- Create an issue for bug reports
- Submit PRs for contributions
- Contact maintainers for other queries

---
Made with ❤️ by [Your Name]