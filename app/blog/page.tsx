'use client';

import { useState, useMemo } from 'react';
import { blogPosts } from './data';
import { categories, type BlogPost, type SortOption } from './types';
import BlogCard from './BlogCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
const ITEMS_PER_PAGE = 6;

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...blogPosts];

    // Filter by category
    if (selectedCategory !== 'All Posts') {
      result = result.filter(post => post.category === selectedCategory);
    }

    // Sort posts
    result.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [selectedCategory, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#2b2b2b]">
        <Header />
      {/* Hero Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-light text-white mb-4">Insights & Education</h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Discover expert advice, skincare tips, and the latest in cosmetic science
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filter and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-3xl text-white font-bold">Latest Articles</h2>
          
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Category Filter */}
            <div className="flex-1 md:flex-none overflow-x-auto pb-2">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                    className={`whitespace-nowrap px-6 py-3 rounded-lg text-base font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-[#D2B48C] text-gray-800'
                        : 'bg-white text-gray-800 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center">
              <span className="text-md text-white mr-2">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {paginatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredAndSortedPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-white">No articles found</h3>
            <p className="text-white mt-2">Try selecting a different category</p>
          </div>
        )}

        {/* Pagination */}
        {filteredAndSortedPosts.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-200 pt-6">
            <div className="text-sm text-white mb-4 sm:mb-0">
              Showing articles {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredAndSortedPosts.length)} of{' '}
              {filteredAndSortedPosts.length}
            </div>
            
            <div className="flex space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                &larr; Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }).map((_, index) => {
                // Show first page, last page, and pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = index + 1;
                } else if (currentPage <= 3) {
                  pageNum = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + index;
                } else {
                  pageNum = currentPage - 2 + index;
                }

                if (index === 3 && currentPage < totalPages - 3) {
                  return <span key="ellipsis" className="px-3 py-1">...</span>;
                }
                if (index === 1 && currentPage > 4) {
                  return <span key="ellipsis-start" className="px-3 py-1">...</span>;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-md text-sm font-medium ${
                      currentPage === pageNum
                        ? 'bg-[#0285c7] text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}