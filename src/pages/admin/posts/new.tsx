import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ArrowLeft, Save, Eye, BellRing, Info, Upload } from 'lucide-react';
import { postsAPI } from '../../../lib/api';

// Dynamically import ReactQuill to avoid SSR issues
// This requires 'react-quill' and 'quill' to be installed: npm install react-quill quill@^1.3.6
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Quill editor styles

interface PostFormData {
  title: string;
  excerpt: string;
  content: string; // Content now stores HTML from the rich text editor
  category: string;
  type: 'featured' | 'market-watch' | 'opinion' | 'latest' | 'exclusive' | 'analysis'; // Updated types
  tags: string[];
  isDraft: boolean;
  seoTitle?: string; // New: SEO Title
  seoDescription?: string; // New: SEO Description
  slug: string; // Added slug property, was missing
}

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const CATEGORIES = [
  'Business', 'Economy', 'Technology', 'Politics', 'Agriculture',
  'Manufacturing', 'Services', 'Finance', 'Real Estate', 'Tourism',
  'Education', 'Healthcare', 'Energy', 'Global Markets' // Added more categories
];

const POST_TYPES = [
  { value: 'featured', label: 'Featured Article' },
  { value: 'market-watch', label: 'Market Watch' },
  { value: 'opinion', label: 'Opinion Piece' },
  { value: 'latest', label: 'Latest News' },
  { value: 'exclusive', label: 'Exclusive Report' }, // Added new type
  { value: 'analysis', label: 'In-Depth Analysis' }  // Added new type
];

export default function NewPost() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true); // Changed initial state to true for user loading
  const [saving, setSaving] = useState(false); // Distinct state for saving process
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    excerpt: '',
    content: '',
    category: 'Business',
    type: 'latest',
    tags: [],
    isDraft: true, // Default to draft for new posts
    seoTitle: '',
    seoDescription: '',
    slug: '' // Initialize slug
  });
  const [tagInput, setTagInput] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Debounce for content changes
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wordCount = formData.content.split(/\s+/).filter(Boolean).length; // Simple word count

  // Configure Quill modules and formats for rich text editor
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'], // Image and video options
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean'] // Remove formatting button
    ],
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background', 'align',
    'clean'
  ];

  // User authentication check
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    try {
      const parsedUser: UserData = JSON.parse(userData);
      setUser(parsedUser);
      setLoading(false);
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      router.push('/admin/login');
    }
  }, [router]);

  // Generate slug dynamically from title
  useEffect(() => {
    const newSlug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    if (newSlug !== formData.slug) {
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, [formData.title]); // Only re-run when title changes


  // Handle input changes for form fields
  const handleInputChange = (field: keyof PostFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    // Set a new timeout to trigger autosave (example, actual autosave logic would be here)
    debounceTimeoutRef.current = setTimeout(() => {
      // console.log("Content changed, potentially trigger autosave here.");
    }, 1500);
  };

  // Add a tag to the formData
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim().toLowerCase())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()]
      }));
      setTagInput('');
    }
  };

  // Remove a tag from the formData
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  // Custom notification handler (replaces alert())
  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Clear after 5 seconds
  };

  // Handle form submission (create post)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotification(null); // Clear previous notifications

    if (!formData.title || !formData.content) {
      showNotification('Title and content are required!', 'error');
      setSaving(false);
      return;
    }
    if (!user?._id) {
        showNotification('User not authenticated. Please log in again.', 'error');
        router.push('/admin/login');
        setSaving(false);
        return;
    }

    try {
      const postData = {
        ...formData,
        author: user.name,
        authorId: user._id, // Ensure _id is sent as a string if it's an ObjectId object
        // Slug is now managed by a useEffect, so no need to generate here
      };

      await postsAPI.create(postData);
      showNotification('Post created successfully!', 'success');
      router.push('/admin/dashboard'); // Redirect to dashboard on success
    } catch (error: any) {
      console.error('Error creating post:', error);
      showNotification(error.response?.data?.error || 'Failed to create post. Please check your data and try again.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Render loading state if user is not loaded
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Head><title>Loading Admin Dashboard...</title></Head>
        <div className="text-center text-gray-600">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading user data...</p>
        </div>
      </div>
    );
  }

  // Main component render
  return (
    <div className="min-h-screen bg-gray-50 text-gray-600 font-inter"> {/* Changed font to Inter */}
      <Head>
        <title>Create New Post - Admin</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              >
                <Eye className="h-4 w-4" />
                <span>{previewMode ? 'Edit' : 'Preview'}</span>
              </button>
              <button
                type="submit"
                form="post-form"
                disabled={saving}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Saving...' : 'Save Post'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Display */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' :
          notification.type === 'error' ? 'bg-red-100 text-red-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          <BellRing className="h-5 w-5 mr-2" />
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-4 text-sm font-medium">X</button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {previewMode ? (
          <div className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 font-serif leading-tight">
              {formData.title || 'Untitled Article'}
            </h1>
            {formData.excerpt && (
              <p className="text-xl text-gray-700 mb-6 italic border-l-4 border-blue-400 pl-4">
                "{formData.excerpt}"
              </p>
            )}
            <div className="flex flex-wrap items-center space-x-4 mb-6 text-sm text-gray-500 border-b pb-4">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">Category: {formData.category}</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">Type: {POST_TYPES.find(t => t.value === formData.type)?.label}</span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">Status: {formData.isDraft ? 'Draft' : 'Published'}</span>
              <span className="ml-auto text-gray-500">Word Count: {wordCount}</span>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 border-b pb-4">
                <span className="font-semibold text-gray-700 mr-2">Tags:</span>
                {formData.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed font-light article-content">
              {/* This is where the rich content (HTML from Quill) will be rendered */}
              {formData.content ? (
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              ) : (
                <p className="text-gray-400 italic text-center py-10">No content yet. Start writing in edit mode!</p>
              )}
            </div>
            {formData.seoTitle && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">SEO Preview:</h3>
                <p className="text-blue-700 text-lg mb-1">{formData.seoTitle}</p>
                <p className="text-green-600 text-sm">https://bie-website.vercel.app/{formData.slug || 'untitled-post'}</p>
                <p className="text-gray-600 text-sm mt-1">{formData.seoDescription || formData.excerpt || 'No SEO description provided.'}</p>
              </div>
            )}
          </div>
        ) : (
          <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-8">
              {/* General Post Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 border-b pb-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                    </label>
                  <input
                    type="text"
                    id="title"
                    required
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 text-lg"
                    placeholder="Enter a compelling title..."
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                    id="category"
                    required
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    >
                      {CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="post-type" className="block text-sm font-semibold text-gray-700 mb-2">
                    Post Type <span className="text-red-500">*</span>
                    </label>
                  <select
                    id="post-type"
                    required
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  >
                    {POST_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Publish Status
                  </label>
                  <div className="flex items-center space-x-6 h-full mt-1">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="publishStatus"
                        checked={!formData.isDraft}
                        onChange={() => handleInputChange('isDraft', false)}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Publish</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="publishStatus"
                        checked={formData.isDraft}
                        onChange={() => handleInputChange('isDraft', true)}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Save as Draft</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Excerpt Section */}
              <div className="mb-8 border-b pb-6">
                <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  placeholder="A brief, engaging summary for search engines and social media..."
                />
                  </div>

              {/* Tags Section */}
              <div className="mb-8 border-b pb-6">
                <label htmlFor="tag-input" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags <span className="text-gray-500 text-xs">(Press Enter to add)</span>
                </label>
                <div className="flex items-center space-x-3 mb-3">
                  <input
                    type="text"
                    id="tag-input"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    placeholder="Enter tag (e.g., 'economy', 'tech')..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-md"
                  >
                    Add Tag
                  </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full shadow-sm"
                      >
                          {tag}
                          <button
                            type="button"
                          onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                          ×
                          </button>
                      </span>
                      ))}
                    </div>
                  )}
                </div>

              {/* Rich Content Editor */}
              <div className="mb-8 border-b pb-6">
                    <label htmlFor="content-editor" className="block text-sm font-semibold text-gray-700 mb-2">
                  Content <span className="text-red-500">*</span>
                    </label>
                    <ReactQuill
                  id="content-editor"
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                  modules={modules}
                  formats={formats}
                  placeholder="Write your detailed article content here. Use the toolbar for formatting, images, and videos..."
                  className="bg-white rounded-lg border border-gray-300 quill-editor-height"
                      />
                <p className="mt-2 text-sm text-gray-500">Word Count: {wordCount}</p>
                    </div>

              {/* SEO Section */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  SEO Optimization
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="seo-title" className="block text-sm font-semibold text-gray-700 mb-2">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      id="seo-title"
                      value={formData.seoTitle}
                      onChange={(e) => handleInputChange('seoTitle', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                      placeholder="Optimized title for search engines (max 60 characters)"
                      maxLength={60}
                    />
                    <p className="mt-1 text-xs text-gray-500">{formData.seoTitle?.length || 0}/60 characters</p>
                  </div>
                  <div>
                    <label htmlFor="seo-description" className="block text-sm font-semibold text-gray-700 mb-2">
                      SEO Description
                    </label>
                    <textarea
                      id="seo-description"
                      value={formData.seoDescription}
                      onChange={(e) => handleInputChange('seoDescription', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                      placeholder="Meta description for search engine results (max 160 characters)"
                      maxLength={160}
                    />
                    <p className="mt-1 text-xs text-gray-500">{formData.seoDescription?.length || 0}/160 characters</p>
                  </div>
                </div>
              </div>

            </div>
          </form>
        )}
      </div>
      {/* Custom CSS for Quill Editor height */}
      <style jsx global>{`
        .quill-editor-height .ql-container {
          min-height: 400px; /* Adjust as needed */
          max-height: 800px; /* Optional: limit max height */
          overflow-y: auto;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
        .quill-editor-height .ql-toolbar.ql-snow {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }
        .article-content h1, .article-content h2, .article-content h3 {
          font-family: 'Inter', serif; /* Or any other serif font for headings */
          font-weight: 700;
          color: #1a202c; /* Darker gray for headings */
        }
        .article-content p {
          font-family: 'Inter', sans-serif;
          font-size: 1.125rem; /* Equivalent to text-lg */
          line-height: 1.75; /* Equivalent to leading-relaxed */
          color: #4a5568; /* Slightly darker than text-gray-600 for readability */
        }
        .article-content blockquote {
          border-left: 4px solid #3b82f6; /* Tailwind blue-500 */
          padding-left: 1rem;
          margin-left: 0;
          font-style: italic;
          color: #4b5563; /* text-gray-700 */
        }
        .article-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .article-content .ql-align-center {
          text-align: center;
        }
        .article-content .ql-align-right {
          text-align: right;
        }
        .article-content .ql-align-justify {
          text-align: justify;
        }
      `}</style>
    </div>
  );
}
