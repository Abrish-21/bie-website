import { Clock, User } from 'lucide-react';

export function FeaturedArticles() {
  const articles = [
    {
      title: "BIE profiles 15 women, their promises, resilience and future ambitions",
      excerpt: "Meet the inspiring women leaders driving change across Ethiopia's business landscape.",
      timeAgo: "1 hour ago",
      author: "Sara Bekele",
      category: "PROFILES",
      imageUrl: "https://images.unsplash.com/photo-1633457897190-8c8c23a12c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW9wbGUlMjBtZWV0aW5nJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3NTUzNTQ4MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Manufacturing jobs surge as Ethiopia's industrial strategy pays off",
      excerpt: "New data shows 25% increase in manufacturing employment across major industrial parks.",
      timeAgo: "2 hours ago",
      author: "Daniel Assefa",
      category: "MANUFACTURING",
      imageUrl: "https://images.unsplash.com/photo-1666021074896-71f90d9c7d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwaW5kdXN0cnklMjBqb2JzfGVufDF8fHx8MTc1NTM1MzY5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Tech startups raising $50M series A funding rounds show confidence",
      excerpt: "Ethiopian fintech and agtech companies attract record international investment.",
      timeAgo: "3 hours ago",
      author: "Meron Tadesse",
      category: "TECH",
      imageUrl: "https://images.unsplash.com/photo-1591522810896-cb5f45acb9a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVjaCUyMGZ1bmRpbmd8ZW58MXx8fHwxNzU1MzUzNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Coffee prices hit 10-year high as demand outpaces supply",
      excerpt: "Ethiopian coffee farmers benefit from global price surge and quality premiums.",
      timeAgo: "4 hours ago",
      author: "Almaz Getachew",
      category: "AGRICULTURE",
      imageUrl: "https://images.unsplash.com/photo-1746367805612-bc46ff00bf9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBleHBvcnQlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTUzNTM2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Urban development transforms Addis Ababa's business districts",
      excerpt: "New commercial centers and infrastructure projects reshape the capital's economy.",
      timeAgo: "5 hours ago",
      author: "Henok Tadesse",
      category: "REAL ESTATE",
      imageUrl: "https://images.unsplash.com/photo-1696578306635-85664fd15c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMHVyYmFuJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzU1MzUwOTAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Financial inclusion reaches 70% as digital banking expands nationwide",
      excerpt: "Mobile money and digital banking services drive unprecedented financial access.",
      timeAgo: "6 hours ago",
      author: "Tigist Assefa",
      category: "FINTECH",
      imageUrl: "https://images.unsplash.com/photo-1726056652582-7c9d202d4018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwYXltZW50JTIwZmludGVjaHxlbnwxfHx8fDE3NTUzNTM2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-black">Featured Stories</h2>
          <a href="#" className="text-red-600 hover:text-red-700 font-medium">
            View all →
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <article key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
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
                  <span>{article.timeAgo}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}