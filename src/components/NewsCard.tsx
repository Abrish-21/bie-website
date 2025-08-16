import { Clock, User, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  title: string;
  excerpt: string;
  author?: string;
  timeAgo: string;
  imageUrl?: string;
  category?: string;
  size?: 'small' | 'medium' | 'large';
  featured?: boolean;
}

export function NewsCard({ 
  title, 
  excerpt, 
  author, 
  timeAgo, 
  imageUrl, 
  category, 
  size = 'medium',
  featured = false 
}: NewsCardProps) {
  const cardClasses = {
    small: 'group cursor-pointer',
    medium: 'group cursor-pointer hover:shadow-xl transition-all duration-300',
    large: 'group cursor-pointer hover:shadow-2xl transition-all duration-300'
  };

  const titleClasses = {
    small: 'text-lg font-bold text-black group-hover:text-red-600 transition-colors leading-tight',
    medium: 'text-xl font-bold text-black group-hover:text-red-600 transition-colors leading-tight',
    large: 'text-2xl lg:text-3xl font-bold text-black group-hover:text-red-600 transition-colors leading-tight'
  };

  return (
    <article className={cardClasses[size]}>
      <div className={`bg-white rounded-2xl overflow-hidden ${size !== 'small' ? 'border border-gray-100' : ''}`}>
        {imageUrl && (
          <div className={`relative ${size === 'large' ? 'h-64 lg:h-80' : size === 'medium' ? 'h-48' : 'h-32'} overflow-hidden`}>
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {category && (
              <div className="absolute top-4 left-4">
                <span className="bg-black text-white px-3 py-1 text-xs font-medium rounded-full">
                  {category}
                </span>
              </div>
            )}
          </div>
        )}
        
        <div className={size === 'small' ? 'py-3' : 'p-6'}>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            {author && (
              <>
                <User className="w-4 h-4 mr-1" />
                <span className="mr-3">{author}</span>
              </>
            )}
            <Clock className="w-4 h-4 mr-1" />
            <span>{timeAgo}</span>
          </div>
          
          <h3 className={titleClasses[size]}>
            {title}
          </h3>
          
          {size !== 'small' && (
            <p className="text-gray-600 mt-3 leading-relaxed">
              {excerpt}
            </p>
          )}
          
          {featured && (
            <div className="mt-4 flex items-center text-red-600 font-medium">
              <span>Read more</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}