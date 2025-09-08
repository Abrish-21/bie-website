# Backend Setup Instructions

This document provides instructions for setting up the backend for your Next.js news publishing website.

## Prerequisites

- Node.js and npm (already installed)
- MongoDB (local or Atlas)

## Setup Steps

### 1. Environment Configuration

Copy the environment template and configure your variables:

```bash
cp env.example .env.local
```

Edit `.env.local` with your MongoDB connection string and JWT secret:

```env
MONGODB_URI=mongodb://localhost:27017/bie-website
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Create database: `bie-website`

#### Option B: MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local`

### 3. Run Data Migration

Migrate existing static data to the database:

```bash
node scripts/migrate.js
```

This will:
- Create a superadmin user (admin@bie-website.com / admin123)
- Create an admin user (content@bie-website.com / content123)
- Migrate all existing posts from `src/data/posts.ts`

### 4. Start the Development Server

```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login. Sets an `HttpOnly` cookie `authToken`.
- `POST /api/auth/logout` - User logout. Clears the `authToken` cookie.
- `POST /api/auth/register` - Create new user. Their status will be 'pending' until approved by a superadmin.

### Posts
- `GET /api/posts` - Get all posts (supports filtering by tag, type, category)
- `GET /api/posts/slug/[slug]` - Get post by slug
- `GET /api/posts/[id]` - Get post by ID
- `POST /api/posts` - Create new post (admin only)
- `PUT /api/posts/[id]` - Update post (author or superadmin only)
- `DELETE /api/posts/[id]` - Delete post (author or superadmin only)
- `GET /api/posts/tags` - Get all unique tags
- `GET /api/posts/categories` - Get all unique categories

### Users & Verification (Superadmin only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user
- `GET /api/admin/verify` - Get all users with 'pending' status.
- `PUT /api/admin/verify` - Approve a user by updating their status to 'active'.

## User Roles

### Superadmin
- Can create, update, and delete other admins
- Can delete any post
- Can approve new user registrations
- Full access to all features

### Admin
- Can create, update, and delete their own posts
- Cannot manage other users
- Cannot delete posts by other authors

## Authentication

The backend uses JWT for authentication. Upon successful login, an `HttpOnly` cookie named `authToken` is set in the user's browser. This cookie is automatically sent with subsequent requests to the API, authenticating the user for protected routes and actions. This method is more secure than storing tokens in `localStorage`.

## Frontend Integration

The backend is designed to work with your existing frontend. The API endpoints return data in the same format as your static data, so no frontend changes are required.

### Example API Usage

```javascript
import { postsAPI, authAPI } from '../lib/api';

// Get all posts
const { posts } = await postsAPI.getAll();

// Get posts filtered by tag
const { posts } = await postsAPI.getAll({ tag: 'technology' });

// Login
const { user } = await authAPI.login('admin@bie-website.com', 'admin123');

// Create post (requires authentication via cookie)
const newPost = await postsAPI.create({
  title: 'New Post',
  excerpt: 'Post excerpt',
  content: 'Full post content...',
  // ... other fields
});
```

## Security Features

- Password hashing with bcrypt
- JWT authentication via secure `HttpOnly` cookies
- Role-based access control
- CSRF protection (Next.js middleware with `SameSite=Lax` cookie)
- Input validation and sanitization
- MongoDB injection protection (via Mongoose)

## Production Deployment

1. Set up a production MongoDB instance
2. Generate a strong JWT secret
3. Configure environment variables
4. Run data migration
5. Deploy to your hosting platform

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Check your connection string and ensure MongoDB is running
2. **JWT Token Issues**: Verify JWT_SECRET is set correctly
3. **Migration Errors**: Ensure MongoDB is accessible and the database exists

### Logs

Check the console output for detailed error messages during development.

## Support

For issues or questions, check the error logs and ensure all environment variables are properly configured.

