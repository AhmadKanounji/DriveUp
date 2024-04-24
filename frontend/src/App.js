import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignUp from './signUp';
import SignIn from './signIn';
import FileUpload from './FileUpload';
import Landing from './Landing';
import ForgotPassword from './forgotPassword';
import ResetPassword from './resetPassword';
import RecentFiles from './recentFiles';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') ? true : false
  );

  useEffect(() => {
    // Sync the auth state on app load/reload
    const checkAuthState = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };
    checkAuthState();
  }, []);

  const handleSignIn = (token, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
      localStorage.removeItem('token'); 
    }
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <AuthButtons isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/upload"
            element={isAuthenticated ? <FileUpload onLogout={handleLogout} /> : <Navigate to="/signin" replace />}
          />
          <Route path="/drive/recent-files" element={<RecentFiles />} />
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </div>
    </Router>
  );
}

function AuthButtons({ isAuthenticated, onLogout }) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/upload');
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <>
      {isAuthenticated ? (
        <button onClick={() => { onLogout(); navigate('/signin'); }}>Logout</button>
      ) : (
        <button onClick={() => navigate('/signin')}>Sign In</button>
      )}
    </>
  );
}

export default App;
