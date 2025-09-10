import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  readTime: number; 
  publishDate: Date;
  authorId: mongoose.Types.ObjectId; // Kept this as the single source of truth for the author
  views: number;
  tags: string[];
  type: 'featured' | 'market-watch' | 'opinion' | 'latest';
  slug: string;
  isDraft: boolean; 
  // Additional fields for different post types
  marketImpact?: string;
  dataPoints?: { label: string; value: string }[];
  topic?: string;
  authorTitle?: string;
  commentsCount?: number;
  createdAt: Date;
  updatedAt: Date;
  seoTitle?: string;
  seoDescription?: string;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [500, 'Excerpt cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  readTime: {
    type: Number,
    // Removed 'required: true' to handle older documents gracefully
    default: 0
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author ID is required']
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  type: {
    type: String,
    enum: ['featured', 'market-watch', 'opinion', 'latest'],
    // Removed 'required: true' to handle older documents gracefully
    default: 'latest'
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true
  },
  isDraft: {
    type: Boolean,
    default: false
  },
  seoTitle: {
    type: String,
    trim: true,
    maxlength: 150
  },
  seoDescription: {
    type: String,
    trim: true,
    maxlength: 300
  },
  // Market Update specific fields
  marketImpact: {
    type: String,
    trim: true
  },
  dataPoints: [{
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }],
  // Opinion Piece specific fields
  topic: {
    type: String,
    trim: true
  },
  authorTitle: {
    type: String,
    trim: true
  },
  commentsCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create slug from title before saving
postSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  
  next();
});

// Index for better query performance
postSchema.index({ slug: 1 });
postSchema.index({ tags: 1 });
postSchema.index({ authorId: 1 });
postSchema.index({ type: 1 });
postSchema.index({ publishDate: -1 });

export default mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
