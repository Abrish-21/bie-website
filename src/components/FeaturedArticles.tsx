// src/components/FeaturedArticles.tsx

import { Clock, User } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPostsByType } from '../lib/data';

interface FeaturedArticlesProps {
  posts?: any[];
}

export function FeaturedArticles({ posts }: FeaturedArticlesProps) {
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedArticles = async () => {
      try {
        if (posts && posts.length > 0) {
          const filteredPosts = posts.filter((post: any) => post.type === 'featuredArticle').slice(0, 6);
          setFeaturedArticles(filteredPosts);
        } else {
          const apiPosts = await getPostsByType('featuredArticle');
          setFeaturedArticles(apiPosts.slice(0, 6));
        }
      } catch (error) {
        console.error('Failed to load featured articles:', error);
        setFeaturedArticles([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedArticles();
  }, [posts]);

  if (loading) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-black">Featured Stories</h2>
            <Link href="/posts" className="text-red-600 hover:text-red-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-5">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-black">Featured Stories</h2>
          <Link href="/posts" className="text-red-600 hover:text-red-700 font-medium">
            View all →
          </Link>
        </div>

        {featuredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured articles found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <Link key={index} href={`/posts/${article.slug}`} passHref>
                <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="relative">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-black text-white px-2 py-1 text-xs font-medium rounded">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-black group-hover:text-red-600 transition-colors mb-2 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center text-xs text-gray-500">
                      <User className="w-3 h-3 mr-1" />
                      <span className="mr-3">{article.author}</span>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
