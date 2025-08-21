import { useRouter } from "next/router";
import SocialShare from "@/components/SocialShare";
import TrendingArticles from "@/components/TrendingArticles";
import RecommendedArticles from "@/components/RecommendedArticles";

const ArticleDetail = () => {
  const router = useRouter();
  const { title, excerpt, thumbnail, author, timestamp, keyPoints } = router.query;

  if (!title) return <p>Loading article...</p>;

  const points = keyPoints ? keyPoints.split("|") : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Content */}
          <main className="lg:col-span-2 space-y-6">
            {/* Article Tags */}
            <div className="flex items-center space-x-2 mb-2">
              <span className="news-tag">LOCAL</span>
              <span className="news-tag">LIFESTYLE</span>
            </div>

            {/* Headline */}
            <h1 className="news-headline mb-4">{title}</h1>

            {/* Author and Date */}
            <div className="flex items-center justify-between mb-6">
              <p className="news-byline uppercase text-sm">
                {author} | {timestamp}
              </p>
              <SocialShare />
            </div>

            {/* Lead Paragraph */}
            <p className="text-lg font-medium text-headline-secondary leading-relaxed mb-6">
              {excerpt}
            </p>

            {/* Main Image */}
            <figure className="mb-6">
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-80 object-cover rounded-lg"
              />
              <figcaption className="text-sm text-text-muted mt-2">{title}</figcaption>
            </figure>

            {/* Key Points */}
            {points.length > 0 && (
              <ul className="list-disc list-inside mb-6 space-y-2">
                {points.map((point, idx) => (
                  <li key={idx} className="news-body">
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {/* Recommended Articles */}
            <RecommendedArticles />
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <h2 className="news-sidebar-title">TRENDING</h2>
            <TrendingArticles />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
