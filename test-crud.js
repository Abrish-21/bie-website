const axios = require('axios');

const API_BASE = 'http://localhost:3000/api';

async function testCRUD() {
  console.log('🧪 Testing CRUD Operations for Posts\n');

  try {
    // 1. Login to get token
    console.log('1️⃣ Login to get JWT token...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@bie-website.com',
      password: 'admin123'
    });
    const token = loginResponse.data.token;
    console.log('✅ Login successful\n');

    // 2. GET all posts
    console.log('2️⃣ GET all posts...');
    const getPostsResponse = await axios.get(`${API_BASE}/posts`);
    const posts = getPostsResponse.data.posts;
    console.log(`✅ Found ${posts.length} posts`);
    posts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
    });
    console.log('');

    // 3. GET post by slug
    console.log('3️⃣ GET post by slug...');
    const slug = posts[0].slug;
    const getPostResponse = await axios.get(`${API_BASE}/posts/slug/${slug}`);
    console.log(`✅ Retrieved post: ${getPostResponse.data.post.title}\n`);

    // 4. Filter posts by tag
    console.log('4️⃣ Filter posts by tag...');
    const filterResponse = await axios.get(`${API_BASE}/posts?tag=Technology`);
    console.log(`✅ Found ${filterResponse.data.posts.length} posts with Technology tag\n`);

    // 5. CREATE new post
    console.log('5️⃣ CREATE new post...');
    const newPost = {
      title: 'Test Post via Script',
      excerpt: 'This is a test post created via script',
      content: '<p>This is the full content of the test post created via script.</p>',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      category: 'TEST',
      readTime: '5 min read',
      tags: ['Test', 'Script'],
      type: 'featuredArticle'
    };

    try {
      const createResponse = await axios.post(`${API_BASE}/posts`, newPost, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`✅ Post created: ${createResponse.data.post.title}`);
      const newPostId = createResponse.data.post._id;
      console.log(`   ID: ${newPostId}\n`);

      // 6. UPDATE post
      console.log('6️⃣ UPDATE post...');
      const updateData = {
        title: 'Updated Test Post via Script',
        excerpt: 'This post has been updated via script'
      };
      const updateResponse = await axios.put(`${API_BASE}/posts/${newPostId}`, updateData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(`✅ Post updated: ${updateResponse.data.post.title}\n`);

      // 7. DELETE post
      console.log('7️⃣ DELETE post...');
      await axios.delete(`${API_BASE}/posts/${newPostId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Post deleted successfully\n');

    } catch (error) {
      console.log('❌ Error in CREATE/UPDATE/DELETE operations:');
      console.log('   This might be due to authentication or validation issues');
      console.log('   Check the server logs for more details\n');
    }

    // 8. Test other endpoints
    console.log('8️⃣ Test other endpoints...');
    
    // Get tags
    const tagsResponse = await axios.get(`${API_BASE}/posts/tags`);
    console.log(`✅ Available tags: ${tagsResponse.data.tags.join(', ')}`);
    
    // Get categories
    const categoriesResponse = await axios.get(`${API_BASE}/posts/categories`);
    console.log(`✅ Available categories: ${categoriesResponse.data.categories.join(', ')}\n`);

    console.log('🎉 CRUD testing completed!');

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testCRUD();

