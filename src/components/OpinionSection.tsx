// src/components/OpinionSection.tsx

import { Clock, User, MessageCircle } from 'lucide-react';
import Link from 'next/link'; // Import Link
import { allPosts, OpinionPiece } from '../data/posts'; // Import allPosts and OpinionPiece type

export function OpinionSection() {
  // Filter allPosts to get opinion pieces and limit to 3 for this section
  const opinionPieces = allPosts.filter(post => post.type === 'opinionPiece').slice(0, 3) as OpinionPiece[];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-black">Opinion & Analysis</h2>
          {/* Updated "All opinions" link to a conceptual /posts page */}
          <Link href="/posts" className="text-red-600 hover:text-red-700 font-medium">
            All opinions →
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {opinionPieces.map((opinion, index) => ( // Using opinionPieces here
            <Link key={index} href={`/posts/${opinion.slug}`} passHref>
              <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="relative">
                  <img
                    src={opinion.imageUrl}
                    alt={opinion.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-purple-600 text-white px-2 py-1 text-xs font-medium rounded">
                      OPINION
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-black group-hover:text-red-600 transition-colors mb-3 leading-tight">
                    {opinion.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {opinion.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {/* Placeholder for author image - you might add this later */}
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <div className="font-medium text-black text-sm">{opinion.author}</div>
                        <div className="text-xs text-gray-500">{opinion.authorTitle}</div> {/* Using authorTitle */}
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{opinion.readTime}</span> {/* Changed from timeAgo to readTime */}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        <span>{opinion.commentsCount}</span> {/* Changed from comments to commentsCount */}
                      </div>
                    </div>
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
