# Devnovate Blogging Platform

A modern, full-featured blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring user authentication, admin moderation, and trending content discovery.

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based signup/login with role-based access (User/Admin)
- **Blog Management**: Create, submit, and manage blog posts
- **Admin Moderation**: Approve/reject blog submissions with content oversight
- **Content Discovery**: Search, filter, and trending blog sections
- **Responsive Design**: Mobile-first design with Tailwind CSS

### User Features
- ✅ Create and submit blogs for admin approval
- ✅ View and interact with published content (likes, comments, views)
- ✅ Personal blog dashboard with status tracking
- ✅ Search and category filtering
- ✅ Trending blogs based on engagement metrics

### Admin Features
- ✅ Dashboard with platform analytics and metrics
- ✅ Pending review queue for blog moderation
- ✅ Content management (approve, reject, hide, delete)
- ✅ Platform performance tracking and insights
- ✅ User activity monitoring

### Technical Features
- ✅ Modern React with Hooks and Context API
- ✅ Responsive UI with Tailwind CSS
- ✅ Mock data simulation for demonstration
- ✅ Component-based architecture
- ✅ State management with React Context
- ✅ Local storage for session persistence

## 📁 Project Structure

```
Vibe-Lovable-Hackathon/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── LandingPage.js
│   │   ├── UserDashboard.js
│   │   └── AdminDashboard.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── data/
│   │   └── mockData.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/your-username/devnovate-blog-platform.git
cd Vibe-Lovable-Hackathon
```

2. **Install dependencies**
```bash
npm install jsonwebtoken
npm install
```

3. **Install Tailwind CSS**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Start the development server**
```bash
npm start
```

5. **Open your browser**
Navigate to `http://localhost:3000` to see the application.

## 📋 Usage Guide

### Getting Started
1. **Landing Page**: Choose between User or Admin registration
2. **Authentication**: Sign up or log in with your credentials
3. **Dashboard**: Access role-specific features based on your account type

### For Users (Writers)
1. **Home Tab**: Browse and interact with published blogs
2. **Trending Tab**: Discover popular content based on engagement
3. **Write Tab**: Create and submit new blog posts
4. **My Blogs Tab**: Manage your submitted and published content

### For Admins
1. **Dashboard**: View platform metrics and recent activity
2. **Pending Reviews**: Approve or reject submitted blog posts
3. **Published**: Manage live content (hide/delete if needed)
4. **Analytics**: Monitor platform performance and user engagement

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3b82f6 (Interactive elements, CTAs)
- **Purple Gradient**: #667eea to #764ba2 (Branding, highlights)
- **Success Green**: #10b981 (Approved content, positive actions)
- **Warning Yellow**: #f59e0b (Pending content, alerts)
- **Danger Red**: #ef4444 (Rejected content, destructive actions)

### Typography
- **Font Family**: Inter (Modern, readable sans-serif)
- **Headings**: Font weights 600-700 for hierarchy
- **Body Text**: Font weight 400 with optimal line spacing

### Components
- **Cards**: Clean white backgrounds with subtle shadows
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Consistent styling with focus states
- **Navigation**: Clear hierarchy with active state indicators

## 🔧 Technical Implementation

### State Management
```javascript
// AuthContext provides user authentication state
const { user, login, signup, logout, isLoading } = useAuth();

// Local state for blog management
const [blogs, setBlogs] = useState(mockBlogs);
const [activeTab, setActiveTab] = useState('home');
```

### Key Functions
```javascript
// User authentication
const login = async (email, password, userType) => { ... }
const signup = async (email, password, name, userType) => { ... }

// Blog management
const handleCreateBlog = (blogData) => { ... }
const handleApproveBlog = (blogId) => { ... }
const handleLike = (blogId) => { ... }
```

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Breakpoint-specific layouts and components
- Touch-friendly interface elements
- Optimized for various screen sizes

## 📊 Data Structure

### User Object
```javascript
{
  id: "unique_id",
  email: "user@example.com",
  name: "User Name",
  type: "user" | "admin",
  avatar: "avatar_url",
  createdAt: "ISO_date_string"
}
```

### Blog Object
```javascript
{
  id: "unique_id",
  title: "Blog Title",
  content: "Blog content...",
  author: "Author Name",
  authorId: "author_id",
  status: "pending" | "published" | "rejected" | "hidden",
  likes: 0,
  comments: 0,
  views: 0,
  category: "React" | "Node.js" | "Database" | ...,
  createdAt: "ISO_date_string"
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure build settings if needed

## 🔄 Converting to Full MERN Stack

To convert this frontend-only demo to a complete MERN application:

### Backend Setup (Node.js + Express)
```javascript
// Required API endpoints
POST /api/auth/login
POST /api/auth/register
GET /api/blogs
POST /api/blogs
PUT /api/blogs/:id/approve
DELETE /api/blogs/:id
GET /api/analytics
```

### Database Schema (MongoDB)
```javascript
// Users Collection
{
  _id: ObjectId,
  email: String,
  password: String, // hashed
  name: String,
  type: String,
  avatar: String,
  createdAt: Date
}

// Blogs Collection
{
  _id: ObjectId,
  title: String,
  content: String,
  author: ObjectId, // reference to Users
  status: String,
  likes: [ObjectId], // array of user references
  comments: [CommentSchema],
  views: Number,
  category: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Authentication Middleware
```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request
