// src/pages/posts/[slug].tsx

import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Clock, Eye, User, Calendar, Tag, BarChart2, MessageSquare } from "lucide-react";
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
// ⭐ FIX: Removed import for ImageWithFallback as we're implementing its logic directly
// import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { getPostBySlug } from '../../lib/data';

// Define a more robust Post interface to reflect what's stored and used
interface PostData {
  _id: string; // Assuming an ID field
  title: string;
  excerpt?: string;
  content?: string; // Made content optional to match potential 'string | undefined' from getPostBySlug
  fullContent?: string; // Often a duplicate of 'content' from TipTap
  imageUrl?: string; // The URL for the featured image
  category: string;
  type: 'featured' | 'market-watch' | 'opinion' | 'latest' | 'exclusive' | 'analysis' | string; // Ensure type flexibility
  tags?: string[];
  isDraft?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  slug: string;
  author: string;
  authorTitle?: string;
  readTime?: string; // Changed from number | string to just string for consistency in display
  views?: number;
  publishDate?: string; // Assuming date is stored as a string
  commentsCount?: number;
  marketImpact?: string;
  dataPoints?: { label: string; value: string | number }[]; // For marketUpdate posts
}

// ⭐ FIX: Removed the local ImageWithFallbackProps interface as it's no longer needed.


const PostDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<PostData | null>(null); // Use PostData interface
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug || typeof slug !== 'string') {
        setLoading(false); // Stop loading if slug is not valid
        return;
      }
      try {
        // ⭐ FIX: Cast fetchedPost to PostData to satisfy TypeScript
        const fetchedPost = (await getPostBySlug(slug)) as PostData;
        setPost(fetchedPost);
      } catch (error) {
        console.error('Failed to load post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) { // Simplified loading check
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
            <p className="mt-4 text-gray-700 text-lg">Loading post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <p className="text-gray-700 text-lg mb-6">Post not found.</p>
            <Link href="/" passHref>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold">Back to Homepage</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Determine which content field to use (prioritize fullContent if available, else content)
  const displayContent = post.fullContent || post.content || '';
  const displayImageUrl = post.imageUrl || "https://placehold.co/1200x400/cccccc/333333?text=No+Image"; // Fallback placeholder


  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800 flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex-grow">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Homepage</span>
          </Link>
        </div>

        <main className="max-w-4xl mx-auto space-y-10 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="flex flex-wrap items-center justify-center space-x-4 mb-4">
              <Badge className="bg-blue-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                {post.category}
              </Badge>
              {post.type === 'marketUpdate' && (
                 <Badge className="bg-green-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Market Update
                 </Badge>
              )}
              {post.type === 'opinion' && ( // Corrected from 'opinionPiece' to 'opinion' for consistency
                 <Badge className="bg-purple-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Opinion
                 </Badge>
              )}
               {post.type === 'featured' && ( // Corrected from 'featuredArticle' to 'featured' for consistency
                 <Badge className="bg-orange-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Featured Article
                 </Badge>
              )}
               {post.type === 'exclusive' && (
                 <Badge className="bg-red-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Exclusive
                 </Badge>
              )}
               {post.type === 'analysis' && (
                 <Badge className="bg-cyan-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Analysis
                 </Badge>
              )}
               {post.type === 'latest' && (
                 <Badge className="bg-gray-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Latest News
                 </Badge>
              )}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed italic max-w-3xl mx-auto">
              {post.excerpt}
            </p>
          </div>

          {/* ⭐ FIX: Replaced ImageWithFallback with standard <img> and onError for fallback ⭐ */}
          <figure className="my-8 relative rounded-xl overflow-hidden shadow-md">
            <img
              src={displayImageUrl}
              alt={post.title}
              className="w-full h-[350px] md:h-[450px] object-cover"
              onError={(e) => {
                // Only set fallback if the current src is not already the fallback
                if (e.currentTarget.src !== "https://placehold.co/1200x450/cccccc/333333?text=No+Featured+Image") {
                  e.currentTarget.src = "https://placehold.co/1200x450/cccccc/333333?text=No+Featured+Image";
                }
                e.currentTarget.onerror = null; // Prevent infinite loop if fallback also fails
              }}
            />
            <figcaption className="sr-only">{post.title}</figcaption>
          </figure>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center space-x-2 font-semibold text-gray-800">
                <User className="h-4 w-4 text-gray-500" />
                <span>{post.author}</span>
                {post.authorTitle && (
                    <span className="text-gray-500">, {post.authorTitle}</span>
                )}
              </span>
              <span className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{post.readTime || 'N/A'}</span>
              </span>
              <span className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <span>{(post.views || 0).toLocaleString()} views</span>
              </span>
              <span className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Published: {post.publishDate ? new Date(post.publishDate).toLocaleDateString() : 'N/A'}</span>
              </span>
              {post.commentsCount !== undefined && (
                <span className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span>{post.commentsCount} comments</span>
                </span>
              )}
            </div>
          </div>

          {post.type === 'marketUpdate' && post.marketImpact && (
            <Card className="bg-yellow-50 border-yellow-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-yellow-600" /> Market Impact
              </h3>
              <p className="text-base text-gray-700 mb-4">{post.marketImpact}</p>
              {post.dataPoints && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.dataPoints.map((data: any, i: number) => (
                    <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-sm font-medium text-gray-600">{data.label}:</span>
                      <span className="base font-semibold text-gray-800">{data.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag: string, i: number) => (
                <Badge key={i} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">
                  <Tag className="h-3 w-3 mr-1 text-gray-600"/>{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* ⭐ CRITICAL FIX & IMPROVEMENT: Render HTML content ⭐ */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            {displayContent ? (
              <div dangerouslySetInnerHTML={{ __html: displayContent }} />
            ) : (
              <p className="text-gray-500 italic text-center py-6">No detailed content available for this post.</p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/" passHref>
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-10 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetailPage;
