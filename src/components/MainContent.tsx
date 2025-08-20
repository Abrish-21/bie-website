import { Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from './ui/button';

export function MainContent() {
  const sidebarArticles = [
    {
      title: "Why ETH 500 can't buy ETH 500 worth of goods in Piassa",
      timeAgo: "2 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1607623198457-7aad066a4ade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JlaWduJTIwZXhjaGFuZ2UlMjBjdXJyZW5jeXxlbnwxfHx8fDE3NTUzNTM2OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Bitter harvest: why a quintal per export costs more in local market",
      timeAgo: "4 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1666987571351-737b29874697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZhcm1pbmclMjBldGhpb3BpYXxlbnwxfHx8fDE3NTUzNTQ4MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Billionaires see a goldmine in African data centre market",
      timeAgo: "6 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbGFwdG9wJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NTM1NDgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "African trade, finance firms seek global investor",
      timeAgo: "8 hours ago",
      imageUrl: "https://images.unsplash.com/photo-1551727974-8af20a3322f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBsZWFkZXJ8ZW58MXx8fHwxNzU1MzU0ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Article */}
        <div className="lg:col-span-2">
          <article className="group">
            <div className="relative mb-6">
              <img
                src="https://images.unsplash.com/photo-1557804500-7a58fbcd4d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1NTI3ODQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Main news story"
                className="w-full h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-red-600 text-white px-3 py-1 text-xs font-medium rounded">
                  BREAKING
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <User className="w-4 h-4 mr-1" />
                <span className="mr-4">Editorial Team</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>15 minutes ago</span>
              </div>

              <h1 className="text-4xl font-bold text-black mb-4 leading-tight">
                New Foreign Exchange Policy Transforms Ethiopia's Import-Export Landscape
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                The National Bank of Ethiopia announces sweeping changes to foreign exchange regulations, 
                promising to streamline currency allocation for importers while introducing new incentives 
                for exporters. The policy, effective immediately, is expected to reduce bureaucratic delays 
                and improve the country's trade balance.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Under the new framework, priority sectors including agriculture, manufacturing, and technology 
                will receive preferential access to foreign currency. The central bank estimates this will 
                reduce waiting times for forex allocation from an average of 45 days to just 7 days for 
                qualifying businesses.
              </p>
            </div>

            {/* Social Share */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Share this article:</span>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-50">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-blue-700 hover:bg-blue-50">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-50">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-black mb-6">Latest Headlines</h2>
            <div className="space-y-6">
              {sidebarArticles.map((article, index) => (
                <article key={index} className="flex gap-4 group cursor-pointer">
                  <div className="flex-shrink-0">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-black group-hover:text-red-600 transition-colors leading-tight mb-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{article.timeAgo}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-8 p-4 bg-black rounded-lg text-white">
              <h3 className="font-bold mb-2">Daily Business Brief</h3>
              <p className="text-sm text-gray-300 mb-4">
                Get Ethiopia's top business news delivered to your inbox every morning.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm text-black rounded border-none"
                />
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}