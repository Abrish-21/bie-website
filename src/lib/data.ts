import { postsAPI } from './api';

// New: Define the Author interface for type safety
export interface Author {
  _id: string;
  name: string;
  email: string;
  profilePictureUrl?: string;
}

export interface Post {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  imageUrl: string;
  category: string;
  readTime: number | string;
  // Fix: The author is now an object, not a string
  author: Author;
  authorTitle?: string;
  tags?: string[];
  type: 'featuredArticle' | 'marketUpdate' | 'opinionPiece' | string;
  views?: number;
  publishDate?: string | Date;
  fullContent?: string;
}

// Get all posts (from API -> DB)
export const getPosts = async (): Promise<Post[]> => {
  try {
    const data = await postsAPI.getAll({ limit: 100 });
    return data.posts as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Get posts by type
export const getPostsByType = async (type: string): Promise<Post[]> => {
  try {
    const data = await postsAPI.getAll({ type: type as any, limit: 100 });
    return data.posts as Post[];
  } catch (error) {
    console.error(`Error fetching posts by type ${type}:`, error);
    return [];
  }
};

// Get posts by category
export const getPostsByCategory = async (category: string): Promise<Post[]> => {
  try {
    const data = await postsAPI.getAll({ category, limit: 100 });
    return data.posts as Post[];
  } catch (error) {
    console.error(`Error fetching posts by category ${category}:`, error);
    return [];
  }
};

// Get posts by tag
export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  try {
    const data = await postsAPI.getAll({ tag, limit: 100 });
    return data.posts as Post[];
  } catch (error) {
    console.error(`Error fetching posts by tag ${tag}:`, error);
    return [];
  }
};

// Get a single post by slug
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const data = await postsAPI.getBySlug(slug);
    return (data.post || data) as Post;
  } catch (error) {
    console.error(`Error fetching post by slug ${slug}:`, error);
    return null;
  }
};

// Get all unique tags
export const getTags = async (): Promise<string[]> => {
  try {
    const data = await postsAPI.getTags();
    return data.tags || [];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
};

// Get all unique categories
export const getCategories = async (): Promise<string[]> => {
  try {
    const data = await postsAPI.getCategories();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Get trending posts (most viewed)
export const getTrendingPosts = async (limit: number = 5): Promise<Post[]> => {
  try {
    const data = await postsAPI.getAll({ limit: 200 });
    const posts = (data.posts as Post[]).sort((a, b) => (b.views || 0) - (a.views || 0));
    return posts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    return [];
  }
};

// Get latest posts
export const getLatestPosts = async (limit: number = 10): Promise<Post[]> => {
  try {
    const data = await postsAPI.getAll({ limit: 200 });
    const posts = (data.posts as Post[]).sort((a, b) =>
      new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime()
    );
    return posts.slice(0, limit);
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
};

// Search posts by query (client-side filter)
export const searchPosts = async (query: string): Promise<Post[]> => {
  try {
    const data = await postsAPI.getAll({ limit: 200 });
    const posts = data.posts as Post[];
    const searchTerm = query.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      (post.fullContent || post.content || '').toLowerCase().includes(searchTerm) ||
      // Fix: Now correctly checks the name property of the author object
      post.author.name.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
  } catch (error) {
    console.error('Error searching posts:', error);
    return [];
  }
};
