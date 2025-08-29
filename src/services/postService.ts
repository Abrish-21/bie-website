import Post, { IPost } from '../models/Post';
import mongoose from 'mongoose';

export class PostService {
  // Create a new post
  static async createPost(postData: {
    title: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    category: string;
    readTime: string;
    author: string;
    authorId: mongoose.Types.ObjectId;
    tags: string[];
    type: 'featuredArticle' | 'marketUpdate' | 'opinionPiece';
    marketImpact?: string;
    dataPoints?: { label: string; value: string }[];
    topic?: string;
    authorTitle?: string;
    commentsCount?: number;
  }): Promise<IPost> {
    const post = new Post(postData);
    return await post.save();
  }

  // Get all posts with optional filtering
  static async getPosts(filters: {
    tag?: string;
    type?: 'featuredArticle' | 'marketUpdate' | 'opinionPiece';
    category?: string;
    limit?: number;
    skip?: number;
  } = {}): Promise<{ posts: IPost[]; total: number }> {
    const { tag, type, category, limit = 10, skip = 0 } = filters;
    
    const query: any = {};
    
    if (tag) {
      query.tags = { $in: [tag] };
    }
    
    if (type) {
      query.type = type;
    }
    
    if (category) {
      query.category = category;
    }

    const [posts, total] = await Promise.all([
      Post.find(query)
        .sort({ publishDate: -1 })
        .limit(limit)
        .skip(skip),
      Post.countDocuments(query)
    ]);

    return { posts, total };
  }

  // Get post by slug
  static async getPostBySlug(slug: string): Promise<IPost | null> {
    const post = await Post.findOne({ slug });
    
    if (post) {
      // Increment view count
      await Post.findByIdAndUpdate(post._id, { $inc: { views: 1 } });
    }
    
    return post;
  }

  // Get post by ID
  static async getPostById(id: string): Promise<IPost | null> {
    return await Post.findById(id);
  }

  // Update post
  static async updatePost(
    id: string,
    updateData: Partial<{
      title: string;
      excerpt: string;
      content: string;
      imageUrl: string;
      category: string;
      readTime: string;
      tags: string[];
      type: 'featuredArticle' | 'marketUpdate' | 'opinionPiece';
      marketImpact: string;
      dataPoints: { label: string; value: string }[];
      topic: string;
      authorTitle: string;
      commentsCount: number;
    }>
  ): Promise<IPost | null> {
    const post = await Post.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    return post;
  }

  // Delete post
  static async deletePost(id: string): Promise<boolean> {
    const result = await Post.findByIdAndDelete(id);
    return !!result;
  }

  // Get posts by author
  static async getPostsByAuthor(authorId: string): Promise<IPost[]> {
    return await Post.find({ authorId })
      .sort({ publishDate: -1 });
  }

  // Get posts by type
  static async getPostsByType(type: 'featuredArticle' | 'marketUpdate' | 'opinionPiece'): Promise<IPost[]> {
    return await Post.find({ type })
      .sort({ publishDate: -1 });
  }

  // Get popular posts (by views)
  static async getPopularPosts(limit: number = 5): Promise<IPost[]> {
    return await Post.find({})
      .sort({ views: -1 })
      .limit(limit);
  }

  // Get recent posts
  static async getRecentPosts(limit: number = 5): Promise<IPost[]> {
    return await Post.find({})
      .sort({ publishDate: -1 })
      .limit(limit);
  }

  // Search posts
  static async searchPosts(searchTerm: string, limit: number = 10): Promise<IPost[]> {
    const searchRegex = new RegExp(searchTerm, 'i');
    
    return await Post.find({
      $or: [
        { title: searchRegex },
        { excerpt: searchRegex },
        { content: searchRegex },
        { tags: searchRegex }
      ]
    })
      .sort({ publishDate: -1 })
      .limit(limit);
  }

  // Get all unique tags
  static async getAllTags(): Promise<string[]> {
    const posts = await Post.find({}, 'tags');
    const allTags = posts.flatMap(post => post.tags);
    return [...new Set(allTags)];
  }

  // Get all unique categories
  static async getAllCategories(): Promise<string[]> {
    const categories = await Post.distinct('category');
    return categories;
  }
}

