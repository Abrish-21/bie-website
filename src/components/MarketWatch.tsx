import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

export function MarketWatch() {
  const marketData = [
    { name: "CBE Stock", price: "2,450 ETB", change: "+12.5%", trend: "up" },
    { name: "Coffee Export", price: "$4.2B", change: "+8.3%", trend: "up" },
    { name: "USD/ETB", price: "125.50", change: "-0.8%", trend: "down" },
    { name: "Gold Price", price: "8,500 ETB/oz", change: "+2.1%", trend: "up" }
  ];

  const watchArticles = [
    {
      title: "Market analysis: Ethiopian equities outperform regional peers",
      timeAgo: "1 hour ago",
      imageUrl: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydHMlMjBkYXRhfGVufDF8fHx8MTc1NTM1NDgwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Government bond yields remain stable amid global volatility",
      timeAgo: "3 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1729954182940-d33c36559e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwYnVpbGRpbmclMjBwb2xpdGljc3xlbnwxfHx8fDE3NTUzNTQ4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-black mb-8">Market Watch</h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Market Data */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-black mb-4">Live Market Data</h3>
              <div className="space-y-4">
                {marketData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                    <div>
                      <div className="font-medium text-black">{item.name}</div>
                      <div className="text-lg font-bold">{item.price}</div>
                    </div>
                    <div className={`flex items-center ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      <span className="font-medium">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-gray-500">
                Last updated: 15 minutes ago
              </div>
            </div>
          </div>

          {/* Market Articles */}
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-6">
              {watchArticles.map((article, index) => (
                <article key={index} className="group cursor-pointer">
                  <div className="relative mb-4">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black group-hover:text-red-600 transition-colors mb-2 leading-tight">
                    {article.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{article.timeAgo}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}