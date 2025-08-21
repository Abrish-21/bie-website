import { useRouter } from "next/router";
import { Clock } from "lucide-react";

// Helper: turn title into slug
const slugify = (text) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

const recommended = [
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
  const router = useRouter();

  return (
    <div className="space-y-6">
      {recommended.map((item, idx) => {
        const slug = slugify(item.title);

        return (
          <div
            key={idx}
            className="flex items-start space-x-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
            onClick={() =>
              router.push(
                {
                  pathname: "/business-pulse/[slug]",
                  query: {
                    title: item.title,
                    excerpt: item.excerpt,
                    thumbnail: item.thumbnail,
                    timestamp: item.timestamp,
                  },
                },
                `/business-pulse/${slug}` // 👈 pretty URL
              )
            }
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 hover:text-news-primary transition">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                {item.timestamp}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
