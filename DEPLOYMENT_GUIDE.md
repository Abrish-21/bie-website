# Full-Stack Deployment Guide

This guide will help you deploy your complete Next.js + MongoDB news publishing website.

## 🚀 Deployment Options

### Option 1: Vercel + MongoDB Atlas (Recommended)

#### 1. MongoDB Atlas Setup
1. Create a MongoDB Atlas account at [mongodb.com](https://mongodb.com)
2. Create a new cluster (free tier available)
3. Create a database user with read/write permissions
4. Get your connection string
5. Add your IP address to the whitelist

#### 2. Environment Variables
Set these environment variables in your deployment platform:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bie-website
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

#### 3. Vercel Deployment
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Option 2: Railway + MongoDB Atlas

#### 1. Railway Setup
1. Create a Railway account
2. Connect your GitHub repository
3. Add environment variables
4. Deploy

### Option 3: DigitalOcean App Platform

#### 1. DigitalOcean Setup
1. Create a DigitalOcean account
2. Create a new app from your GitHub repository
3. Add environment variables
4. Deploy

## 🔧 Pre-Deployment Checklist

### 1. Environment Configuration
- [ ] Set up MongoDB Atlas cluster
- [ ] Configure environment variables
- [ ] Test database connection locally
- [ ] Run data migration

### 2. Security
- [ ] Generate strong JWT secret
- [ ] Update MongoDB connection string
- [ ] Set up proper CORS if needed
- [ ] Configure authentication properly

### 3. Performance
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up caching headers
- [ ] Test API endpoints

## 📋 Deployment Steps

### Step 1: Prepare Your Code
```bash
# Ensure all dependencies are installed
npm install

# Build the project locally to test
npm run build

# Test the production build
npm start
```

### Step 2: Database Setup
```bash
# Run migration to populate database
npm run migrate
```

### Step 3: Environment Variables
Create a `.env.production` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bie-website
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_API_URL=https://your-domain.com/api
```

### Step 4: Deploy
1. Push your code to GitHub
2. Connect to your deployment platform
3. Add environment variables
4. Deploy

## 🔍 Post-Deployment Testing

### 1. API Endpoints
Test these endpoints after deployment:

```bash
# Test backend connection
curl https://your-domain.com/api/test

# Test posts API
curl https://your-domain.com/api/posts

# Test authentication
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bie-website.com","password":"admin123"}'
```

### 2. Frontend Pages
- [ ] Homepage loads correctly
- [ ] Post detail pages work
- [ ] Admin login works
- [ ] Admin dashboard displays posts

### 3. Database
- [ ] Posts are accessible
- [ ] User authentication works
- [ ] Admin functions work

## 🛠️ Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
- Check your connection string
- Verify IP whitelist
- Ensure database user has correct permissions

#### 2. JWT Token Issues
- Verify JWT_SECRET is set
- Check token expiration
- Ensure proper token format

#### 3. API Endpoints Not Working
- Check environment variables
- Verify API routes are correct
- Check server logs for errors

#### 4. Frontend Not Loading Data
- Check API URL configuration
- Verify CORS settings
- Check browser console for errors

### Debug Commands
```bash
# Check MongoDB connection
mongosh "your-connection-string"

# Test API locally
curl http://localhost:3000/api/test

# Check environment variables
echo $MONGODB_URI
```

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit secrets to version control
- Use strong, unique secrets
- Rotate secrets regularly

### 2. Database Security
- Use strong passwords
- Enable network access controls
- Regular backups

### 3. API Security
- Validate all inputs
- Implement rate limiting
- Use HTTPS in production

## 📊 Monitoring

### 1. Application Monitoring
- Set up error tracking (Sentry)
- Monitor API response times
- Track user interactions

### 2. Database Monitoring
- Monitor connection pool usage
- Track query performance
- Set up alerts for issues

### 3. Performance Monitoring
- Monitor page load times
- Track API response times
- Monitor server resources

## 🔄 Maintenance

### 1. Regular Updates
- Keep dependencies updated
- Monitor security advisories
- Update Node.js version

### 2. Database Maintenance
- Regular backups
- Monitor storage usage
- Optimize queries

### 3. Content Management
- Regular content updates
- Monitor user engagement
- Backup content

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review server logs
3. Test locally first
4. Check environment variables
5. Verify database connection

## 🎉 Success!

Once deployed, your full-stack news website will have:

- ✅ MongoDB database with posts and users
- ✅ JWT authentication system
- ✅ Role-based access control
- ✅ API endpoints for all CRUD operations
- ✅ Frontend integration with API
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ Production-ready deployment

Your website is now ready for production use! 🚀

