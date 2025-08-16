import { NewsCard } from './NewsCard';
import { Button } from './ui/button';

export function MustReadSection() {
  const mustReadArticles = [
    {
      title: "Ethiopia's Climate Resilient Agriculture Strategy Gains International Recognition",
      excerpt: "The government's new agricultural framework attracts $500M in climate financing from international development partners.",
      timeAgo: "1 hour ago",
      author: "Almaz Getachew",
      category: "AGRICULTURE",
      imageUrl: "https://images.unsplash.com/photo-1691183213834-3b182d3f01ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwYWdyaWN1bHR1cmUlMjBzdXN0YWluYWJsZXxlbnwxfHx8fDE3NTUzNTM2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      featured: true
    },
    {
      title: "Digital Payment Adoption Soars 300% Among Small Businesses",
      excerpt: "New survey reveals dramatic shift in payment preferences across Ethiopian SMEs.",
      timeAgo: "3 hours ago",
      author: "Henok Tadesse",
      category: "FINTECH",
      imageUrl: "https://images.unsplash.com/photo-1726056652582-7c9d202d4018?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwYXltZW50JTIwZmludGVjaHxlbnwxfHx8fDE3NTUzNTM2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Manufacturing Sector Jobs Increase by 25% This Quarter",
      excerpt: "Industrial parks report significant hiring as export demand grows.",
      timeAgo: "5 hours ago",
      author: "Tigist Assefa",
      category: "MANUFACTURING",
      imageUrl: "https://images.unsplash.com/photo-1666021074896-71f90d9c7d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwaW5kdXN0cnklMjBqb2JzfGVufDF8fHx8MTc1NTM1MzY5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const editorsPick = {
    title: "The Complete Guide to Ethiopia's New Investment Incentives for 2024",
    excerpt: "Everything businesses need to know about the updated investment framework, tax benefits, and application processes. Our comprehensive analysis breaks down opportunities across all sectors.",
    timeAgo: "6 hours ago",
    author: "Editorial Team",
    imageUrl: "https://images.unsplash.com/photo-1559067096-49ebca3406aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwZ3VpZGUlMjBmaW5hbmNlfGVufDF8fHx8MTc1NTM1MzY5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Must Read Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-black">Must Read</h2>
          <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
            See All →
          </Button>
        </div>

        {/* Must Read Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <NewsCard
              title={mustReadArticles[0].title}
              excerpt={mustReadArticles[0].excerpt}
              author={mustReadArticles[0].author}
              timeAgo={mustReadArticles[0].timeAgo}
              imageUrl={mustReadArticles[0].imageUrl}
              category={mustReadArticles[0].category}
              size="large"
              featured={true}
            />
          </div>
          <div className="space-y-6">
            {mustReadArticles.slice(1).map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                excerpt={article.excerpt}
                author={article.author}
                timeAgo={article.timeAgo}
                imageUrl={article.imageUrl}
                category={article.category}
                size="medium"
              />
            ))}
          </div>
        </div>

        {/* Editor's Pick */}
        <div className="bg-gradient-to-r from-gray-900 to-black rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 lg:p-12 text-white">
              <div className="flex items-center text-sm mb-4">
                <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-medium">EDITOR'S PICK</span>
                <span className="ml-3 text-gray-300">{editorsPick.timeAgo}</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {editorsPick.title}
              </h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                {editorsPick.excerpt}
              </p>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-gray-600 rounded-full mr-3"></div>
                <span className="text-gray-300">By {editorsPick.author}</span>
              </div>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-300 font-medium">
                Read Full Guide
              </Button>
            </div>
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[500px]">
              <img
                src={editorsPick.imageUrl}
                alt={editorsPick.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}