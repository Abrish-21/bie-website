import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Save, Eye, UploadCloud } from 'lucide-react';
import dynamic from 'next/dynamic';
import { postsAPI} from '../../../lib/api';
import { CustomAlertModal as ImportedCustomAlertModal, ConfirmationModal } from '../../../components/ui/Alerts';

// --- TipTap Imports ---
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapLinkExtension from '@tiptap/extension-link';
import TiptapImageExtension from '@tiptap/extension-image';
import api from '@/lib/api';
// --- End TipTap Imports ---

// Custom Modal for alerts
interface CustomAlertModalProps {
  message: string;
  onClose: () => void;
}

const CustomAlertModal: React.FC<CustomAlertModalProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold text-black mb-4">Error</h3>
        <p className="text-black mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// Interface for Post form data
interface PostFormData {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
  isDraft: boolean;
  readTime: number | string;
  author: string;
  authorId: string;
  fullContent: string;
  seoTitle?: string;
  seoDescription?: string;
  slug?: string;
}

const CATEGORIES = [
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

// TipTap Editor component with toolbar
const TiptapEditor = dynamic(() => import('../../../components/TiptapEditor'), { ssr: false });
export default function NewPost() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    category: 'Agriculture & Agribusiness',
    tags: [],
    isDraft: true,
    readTime: '',
    author: '',
    authorId: '',
    fullContent: '',
    seoTitle: '',
    seoDescription: '',
  });
  const [tagInput, setTagInput] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    
    if (!userData) {
      router.push('/admin/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData(prev => ({
        ...prev,
        author: parsedUser.name || (parsedUser.role === 'superadmin' ? 'Super Admin' : 'Content Admin'),
        authorId: parsedUser._id,
      }));
    } catch (error) {
      console.error('Failed to parse user data from localStorage:', error);
      router.push('/admin/login');
    }
  }, [router]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleEditorContentChange = useCallback((html: string) => {
    setFormData((prev) => ({
      ...prev,
      content: html,
      fullContent: html,
    }));
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      setFormData(prev => ({ ...prev, imageUrl: '' }));
    } else {
      setSelectedImageFile(null);
      setImagePreviewUrl(null);
    }
  }, []);

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  }, [tagInput, formData.tags]);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  }, []);

  // FIX: Refactored to use the axios instance for proper auth token handling
  const uploadImage = async (file: File): Promise<string> => {
    setUploadingImage(true);
    try {
      if (!file) {
        throw new Error('No valid file provided for upload.');
      }
      
      const formData = new FormData();
      formData.append('image', file);

      // Use the 'api' instance which is configured to send cookies
      const response = await api.post('/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // The backend now returns a 'imageUrl' field, not 'location'
      return response.data.imageUrl;
    } catch (uploadError: any) {
      console.error('Error during image upload:', uploadError);
      throw new Error(uploadError.message || 'Failed to upload image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlertMessage(null);

    if (!formData.title || !formData.content || !formData.category || !formData.readTime) {
        setAlertMessage('Please fill in all required fields: Title, Content, Category, and Read Time.');
        setLoading(false);
        return;
    }
    
    let finalImageUrl = formData.imageUrl;
    try {
      if (selectedImageFile) {
        if (!selectedImageFile) {
          throw new Error('Selected image file is unexpectedly null before upload.');
        }
        finalImageUrl = await uploadImage(selectedImageFile);
      } else if (!finalImageUrl) { 
        setAlertMessage('Please either select an image file or provide an Image URL.');
        setLoading(false);
        return;
      }
      
      const postData = {
        ...formData,
        imageUrl: finalImageUrl,
        author: user?.name || (user?.role === 'superadmin' ? 'Super Admin' : 'Content Admin'),
        authorId: user?._id,
        slug: formData.title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        readTime: Number(formData.readTime),
        isDraft: formData.isDraft,
      };

      await postsAPI.create(postData);
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Error creating post:', error);
      setAlertMessage(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-black">Loading...</p>
        </div>
      </div>
    );
  }

  const currentImageSource = imagePreviewUrl || formData.imageUrl;

  return (
    <div className="min-h-screen bg-gray-50">
      {alertMessage && <CustomAlertModal message={alertMessage} onClose={() => setAlertMessage(null)} />}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="flex items-center space-x-2 text-black hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-black">Create New Post</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>{previewMode ? 'Edit' : 'Preview'}</span>
              </button>
              <button
                type="submit"
                form="post-form"
                disabled={loading || uploadingImage}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? 'Saving...' : uploadingImage ? 'Uploading Image...' : 'Save Post'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {previewMode ? (
          <div className="bg-white shadow-sm rounded-lg p-6">
            {currentImageSource && (
              <img
                src={currentImageSource}
                alt={formData.title || 'Post Image'}
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => { e.currentTarget.src = "https://placehold.co/800x400/cccccc/333333?text=Image+Load+Error"; e.currentTarget.onerror = null; }}
              />
            )}
            {!currentImageSource && (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-6 text-black">
                    <span className="text-lg font-medium">No Image Provided</span>
                </div>
            )}

            <h1 className="text-3xl font-bold text-black mb-4">{formData.title || 'Untitled Post'}</h1>
            {formData.excerpt && (
              <p className="text-lg text-black mb-6 italic">"{formData.excerpt}"</p>
            )}
            <div className="flex items-center space-x-4 mb-6 text-sm text-black">
              <span>Category: {formData.category}</span>
              <span>Status: {formData.isDraft ? 'Draft' : 'Published'}</span>
              <span>Read Time: {formData.readTime || 'N/A'} min</span>
            </div>
              {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {formData.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {tag}
                  </span>
                    ))}
                  </div>
            )}
            <div className="prose max-w-none">
              {formData.content ? (
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              ) : (
                <p className="text-black italic">No content yet...</p>
              )}
            </div>
          </div>
        ) : (
          <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-black mb-2">
                    Title *
                    </label>
                  <input
                    type="text"
                    required
                    name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    placeholder="Enter post title..."
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-black mb-2">
                      Category *
                    </label>
                    <select
                    required
                    name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    >
                      {CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                <div>
                  <label htmlFor="readTime" className="block text-sm font-medium text-black mb-2">
                    Read Time (minutes) *
                  </label>
                  <input
                    type="number"
                    required
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    placeholder="Estimated read time..."
                  />
                </div>

                <div>
                  <label htmlFor="isDraft" className="block text-sm font-medium text-black mb-2">
                    Status
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isDraft"
                        checked={!formData.isDraft}
                        onChange={() => setFormData(prev => ({ ...prev, isDraft: false }))}
                        className="mr-2"
                      />
                      <span className="text-sm text-black">Publish</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isDraft"
                        checked={formData.isDraft}
                        onChange={() => setFormData(prev => ({ ...prev, isDraft: true }))}
                        className="mr-2"
                      />
                      <span className="text-sm text-black">Save as Draft</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="imageUpload" className="block text-sm font-medium text-black mb-2">Featured Image</label>
                  <div className="flex items-center space-x-2 mb-2">
                      <input
                          type="file"
                          id="imageUpload"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                      />
                      <label
                          htmlFor="imageUpload"
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-white text-black"
                      >
                          <UploadCloud className="h-4 w-4" />
                          <span>{selectedImageFile ? selectedImageFile.name : 'Choose File'}</span>
                      </label>
                      <span className="text-sm text-black">OR</span>
                      <input
                          type="url"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          placeholder="Paste Image URL"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                          disabled={!!selectedImageFile}
                      />
                  </div>
                  {(imagePreviewUrl || formData.imageUrl) && (
                    <div className="mt-2">
                        <img
                          src={currentImageSource}
                          alt="Image Preview"
                          className="max-w-full h-32 object-cover rounded-md"
                          onError={(e) => { e.currentTarget.src = "https://placehold.co/300x128/cccccc/333333?text=Invalid+URL"; e.currentTarget.onerror = null; }}
                        />
                        {selectedImageFile && (
                            <p className="text-xs text-gray-500 mt-1 text-black">
                                Selected: {selectedImageFile.name} ({(selectedImageFile.size / 1024).toFixed(2)} KB)
                            </p>
                        )}
                    </div>
                  )}
                  {uploadingImage && <p className="text-blue-600 text-sm mt-2 text-black">Uploading image...</p>}
                </div>

              </div>

              <div className="mt-6">
                <label htmlFor="excerpt" className="block text-sm font-medium text-black mb-2">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Brief summary of the post..."
                />
              </div>

              <div className="mt-6">
                <label htmlFor="seoTitle" className="block text-sm font-medium text-black mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="SEO friendly title..."
                />
              </div>

              <div className="mt-6">
                <label htmlFor="seoDescription" className="block text-sm font-medium text-black mb-2">
                  SEO Description
                </label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Meta description for search engines..."
                />
              </div>

              <div className="mt-6">
                <label htmlFor="tags" className="block text-sm font-medium text-black mb-2">
                  Tags
                </label>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
                    placeholder="Add a tag and press Enter..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Add
                  </button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                    {formData.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                          {tag}
                          <button
                            type="button"
                          onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                          ×
                          </button>
                      </span>
                      ))}
                    </div>
                  )}
                </div>

              <div className="mt-6">
                    <label htmlFor="content" className="block text-sm font-medium text-black mb-2">
                  Content *
                    </label>
                    <TiptapEditor
                      value={formData.content}
                      onContentChange={handleEditorContentChange}
                    />
                    </div>
                  </div>
              </form>
            )}
          </div>
        </div>
      );
    }
