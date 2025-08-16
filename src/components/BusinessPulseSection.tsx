import { Button } from './ui/button';
import { NewsCard } from './NewsCard';
import { TrendingUp, DollarSign, Building, Briefcase } from 'lucide-react';

export function BusinessPulseSection() {
  const pulseItems = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Daily Business Pulse",
      description: "Morning roundup of policy, forex, investment, and market shifts."
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "B-Opportunities",
      description: "Weekly tenders, startup funding, auctions, and curated business deals."
    },
    {
      icon: <Building className="w-5 h-5" />,
      title: "B-Letters",
      description: "A must-read weekly digest with editor picks, recaps, and outlooks."
    }
  ];

  const latestNews = [
    {
      title: "New Foreign Exchange Regulations Impact Import Businesses",
      excerpt: "The National Bank of Ethiopia announces new forex allocation rules affecting importers across multiple sectors.",
      timeAgo: "2 hours ago",
      author: "Meron Tadesse",
      category: "POLICY",
      imageUrl: "https://images.unsplash.com/photo-1607623198457-7aad066a4ade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JlaWduJTIwZXhjaGFuZ2UlMjBjdXJyZW5jeXxlbnwxfHx8fDE3NTUzNTM2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Ethiopia's Coffee Export Revenue Reaches Record High",
      excerpt: "Q3 earnings show 40% increase in coffee exports, driven by premium arabica demand in international markets.",
      timeAgo: "4 hours ago",
      author: "Daniel Assefa",
      category: "AGRICULTURE",
      imageUrl: "https://images.unsplash.com/photo-1746367805612-bc46ff00bf9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBleHBvcnQlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTUzNTM2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Tech Startup Secures $2M in Series A Funding",
      excerpt: "Addis-based fintech company raises significant capital to expand digital payment solutions.",
      timeAgo: "6 hours ago",
      author: "Sara Bekele",
      category: "STARTUP",
      imageUrl: "https://images.unsplash.com/photo-1591522810896-cb5f45acb9a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVjaCUyMGZ1bmRpbmd8ZW58MXx8fHwxNzU1MzUzNjk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Construction Sector Shows Strong Growth Signals",
      excerpt: "New data reveals 15% growth in construction permits issued across major Ethiopian cities.",
      timeAgo: "8 hours ago",
      author: "Yohannes Hailu",
      category: "CONSTRUCTION",
      imageUrl: "https://images.unsplash.com/photo-1557813282-bcd50093e38f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc1NTM1MzY5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4">
            Business Pulse
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your Daily & Weekly Guide to Smarter Decisions. Ethiopia's business landscape 
            changes by the hour — never miss a beat.
          </p>
        </div>

        {/* Pulse Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pulseItems.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="bg-red-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <div className="text-red-600">{item.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Latest News Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-black">Latest News</h3>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              See All
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((news, index) => (
              <NewsCard
                key={index}
                title={news.title}
                excerpt={news.excerpt}
                author={news.author}
                timeAgo={news.timeAgo}
                imageUrl={news.imageUrl}
                category={news.category}
                size="small"
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg rounded-full">
            Subscribe to Business Pulse →
          </Button>
        </div>
      </div>
    </section>
  );
}