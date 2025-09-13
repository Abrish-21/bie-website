import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { AdSenseSlot } from '@/components/ads/AdSenseSlot'
import { useState, useEffect } from 'react'
import { getPosts, getTags, getCategories, Post, Author } from '@/lib/data'
import { Clock, User, Eye, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import HeroSection from '@/components/HeroSection'

// This component renders the category filter buttons.
// It receives a function to handle clicks and the currently selected category.
const CATEGORY_FILTERS = [
  'Agriculture & Agribusiness',
  'Banking & Financial Services',
  'Energy & Mining',
  'Manufacturing & Industry',
  'Construction & Real Estate',
  'Technology & Telecommunications',
  'Trade & Retail',
  'Transport & Logistics',
  'Tourism & Hospitality',
  'Healthcare & Pharmaceuticals',
  'Education & Training',
  'Public Sector & Policy',
];

function CategoryFilterButtons({ onFilterByCategory, selectedCategory }: { onFilterByCategory: (category: string | null) => void; selectedCategory: string | null }) {
  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      {CATEGORY_FILTERS.map(category => (
        <button
          key={category}
          onClick={() => onFilterByCategory(selectedCategory === category ? null : category)}
          className={`
            px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ease-in-out
            ${selectedCategory === category
              ? 'bg-yellow-700 text-black shadow-md'
              : 'bg-black text-white'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

// This is the main component for your Home page.
export default function HomePage() {
  // State variables for managing the post data, filtered results, and available tags.
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // State variables for managing search and filter queries.
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // useEffect to load all data from the database on initial page load.
  useEffect(() => {
    const loadData = async () => {
      try {
        const [postsData, tagsData] = await Promise.all([
          getPosts(),
          getTags(),
        ])
        
        setPosts(postsData)
        setFilteredPosts(postsData)
        setAvailableTags(tagsData)
      } catch (error) {
        console.error('Error loading data:', error)
        setError('Failed to load articles')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // This useEffect hook runs whenever any of the filter states change.
  // It re-applies all active filters to the posts and updates the filteredPosts state.
  useEffect(() => {
    let filtered = posts

    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.fullContent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedTag) {
      filtered = filtered.filter(post =>
        post.tags && post.tags.includes(selectedTag)
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(post =>
        post.category === selectedCategory
      )
    }

    setFilteredPosts(filtered)
  }, [posts, searchQuery, selectedTag, selectedCategory])

  // Handlers for updating filter states.
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setSelectedTag(null);
    setSelectedCategory(null);
  }

  const handleFilterByTag = (tag: string | null) => {
    setSelectedTag(tag)
    setSearchQuery('');
  }

  const handleFilterByCategory = (category: string | null) => {
    setSelectedCategory(category)
    setSearchQuery('');
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedTag(null)
    setSelectedCategory(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading news...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Check if any filters are currently active.
  const isFiltered = searchQuery || selectedTag || selectedCategory;

  // Function to render the article cards and ads
  const renderPostsAndAds = () => {
    const elements = [];
    for (let i = 0; i < filteredPosts.length; i += 2) {
      const postsInRow = filteredPosts.slice(i, i + 2);

      elements.push(
        <div key={`row-${i}`} className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
          {postsInRow.map((post, postIndex) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} passHref>
              <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer">
                <div className="relative">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white text-black px-3 py-1 text-sm font-semibold rounded-full shadow-md">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full text-white shadow-md ${
                      post.type === 'featuredArticle' ? 'bg-yellow-500' :
                      post.type === 'marketUpdate' ? 'bg-green-600' :
                      'bg-purple-600'
                    }`}>
                      {post.type === 'featuredArticle' ? 'Featured' :
                       post.type === 'marketUpdate' ? 'Market' : 'Opinion'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
      
                  <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4 border-t pt-4 border-gray-100">
                    <span className="flex items-center">
                      {post.author.profilePictureUrl ? (
                        <img 
                          src={post.author.profilePictureUrl} 
                          alt={post.author.name} 
                          className="h-6 w-6 rounded-full object-cover mr-2"
                        />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-white mr-2">
                          {post.author.name?.[0]?.toUpperCase() || '?'}
                        </div>
                      )}
                      {post.author.name}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.views?.toLocaleString() || '0'}
                    </span>
                  </div>
      
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                        <span key={tagIndex} className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      );

      // Insert ad after every row of two posts, but not after the last row.
      if (i + 2 < filteredPosts.length) {
        elements.push(
          <div key={`ad-${i}`} className="my-10">
            <AdSenseSlot slotId={`YOUR_ADSENSE_SLOT_ID_INLINE_${i}`} label={`Inline Ad ${Math.floor(i/2) + 1}`} />
          </div>
        );
      }
    }
    return elements;
  };


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      {/* Search and Category Filters section */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search news by title, author, or content..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Buttons */}
        <CategoryFilterButtons
          onFilterByCategory={handleFilterByCategory}
          selectedCategory={selectedCategory}
        />

        {/* Clear Filters button, shown only when a filter is active */}
        <div className="text-center mt-4">
          {isFiltered && (
            <Button
              onClick={clearAllFilters}
              variant="outline"
              className="flex items-center justify-center text-gray-600 hover:text-gray-800"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          )}
        </div>
      </div>

      <main>
        {/* Leaderboard Ad (Google AdSense) */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <AdSenseSlot slotId="YOUR_ADSENSE_SLOT_ID_TOP" className="mx-auto" label="Leaderboard" />
          </div>
        </div>
        
        {/* The main content grid with the sidebar. */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main content area for articles (70% width) */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-black">
                      
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {filteredPosts.length === 0 ? 'No articles found' : `Showing ${filteredPosts.length} of ${posts.length} articles`}
                      {isFiltered && (
                        <span className="ml-2">
                          (filtered by {[searchQuery && 'search', selectedTag && 'tag', selectedCategory && 'category'].filter(Boolean).join(', ')})
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* This conditional rendering block displays either the filtered results or a "no results" message. */}
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">No articles found matching your criteria.</p>
                    <button
                      onClick={clearAllFilters}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Show all articles
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {renderPostsAndAds()}
                  </div>
                )}
              </div>
      
              {/* Sidebar section (30% width) */}
              <aside className="lg:col-span-1 hidden lg:block">
                <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Featured Ads</h3>
                  <div className="space-y-6">
                    <AdSenseSlot slotId="YOUR_ADSENSE_SLOT_ID_SIDEBAR_1" label="Sidebar Ad 1" />
                    <AdSenseSlot slotId="YOUR_ADSENSE_SLOT_ID_SIDEBAR_2" label="Sidebar Ad 2" />
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Local Business Spotlight</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <h4 className="font-bold text-gray-700">Tech Solutions Inc.</h4>
                      <p className="text-sm text-gray-500 mt-1">Innovative software for your business needs. Contact us for a free demo!</p>
                    </div>
                    <div className="p-4 bg-gray-100 rounded-lg">
                      <h4 className="font-bold text-gray-700">Cafe Oasis</h4>
                      <p className="text-sm text-gray-500 mt-1">Serving the best coffee and pastries in town. Get 10% off your first order!</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      {/* Footer ad strip */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <AdSenseSlot slotId="YOUR_ADSENSE_SLOT_ID_BOTTOM" label="Footer" />
        </div>
      </div>
     
        <Footer />
  
    </div>
  )
}
