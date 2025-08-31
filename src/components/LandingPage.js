import React, { useState } from 'react';
import { User, BookOpen, TrendingUp, Users, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LandingPage = ({ onNavigate }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [userType, setUserType] = useState('user'); // 'user' or 'admin'
  const { login, signup, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (authMode === 'login') {
        await login(formData.email, formData.password, userType);
      } else {
        await signup(formData.email, formData.password, formData.name, userType);
      }
      onNavigate(userType === 'admin' ? 'admin' : 'user');
    } catch (error) {
      console.error('Authentication failed:', error);
      alert('Authentication failed. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Devnovate</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The ultimate blogging platform for developers. Share your knowledge, discover trending content, and connect with a vibrant community of tech enthusiasts.
            </p>
            <div className="flex justify-center space-x-6 mb-12">
              <div className="flex items-center space-x-2 text-cyan-400">
                <BookOpen className="w-6 h-6" />
                <span>Write & Publish</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <TrendingUp className="w-6 h-6" />
                <span>Trending Content</span>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Users className="w-6 h-6" />
                <span>Developer Community</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Join Our Community</h2>
          
          {!showAuth ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* User Signup */}
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Join as Writer</h3>
                  <p className="text-gray-300 mb-6">Share your knowledge, create amazing content, and engage with the developer community.</p>
                  <ul className="text-left space-y-2 mb-8 text-gray-300">
                    <li>✨ Write and publish blogs</li>
                    <li>💬 Engage with community</li>
                    <li>📈 Track your content performance</li>
                    <li>🎯 Build your developer profile</li>
                  </ul>
                  <button
                    onClick={() => {
                      setUserType('user');
                      setShowAuth(true);
                    }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started as Writer
                  </button>
                </div>
              </div>

              {/* Admin Signup */}
              <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Join as Admin</h3>
                  <p className="text-gray-300 mb-6">Manage content quality, moderate community, and shape the platform's direction.</p>
                  <ul className="text-left space-y-2 mb-8 text-gray-300">
                    <li>⚡ Content moderation tools</li>
                    <li>📊 Analytics dashboard</li>
                    <li>👥 User management</li>
                    <li>🛡️ Platform administration</li>
                  </ul>
                  <button
                    onClick={() => {
                      setUserType('admin');
                      setShowAuth(true);
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started as Admin
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Authentication Form */
            <div className="max-w-md mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
              <div className="text-center mb-8">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  userType === 'admin' 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                }`}>
                  {userType === 'admin' ? <Award className="w-8 h-8 text-white" /> : <User className="w-8 h-8 text-white" />}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {authMode === 'login' ? 'Sign In' : 'Create Account'}
                </h3>
                <p className="text-gray-300">as {userType === 'admin' ? 'Administrator' : 'Writer'}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {authMode === 'signup' && (
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>
                )}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-all duration-300 ${
                    userType === 'admin'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                  } text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 transform'}`}
                >
                  {isLoading ? 'Processing...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  {authMode === 'login' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setShowAuth(false);
                    setFormData({ email: '', password: '', name: '' });
                  }}
                  className="text-gray-400 hover:text-gray-300 transition-colors text-sm"
                >
                  ← Back to selection
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
