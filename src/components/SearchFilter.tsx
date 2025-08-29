'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterByTag: (tag: string | null) => void;
  onFilterByCategory: (category: string | null) => void;
  availableTags: string[];
  availableCategories: string[];
}

export default function SearchFilter({
  onSearch,
  onFilterByTag,
  onFilterByCategory,
  availableTags,
  availableCategories
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleTagSelect = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag;
    setSelectedTag(newTag);
    onFilterByTag(newTag);
  };

  const handleCategorySelect = (category: string) => {
    const newCategory = selectedCategory === category ? null : category;
    setSelectedCategory(newCategory);
    onFilterByCategory(newCategory);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTag(null);
    setSelectedCategory(null);
    onSearch('');
    onFilterByTag(null);
    onFilterByCategory(null);
  };

  const hasActiveFilters = searchQuery || selectedTag || selectedCategory;

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              isFilterOpen || hasActiveFilters
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {(searchQuery ? 1 : 0) + (selectedTag ? 1 : 0) + (selectedCategory ? 1 : 0)}
              </span>
            )}
          </button>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-1 px-3 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-4 w-4" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="border-t pt-4 space-y-4">
            {/* Tags Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Tags</h3>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagSelect(tag)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedTag === tag
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Category</h3>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-3">
            {searchQuery && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedTag && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Tag: {selectedTag}
                <button
                  onClick={() => handleTagSelect(selectedTag)}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Category: {selectedCategory}
                <button
                  onClick={() => handleCategorySelect(selectedCategory)}
                  className="ml-1 hover:text-green-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

