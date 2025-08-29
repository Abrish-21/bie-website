const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bie-website';

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' }
}, { timestamps: true });

// Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  publishDate: { type: Date, default: Date.now },
  author: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  views: { type: Number, default: 0 },
  tags: [{ type: String }],
  type: { type: String, enum: ['featuredArticle', 'marketUpdate', 'opinionPiece'], required: true },
  slug: { type: String, required: true, unique: true },
  marketImpact: String,
  dataPoints: [{ label: String, value: String }],
  topic: String,
  authorTitle: String,
  commentsCount: { type: Number, default: 0 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// Sample posts data (simplified version)
const samplePosts = [
  {
    type: 'featuredArticle',
    slug: 'bie-profiles-15-women-leaders-in-ethiopia',
    title: "BIE profiles 15 women, their promises, resilience and future ambitions",
    excerpt: "Meet the inspiring women leaders driving change across Ethiopia's business landscape.",
    imageUrl: "https://images.unsplash.com/photo-1633457897190-8c8c23a12c4c?auto=format&fit=crop&q=80&w=1000&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXRpb3BpYW4lMjB3b21lbiUyMGxlYWRlcnN8ZW58MHx8MHx8fDA%3D",
    category: "PROFILES",
    readTime: "1 hour read",
    author: "Sara Kebede",
    views: 1500,
    tags: ["Leadership", "Women in Business", "Inspiration"],
    content: `<p class="text-lg leading-relaxed mb-6">In a special series, BIE shines a spotlight on 15 remarkable women who are not only leading their respective fields but are also shaping the future of Ethiopia's economy.</p>`
  },
  {
    type: 'marketUpdate',
    slug: 'manufacturing-jobs-surge-in-ethiopias-industrial-parks',
    title: "Manufacturing jobs surge as Ethiopia's industrial strategy pays off",
    excerpt: "New data shows 25% increase in manufacturing employment across major industrial parks.",
    imageUrl: "https://images.unsplash.com/photo-1666021074896-71f90d9c7d5f?auto=format&fit=crop&q=80&w=1000&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFudWZhY3R1cmluZyUyMGZhY3Rvcnl8ZW58MHx8MHx8fDA%3D",
    category: "MANUFACTURING",
    readTime: "2 hours read",
    author: "Daniel Assefa",
    views: 2800,
    tags: ["Industrialization", "Job Creation", "Economic Growth"],
    content: `<p class="text-lg leading-relaxed mb-6">Ethiopia's ambitious industrialization strategy is beginning to yield significant returns, with recent data indicating a substantial surge in manufacturing employment.</p>`,
    marketImpact: "Significant job creation and economic growth",
    dataPoints: [
      { label: "Job Growth", value: "25%" },
      { label: "Industrial Parks", value: "12" }
    ]
  },
  {
    type: 'opinionPiece',
    slug: 'tech-startups-raise-50m-series-a-funding',
    title: "Tech startups raising $50M series A funding rounds show confidence",
    excerpt: "Ethiopian fintech and agtech companies attract record international investment.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMHN0YXJ0dXB8ZW58MHx8MHx8fDA%3D",
    category: "TECHNOLOGY",
    readTime: "3 hours read",
    author: "Meklit Tadesse",
    authorTitle: "Tech Analyst",
    views: 3200,
    tags: ["Technology", "Startups", "Investment"],
    content: `<p class="text-lg leading-relaxed mb-6">The Ethiopian tech ecosystem is experiencing unprecedented growth, with several startups securing significant Series A funding rounds.</p>`,
    topic: "Technology Investment",
    commentsCount: 45
  }
];

async function migrateData() {
  try {
    console.log('Starting data migration...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Create superadmin user
    console.log('Creating superadmin user...');
    let superadmin;
    try {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      superadmin = await User.create({
        name: 'Super Admin',
        email: 'admin@bie-website.com',
        password: hashedPassword,
        role: 'superadmin'
      });
      console.log('Superadmin created:', superadmin.email);
    } catch (error) {
      if (error.code === 11000) {
        console.log('Superadmin already exists');
        superadmin = await User.findOne({ email: 'admin@bie-website.com' });
      } else {
        throw error;
      }
    }

    // Create admin user
    console.log('Creating admin user...');
    let admin;
    try {
      const hashedPassword = await bcrypt.hash('content123', 12);
      admin = await User.create({
        name: 'Content Admin',
        email: 'content@bie-website.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Admin created:', admin.email);
    } catch (error) {
      if (error.code === 11000) {
        console.log('Admin already exists');
        admin = await User.findOne({ email: 'content@bie-website.com' });
      } else {
        throw error;
      }
    }

    // Migrate posts
    console.log('Migrating posts...');
    let migratedCount = 0;
    
    for (const postData of samplePosts) {
      try {
        // Check if post already exists
        const existingPost = await Post.findOne({ slug: postData.slug });
        if (existingPost) {
          console.log(`Post "${postData.title}" already exists, skipping...`);
          continue;
        }

        // Create post
        const post = await Post.create({
          ...postData,
          authorId: admin._id
        });
        
        migratedCount++;
        console.log(`Migrated post: "${postData.title}"`);
      } catch (error) {
        console.error(`Failed to migrate post "${postData.title}":`, error.message);
      }
    }

    console.log(`Migration completed! Migrated ${migratedCount} posts.`);
    
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed.');
    
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateData();

