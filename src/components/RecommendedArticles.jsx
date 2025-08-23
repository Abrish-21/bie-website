// src/components/RecommendedArticles.jsx

import { useRouter } from "next/router";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

// Helper: turn title into slug
const createSlug = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const recommendedArticles = [
  {
    title: "Banks to Introduce Digital Birr Payment System",
    excerpt: "Ethiopian banks move toward full digital transaction adoption by 2026.",
    thumbnail:
      "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    timestamp: "1 day ago",
  },
  {
    title: "Ethiopian Coffee Exports Surge",
    excerpt: "Coffee revenues jump 12% thanks to global demand and improved logistics.",
    thumbnail:
      "https://images.unsplash.com/photo-1714113312553-328e7c2d4d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    timestamp: "3 days ago",
  },
];

export default function RecommendedArticles() {
  return (
    <div className="space-y-6">
      <h2 className="news-sidebar-title text-xl font-bold text-gray-900 uppercase tracking-wide border-b pb-2 mb-4">
        Recommended For You
      </h2>
      {recommendedArticles.map((item, idx) => {
        const slug = createSlug(item.title);
        return (
          <Link
            key={idx}
            href={{
              pathname: "/business-pulse/[slug]",
              query: {
                title: item.title,
                excerpt: item.excerpt,
                thumbnail: item.thumbnail,
                timestamp: item.timestamp,
                description: item.excerpt, // Ensure description is passed
                slug: slug // IMPORTANT: Add the slug to the query object
              },
            }}
            as={`/business-pulse/${slug}`} // IMPORTANT: Add the `as` prop for pretty URLs
          >
            <Card className="hover:shadow-lg transition-shadow border-0 shadow-sm">
              <CardContent className="flex items-start p-4 space-x-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1 hover:text-yellow-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.excerpt}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.timestamp}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}