// src/components/FeaturedArticles.tsx

import { Clock, User } from 'lucide-react';
import Link from 'next/link'; // Import Link
import allPosts from '../pages/posts'; // Correctly import allPosts as a data array
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';


export function FeaturedArticles() {
  // Filter for 'featuredArticle' types and slice to get the desired number
  const featuredArticles = allPosts.filter((post: { type: string; }) => post.type === 'featuredArticle').slice(0, 6); // Display up to 6 articles

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-black">Featured Stories</h2>
          {/* Updated "View all" link to a conceptual /posts page */}
          <Link href="/posts" className="text-red-600 hover:text-red-700 font-medium">
            View all →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article: { slug: any; imageUrl: string | Blob | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; category: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; excerpt: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; author: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; readTime: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
            // Wrap each article with a Link component
            <Link key={index} href={`/posts/${article.slug}`} passHref>
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative">
                  <img
                    src={article.imageUrl}
                    alt={typeof article.title === 'string' ? article.title : ''}
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
                    <span>{article.readTime}</span> {/* Changed from timeAgo to readTime to match allPosts */}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}