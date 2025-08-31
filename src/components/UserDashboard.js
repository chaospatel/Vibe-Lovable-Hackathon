import React, { useState } from 'react';
import { User, PenTool, Home, Search, TrendingUp, Eye, Heart, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockBlogs } from '../data/mockData';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [blogs, setBlogs] = useState(mockBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    category: 'React'
  });

  const categories = ['React', 'Node.js', 'Database', 'JavaScript', 'Python', 'DevOps'];

  const filteredBlogs = blogs.filter(blog => 
    blog.status === 'published' && 
    (blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     blog.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const trendingBlogs = [...filteredBlogs].sort((a, b) => (b.likes + b.comments) - (a.likes + a.comments)).slice(0, 5);
  const userBlogs = blogs.filter(blog => blog.authorId === user.id);

  const handleLike = (blogId) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId 
        ? { ...blog, likes: blog.likes + 1 }
        : blog
    ));
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    const blog = {
      id: Date.now(),
      ...newBlog,
      author: user.name,
      authorId: user.id,
      status: 'pending',
      likes: 0,
      comments: 0,
      views: 0,
      createdAt: new Date().toISOString()
    };
    setBlogs([...blogs, blog]);
    setNewBlog({ title: '', content: '', category: 'React' });
    setActiveTab('profile');
    alert('Blog submitted for review!');
  };

  const handleInputChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value
    });
  };

  const renderNavbar = () => (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Devnovate
            </h1>
            <div className="hidden md:flex space-x-6">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'trending', label: 'Trending', icon: TrendingUp },
                { id: 'create', label: 'Write', icon: PenTool },
                { id: 'profile', label: 'My Blogs', icon: User }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-gray-700 font-medium">{user.name}</span>
            </div>
            <button
              onClick={logout}
              className="text-gray-500 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const renderHome = () => (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Latest Blogs */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Latest Blogs</h2>
        <div className="grid gap-6">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{blog.content.substring(0, 200)}...</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {blog.author}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{blog.category}</span>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(blog.id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{blog.likes}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <MessageCircle className="w-5 h-5" />
                    <span>{blog.comments}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Eye className="w-5 h-5" />
                    <span>{blog.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTrending = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">🔥 Trending Blogs</h2>
      <div className="grid gap-6">
        {trendingBlogs.map((blog, index) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 border-orange-500">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 text-orange-800 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.content.substring(0, 150)}...</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span>By {blog.author}</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">{blog.category}</span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 text-red-500">
                    <Heart className="w-5 h-5" />
                    <span>{blog.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-500">
                    <MessageCircle className="w-5 h-5" />
                    <span>{blog.comments}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-500">
                    <Eye className="w-5 h-5" />
                    <span>{blog.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateBlog = () => (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog</h2>
      <form onSubmit={handleCreateBlog} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your blog title..."
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={newBlog.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            name="content"
            value={newBlog.content}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your blog content..."
            rows={8}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Blogs</h2>
      <div className="grid gap-6">
        {userBlogs.length === 0 ? (
          <div className="text-gray-500">You haven't submitted any blogs yet.</div>
        ) : (
          userBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4
              {blog.status === 'pending' ? 'border-yellow-400' : blog.status === 'rejected' ? 'border-red-400' : 'border-green-400'}">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${blog.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    blog.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    blog.status === 'published' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                </span>
              </div>
              <div className="text-gray-600 mb-2">{blog.content.substring(0, 150)}...</div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{blog.category}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                <span><Heart className="inline w-4 h-4 mr-1" />{blog.likes}</span>
                <span><MessageCircle className="inline w-4 h-4 mr-1" />{blog.comments}</span>
                <span><Eye className="inline w-4 h-4 mr-1" />{blog.views}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavbar()}
      <main className="container mx-auto px-6 py-10">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'trending' && renderTrending()}
        {activeTab === 'create' && renderCreateBlog()}
        {activeTab === 'profile' && renderProfile()}
      </main>
    </div>
  );
};
// ...existing code...
export default UserDashboard;
