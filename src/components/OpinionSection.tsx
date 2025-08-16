import { Clock, User, MessageCircle } from 'lucide-react';

export function OpinionSection() {
  const opinions = [
    {
      title: "Why Ethiopia's manufacturing boom needs skilled workforce development",
      excerpt: "The country's industrial growth is impressive, but success depends on investing in technical education and training programs.",
      author: "Dr. Abebe Worku",
      role: "Economics Professor",
      timeAgo: "2 hours ago",
      comments: 24,
      imageUrl: "https://images.unsplash.com/photo-1551727974-8af20a3322f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjBsZWFkZXJ8ZW58MXx8fHwxNzU1MzU0ODA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Digital transformation: Ethiopia's pathway to economic diversification",
      excerpt: "Technology adoption across sectors offers unprecedented opportunities for growth and job creation.",
      author: "Hanan Ahmed",
      role: "Tech Entrepreneur",
      timeAgo: "4 hours ago",
      comments: 18,
      imageUrl: "https://images.unsplash.com/photo-1658124974726-d96bc44783cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbGFwdG9wJTIwd29ya3NwYWNlfGVufDF8fHx8MTc1NTM1NDgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Climate resilience: The future of Ethiopian agriculture",
      excerpt: "Sustainable farming practices and climate adaptation strategies are essential for long-term food security.",
      author: "Meseret Bekele",
      role: "Agricultural Economist",
      timeAgo: "6 hours ago",
      comments: 31,
      imageUrl: "https://images.unsplash.com/photo-1691183213834-3b182d3f01ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGltYXRlJTIwYWdyaWN1bHR1cmUlMjBzdXN0YWluYWJsZXxlbnwxfHx8fDE3NTUzNTM2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-black">Opinion & Analysis</h2>
          <a href="#" className="text-red-600 hover:text-red-700 font-medium">
            All opinions →
          </a>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {opinions.map((opinion, index) => (
            <article key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
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
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium text-black text-sm">{opinion.author}</div>
                      <div className="text-xs text-gray-500">{opinion.role}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{opinion.timeAgo}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      <span>{opinion.comments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}