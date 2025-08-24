// src/pages/posts/[slug].tsx

import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { ArrowLeft, Clock, Eye, User, Calendar, Tag, BarChart2, MessageSquare } from "lucide-react"; // Removed BookOpen as it wasn't explicitly used
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
// Import createSlug, allPosts, and all Post types from the new shared data file
import { allPosts, FeaturedArticle, MarketUpdate, OpinionPiece } from '../../data/posts';


const PostDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const post = allPosts.find(p => p.slug === slug);

  if (router.isFallback || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-700 text-center text-lg">Loading post or post not found...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
              {post.type === 'opinionPiece' && (
                 <Badge className="bg-purple-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Opinion
                 </Badge>
              )}
               {post.type === 'featuredArticle' && (
                 <Badge className="bg-orange-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                   Featured Article
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

          <figure className="my-8 relative rounded-xl overflow-hidden shadow-md">
            <ImageWithFallback
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[350px] md:h-[450px] object-cover"
            />
            <figcaption className="sr-only">{post.title}</figcaption>
          </figure>

          <div className="border-t border-b border-gray-200 py-4 mb-6">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
              <span className="flex items-center space-x-2 font-semibold text-gray-800">
                <User className="h-4 w-4 text-gray-500" />
                <span>{post.author}</span>
                {(post.type === 'opinionPiece' && post.authorTitle) && (
                    <span className="text-gray-500">, {post.authorTitle}</span>
                )}
              </span>
              <span className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{post.readTime}</span>
              </span>
              <span className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-gray-500" />
                <span>{post.views.toLocaleString()} views</span>
              </span>
              <span className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Published: {post.publishDate}</span>
              </span>
              {(post.type === 'opinionPiece' && post.commentsCount !== undefined) && (
                <span className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                  <span>{post.commentsCount} comments</span>
                </span>
              )}
            </div>
          </div>

          {/* Conditional Content for Market Updates */}
          {(post.type === 'marketUpdate' && post.marketImpact) && (
            <Card className="bg-yellow-50 border-yellow-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-yellow-600" /> Market Impact
              </h3>
              <p className="text-base text-gray-700 mb-4">{post.marketImpact}</p>
              {post.dataPoints && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.dataPoints.map((data, i) => (
                    <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
                      <span className="text-sm font-medium text-gray-600">{data.label}:</span>
                      <span className="text-base font-semibold text-gray-800">{data.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* Tags for Featured Articles */}
          {(post.type === 'featuredArticle' && post.tags && post.tags.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag, i) => (
                <Badge key={i} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1.5 rounded-full">
                  <Tag className="h-3 w-3 mr-1 text-gray-600"/>{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Full Content */}
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: post.fullContent }} />
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
