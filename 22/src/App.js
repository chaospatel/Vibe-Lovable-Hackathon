import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { useAuth } from './contexts/AuthContext';
import './App.css';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setCurrentPage(user.type === 'admin' ? 'admin' : 'user');
    } else {
      setCurrentPage('landing');
    }
  }, [user]);

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'landing' && <LandingPage onNavigate={handleNavigation} />}
      {currentPage === 'user' && <UserDashboard />}
      {currentPage === 'admin' && <AdminDashboard />}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
