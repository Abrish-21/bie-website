// src/pages/admin/posts/edit/[id].tsx

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, Save, Eye, UploadCloud, Bold, Italic, List, ListOrdered, Link, Image, Pilcrow, Heading1, Heading2, Trash2 } from 'lucide-react'; // Added icons
import { postsAPI } from '../../../../lib/api'; // Adjust path

// --- TipTap Imports ---
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapLinkExtension from '@tiptap/extension-link'; // Renamed to avoid conflict with lucide-react Link
import TiptapImageExtension from '@tiptap/extension-image'; // Renamed to avoid conflict with lucide-react Image
// --- End TipTap Imports ---

// Custom Modal for alerts (replace alert() calls)
const CustomAlertModal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Error</h3>
        <p className="text-gray-700 mb-6">{message}</p>
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

const ConfirmationModal: React.FC<{ message: string; onConfirm: () => void; onCancel: () => void }> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Action</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


// Interface for Post form data (ensure it matches the backend and new.tsx)
interface PostFormData {
  title: string;
  excerpt: string;
  content: string; // Will store HTML from TipTap
  imageUrl: string;
  category: string;
  type: 'featured' | 'market-watch' | 'opinion' | 'latest' | string;
  tags: string[];
  isDraft: boolean;
  readTime: number | string;
  author: string;
  authorId: string;
  fullContent: string; // Also stores HTML content
  seoTitle?: string; // Added back for completeness if your backend handles it
  seoDescription?: string; // Added back for completeness if your backend handles it
  slug: string; // Added for completeness if your backend handles it
}

const CATEGORIES = [
  'Business', 'Economy', 'Technology', 'Politics', 'Agriculture', 'Manufacturing',
  'Services', 'Finance', 'Real Estate', 'Tourism', 'Education', 'Healthcare'
];

const POST_TYPES = [
  { value: 'featured', label: 'Featured Article' },
  { value: 'market-watch', label: 'Market Watch' },
  { value: 'opinion', label: 'Opinion Piece' },
  { value: 'latest', label: 'Latest News' }
];

// TipTap Editor component with toolbar
const TiptapEditor: React.FC<{ initialContent: string; onContentChange: (html: string) => void }> = ({
  initialContent,
  onContentChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapLinkExtension.configure({
        openOnClick: false,
        autolink: true,
      }),
      TiptapImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[300px] p-4 text-gray-800',
      },
    },
  });

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex flex-wrap items-center p-2 bg-gray-50 border-b border-gray-200 gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          title="Bold"
        >
          <Bold className="h-4 w-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          title="Italic"
        >
          <Italic className="h-4 w-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          title="Bullet List"
        >
          <List className="h-4 w-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          title="Ordered List"
        >
          <ListOrdered className="h-4 w-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-2 rounded ${editor.isActive('paragraph') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          title="Paragraph"
        >
          <Pilcrow className="h-4 w-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded ${editor.isActive('link') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
          title="Set Link"
        >
          <Link className="h-4 w-4 text-gray-700" />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="p-2 rounded hover:bg-gray-200"
          title="Add Image by URL"
        >
          <Image className="h-4 w-4 text-gray-700" />
        </button>
      </div>
      <EditorContent editor={editor} className="tiptap-editor-content" />
    </div>
  );
};


export default function EditPost() {
  const router = useRouter();
  const { id } = router.query; // Get post ID from URL
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    excerpt: '',
    content: '',
    imageUrl: '',
    category: 'Business',
    type: 'latest',
    tags: [],
    isDraft: false,
    readTime: '',
    author: '',
    authorId: '',
    fullContent: '',
    seoTitle: '',
    seoDescription: '',
    slug: '',
  });
  const [tagInput, setTagInput] = useState('');
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Effect to load user data from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/admin/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      // Set author and authorId from logged-in user if available
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

  // Effect to load post data for editing
  useEffect(() => {
    if (!id || !user) { // Ensure user is loaded before fetching post
      setLoading(true); // Keep loading true if id or user is not ready
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      try {
        const postData = await postsAPI.getById(id as string);
        setFormData({
          title: postData.title || '',
          excerpt: postData.excerpt || '',
          content: postData.content || '',
          imageUrl: postData.imageUrl || '',
          category: postData.category || 'Business',
          type: postData.type || 'latest',
          tags: postData.tags || [],
          isDraft: postData.isDraft || false,
          readTime: postData.readTime || '',
          author: postData.author || (user?.role === 'superadmin' ? 'Super Admin' : 'Content Admin'),
          authorId: postData.authorId || user?._id,
          fullContent: postData.fullContent || postData.content || '',
          seoTitle: postData.seoTitle || '',
          seoDescription: postData.seoDescription || '',
          slug: postData.slug || '',
        });
        setImagePreviewUrl(postData.imageUrl); // Set initial preview from fetched image
      } catch (error: any) {
        console.error('Error fetching post:', error);
        setAlertMessage(error.message || 'Failed to fetch post for editing.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user]); // Depend on 'id' and 'user'

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = (e.target as HTMLInputElement).type === 'checkbox' || (e.target as HTMLInputElement).type === 'radio'
      ? (e.target as HTMLInputElement).checked
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
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
      setFormData(prev => ({ ...prev, imageUrl: '' })); // Clear direct URL if file selected
    } else {
      setSelectedImageFile(null);
      setImagePreviewUrl(formData.imageUrl || null); // Revert to fetched URL if no new file
    }
  }, [formData.imageUrl]); // Add formData.imageUrl to dependency array

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

  // ⭐ FIX: Modified uploadImage to send FormData instead of Base64 JSON ⭐
  const uploadImage = async (file: File): Promise<string> => {
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('image', file); // 'image' should match the field name in your API (`files.image`)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data', // Fetch handles this automatically for FormData
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
        body: formData, // Send FormData directly
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Image upload failed');
      }

      const data = await response.json();
      return data.imageUrl;
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

    if (!formData.title || !formData.content || !formData.category || !formData.type || !formData.readTime) {
        setAlertMessage('Please fill in all required fields: Title, Content, Category, Type, and Read Time.');
        setLoading(false);
        return;
    }
    if (!selectedImageFile && !formData.imageUrl) {
        setAlertMessage('Please either select an image file or provide an Image URL.');
        setLoading(false);
        return;
    }

    let finalImageUrl = formData.imageUrl;
    try {
      if (selectedImageFile) {
        finalImageUrl = await uploadImage(selectedImageFile);
      } else if (!finalImageUrl) {
        throw new Error('No image provided.');
      }

      const postData = {
        ...formData,
        imageUrl: finalImageUrl,
        author: formData.author || (user?.role === 'superadmin' ? 'Super Admin' : 'Content Admin'),
        authorId: formData.authorId || user?._id,
        slug: formData.title.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, ''),
        readTime: Number(formData.readTime),
      };

      await postsAPI.update(id as string, postData); // Use postsAPI.update for editing
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Error updating post:', error);
      setAlertMessage(error.message || 'Failed to update post');
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  const handleDelete = async () => {
    setShowDeleteConfirm(false); // Close confirmation modal
    setLoading(true);
    setAlertMessage(null);
    try {
      await postsAPI.delete(id as string);
      router.push('/admin/dashboard'); // Redirect after deletion
    } catch (error: any) {
      console.error('Error deleting post:', error);
      setAlertMessage(error.message || 'Failed to delete post.');
    } finally {
      setLoading(false);
    }
  };


  if (loading && !formData.title) { // Show full loading only if post data hasn't loaded yet
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Post Data...</p>
        </div>
      </div>
    );
  }

  if (!user) { // Still wait for user authentication
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Authenticating User...</p>
        </div>
      </div>
    );
  }


  const currentImageSource = imagePreviewUrl || formData.imageUrl;

  return (
    <div className="min-h-screen bg-gray-50">
      {alertMessage && <CustomAlertModal message={alertMessage} onClose={() => setAlertMessage(null)} />}
      {showDeleteConfirm && (
        <ConfirmationModal
          message="Are you sure you want to delete this post? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
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
              <h1 className="text-2xl font-bold text-gray-900">Edit Post</h1>
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
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors shadow-md"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
              <button
                type="submit"
                form="post-form"
                disabled={loading || uploadingImage}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? 'Saving...' : uploadingImage ? 'Uploading Image...' : 'Update Post'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {previewMode ? (
          <div className="bg-white shadow-lg rounded-xl p-8 transition-all duration-300">
            {currentImageSource && (
              <img
                src={currentImageSource}
                alt={formData.title || 'Post Image'}
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => { e.currentTarget.src = "https://placehold.co/800x400/cccccc/333333?text=Image+Load+Error"; e.currentTarget.onerror = null; }}
              />
            )}
            {!currentImageSource && (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-6 text-gray-500">
                    <span className="text-lg font-medium">No Image Provided</span>
                </div>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title || 'Untitled Post'}</h1>
            {formData.excerpt && (
              <p className="text-lg text-gray-600 mb-6 italic">"{formData.excerpt}"</p>
            )}
            <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
              <span>Category: {formData.category}</span>
              <span>Type: {POST_TYPES.find(t => t.value === formData.type)?.label}</span>
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
                // Render HTML content for preview
                <div dangerouslySetInnerHTML={{ __html: formData.content }} />
              ) : (
                <p className="text-gray-400 italic">No content yet...</p>
              )}
            </div>
          </div>
        ) : (
          <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                    </label>
                  <input
                    type="text"
                    required
                    name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    placeholder="Enter post title..."
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                    required
                    name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    >
                      {CATEGORIES.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Post Type *
                    </label>
                  <select
                    required
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  >
                    {POST_TYPES.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="readTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Read Time (minutes) *
                  </label>
                  <input
                    type="number"
                    required
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    placeholder="Estimated read time..."
                  />
                </div>

                <div>
                  <label htmlFor="isDraft" className="block text-sm font-medium text-gray-700 mb-2">
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
                      <span className="text-sm text-gray-800">Publish</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isDraft"
                        checked={formData.isDraft}
                        onChange={() => setFormData(prev => ({ ...prev, isDraft: true }))}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-800">Save as Draft</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
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
                          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-white text-gray-700"
                      >
                          <UploadCloud className="h-4 w-4" />
                          <span>{selectedImageFile ? selectedImageFile.name : 'Choose File'}</span>
                      </label>
                      <span className="text-sm text-gray-500">OR</span>
                      <input
                          type="url"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          placeholder="Paste Image URL"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
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
                            <p className="text-xs text-gray-500 mt-1 text-gray-800">
                                Selected: {selectedImageFile.name} ({(selectedImageFile.size / 1024).toFixed(2)} KB)
                            </p>
                        )}
                    </div>
                  )}
                  {uploadingImage && <p className="text-blue-600 text-sm mt-2 text-gray-800">Uploading image...</p>}
                </div>

              </div>

              <div className="mt-6">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  placeholder="Brief summary of the post..."
                />
              </div>

              <div className="mt-6">
                <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  value={formData.seoTitle || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  placeholder="SEO friendly title..."
                />
              </div>

              <div className="mt-6">
                <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Description
                </label>
                <textarea
                  name="seoDescription"
                  value={formData.seoDescription || ''}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  placeholder="Meta description for search engines..."
                />
              </div>

              <div className="mt-6">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
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
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                    </label>
                    <TiptapEditor
                      initialContent={formData.content}
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
