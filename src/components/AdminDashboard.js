import React, { useState } from 'react';
import { Home, Clock, CheckCircle, TrendingUp, Search, Eye, Heart, MessageCircle, XCircle, Trash2, BookOpen, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockBlogs } from '../data/mockData';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [blogs, setBlogs] = useState(mockBlogs);
  const [searchTerm, setSearchTerm] = useState('');

  const pendingBlogs = blogs.filter(blog => blog.status === 'pending');
  const publishedBlogs = blogs.filter(blog => blog.status === 'published');
  const rejectedBlogs = blogs.filter(blog => blog.status === 'rejected');

  const handleApproveBlog = (blogId) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId 
        ? { ...blog, status: 'published' }
        : blog
    ));
    alert('Blog approved and published!');
  };

  const handleRejectBlog = (blogId) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId 
        ? { ...blog, status: 'rejected' }
        : blog
    ));
    alert('Blog rejected!');
  };

  const handleDeleteBlog = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      alert('Blog deleted!');
    }
  };

  const handleHideBlog = (blogId) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId 
        ? { ...blog, status: 'hidden' }
        : blog
    ));
    alert('Blog hidden!');
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalBlogs: blogs.length,
    published: publishedBlogs.length,
    pending: pendingBlogs.length,
    rejected: rejectedBlogs.length,
    totalViews: publishedBlogs.reduce((sum, blog) => sum + blog.views, 0),
    totalLikes: publishedBlogs.reduce((sum, blog) => sum + blog.likes, 0)
  };

  const renderNavbar = () => (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Devnovate Admin
            </h1>
            <div className="hidden md:flex space-x-6">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Home },
                { id: 'pending', label: 'Pending Reviews', icon: Clock },
                { id: 'published', label: 'Published', icon: CheckCircle },
                { id: 'analytics', label: 'Analytics', icon: TrendingUp }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                    {tab.id === 'pending' && pendingBlogs.length > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {pendingBlogs.length}
                      </span>
                    )}
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
              <div>
                <span className="text-gray-700 font-medium">{user.name}</span>
                <span className="text-xs text-purple-600 block">Administrator</span>
              </div>
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

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Blogs</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalBlogs}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-3xl font-bold text-green-600">{stats.published}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-3xl font-bold text-purple-600">{stats.totalViews.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Likes</p>
              <p className="text-3xl font-bold text-red-600">{stats.totalLikes}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-gray-600">{stats.rejected}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">
              <XCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Submissions</h3>
        <div className="space-y-4">
          {blogs.slice(0, 5).map(blog => (
            <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">{blog.title}</h4>
                <p className="text-sm text-gray-600">By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                blog.status === 'published' ? 'bg-green-100 text-green-800' :
                blog.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPendingReviews = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Pending Reviews ({pendingBlogs.length})</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      
      <div className="grid gap-6">
        {pendingBlogs.filter(blog => 
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(blog => (
          <div key={blog.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {blog.author}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{blog.category}</span>
                  <span>Submitted: {new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-4 pt-4 border-t">
              <button
                onClick={() => handleApproveBlog(blog.id)}
                className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleRejectBlog(blog.id)}
                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </div>
          </div>
        ))}
        {pendingBlogs.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500">No pending reviews</p>
            <p className="text-gray-400">All caught up! Great work.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderPublished = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Published Blogs ({publishedBlogs.length})</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search published blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
      
      <div className="grid gap-6">
        {publishedBlogs.filter(blog => 
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(blog => (
          <div key={blog.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.content.substring(0, 200)}...</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {blog.author}</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded">{blog.category}</span>
                  <span>Published: {new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
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
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleHideBlog(blog.id)}
                  className="flex items-center space-x-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  <span>Hide</span>
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog.id)}
                  className="flex items-center space-x-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Platform Analytics</h2>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Views per Blog</span>
              <span className="font-semibold">{Math.round(stats.totalViews / Math.max(stats.published, 1))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg. Likes per Blog</span>
              <span className="font-semibold">{Math.round(stats.totalLikes / Math.max(stats.published, 1))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Engagement Rate</span>
              <span className="font-semibold">
                {Math.round((stats.totalLikes / Math.max(stats.totalViews, 1)) * 100)}%
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Status</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Published</span>
              <span className="font-semibold text-green-600">{stats.published}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pending</span>
              <span className="font-semibold text-yellow-600">{stats.pending}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rejected</span>
              <span className="font-semibold text-red-600">{stats.rejected}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Categories</h3>
          <div className="space-y-3">
            {['React', 'Node.js', 'Database'].map(category => (
              <div key={category} className="flex justify-between">
                <span className="text-gray-600">{category}</span>
                <span className="font-semibold">
                  {blogs.filter(blog => blog.category === category && blog.status === 'published').length}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Platform Health</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Approval Rate</span>
              <span className="font-semibold text-green-600">
                {Math.round((stats.published / Math.max(stats.totalBlogs, 1)) * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quality Score</span>
              <span className="font-semibold text-blue-600">
                {Math.round((stats.totalLikes / Math.max(stats.published, 1)) * 10)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Blogs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Blogs</h3>
        <div className="space-y-4">
          {publishedBlogs
            .sort((a, b) => (b.likes + b.views) - (a.likes + a.views))
            .slice(0, 5)
            .map((blog, index) => (
            <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{blog.title}</h4>
                  <p className="text-sm text-gray-600">By {blog.author}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1 text-red-500">
                  <Heart className="w-4 h-4" />
                  <span>{blog.likes}</span>
                </div>
                <div className="flex items-center space-x-1 text-green-500">
                  <Eye className="w-4 h-4" />
                  <span>{blog.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {renderNavbar()}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'pending' && renderPendingReviews()}
        {activeTab === 'published' && renderPublished()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default AdminDashboard;
