// pages/index.tsx
import { Header } from '@/components/Header'
import { MainContent } from '@/components/MainContent'
import { FeaturedArticles } from '@/components/FeaturedArticles'
import { MarketWatch } from '@/components/MarketWatch'
import { OpinionSection } from '@/components/OpinionSection'
import { Footer } from '@/components/Footer'
import { AdSenseSlot } from '@/components/ads/AdSenseSlot'
import SearchFilter from '@/components/SearchFilter'
import { useState, useEffect } from 'react'
import { getPosts, getTags, getCategories } from '@/lib/data'
import { Clock, User, Eye } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [availableCategories, setAvailableCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [applyFilters, setApplyFilters] = useState(false)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postsData, tagsData, categoriesData] = await Promise.all([
          getPosts(),
          getTags(),
          getCategories()
        ])
        
        setPosts(postsData)
        setFilteredPosts(postsData)
        setAvailableTags(tagsData)
        setAvailableCategories(categoriesData)
      } catch (error) {
        console.error('Error loading data:', error)
        setError('Failed to load articles')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Combined filtering logic
  useEffect(() => {
    // If filters are not applied, show all posts
    if (!applyFilters || (!searchQuery && !selectedTag && !selectedCategory)) {
      setFilteredPosts(posts)
      return
    }

    let filtered = posts

    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.fullContent?.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [posts, searchQuery, selectedTag, selectedCategory, applyFilters])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilterByTag = (tag: string | null) => {
    setSelectedTag(tag)
  }

  const handleFilterByCategory = (category: string | null) => {
    setSelectedCategory(category)
  }

  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedTag(null)
    setSelectedCategory(null)
    setApplyFilters(false)
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <MainContent />
      <SearchFilter
        onSearch={handleSearch}
        onFilterByTag={handleFilterByTag}
        onFilterByCategory={handleFilterByCategory}
        availableTags={availableTags}
        availableCategories={availableCategories}
      />
      {/* Apply/Clear controls for filters */}
      <div className="max-w-7xl mx-auto px-4 mt-2 flex items-center gap-3">
        <button
          onClick={() => setApplyFilters(true)}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Apply filters
        </button>
        {(searchQuery || selectedTag || selectedCategory || applyFilters) && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
      <main>
        {/* Leaderboard Ad (Google AdSense) */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <AdSenseSlot slotId="YOUR_ADSENSE_SLOT_ID_TOP" className="mx-auto" label="Leaderboard" />
          </div>
        </div>
        {/* Dynamic News Display */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-black">
                  {searchQuery || selectedTag || selectedCategory ? 'Filtered Results' : 'All News'}
                </h2>
                <p className="text-gray-600 mt-2">
                  {filteredPosts.length === 0 ? 'No articles found' : `Showing ${filteredPosts.length} of ${posts.length} articles`}
                  {(searchQuery || selectedTag || selectedCategory) && (
                    <span className="ml-2">
                      (filtered by {[searchQuery && 'search', selectedTag && 'tag', selectedCategory && 'category'].filter(Boolean).join(', ')})
                    </span>
                  )}
                </p>
              </div>
              {(searchQuery || selectedTag || selectedCategory) && (
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">No articles found{applyFilters ? ' matching your criteria' : ''}.</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Show all articles
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, index) => (
                  <Link key={index} href={`/posts/${post.slug}`} passHref>
                    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                      <div className="relative">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-black text-white px-2 py-1 text-xs font-medium rounded">
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded text-white ${
                            post.type === 'featuredArticle' ? 'bg-orange-600' :
                            post.type === 'marketUpdate' ? 'bg-green-600' :
                            'bg-purple-600'
                          }`}>
                            {post.type === 'featuredArticle' ? 'Featured' :
                             post.type === 'marketUpdate' ? 'Market' : 'Opinion'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {post.author}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {post.views?.toLocaleString() || '0'}
                          </span>
                        </div>

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
                            {post.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                              <span key={tagIndex} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
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
            )}
            {/* Inline Local Ad between sections - REPLACED */}
            <div className="mt-10">
              <AdSenseSlot slotId="YOUR_ADSENSE_SLOT_ID_INLINE_1" label="Inline" />
            </div>
          </div>
        </section>

        {/* Original sections for when no filters are active */}
        {!searchQuery && !selectedTag && !selectedCategory && (
          <>
            {/* <MainContent /> */}
            <FeaturedArticles posts={posts} />
            <div className="max-w-7xl mx-auto px-4 my-8">
              <AdSenseSlot slotId="YOUR_ADSENSE_SLOT_ID_MID" label="Mid-page" />
            </div>
            <MarketWatch />
            {/* Local Ad after MarketWatch - REPLACED */}
            <div className="max-w-7xl mx-auto px-4 my-8">
              <AdSenseSlot slotId="YOUR_ADSENSE_SLOT_ID_INLINE_2" label="Inline 2" />
            </div>
            <OpinionSection />
          </>
        )}
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