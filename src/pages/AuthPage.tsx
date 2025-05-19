import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const AuthPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');

  return (
    <div className="absolute inset-0 flex items-center justify-center login-container z-10">
      {currentView === 'login' ? (
        <Login onSwitchToSignup={() => setCurrentView('signup')} />
      ) : (
        <Signup onSwitchToLogin={() => setCurrentView('login')} />
      )}
    </div>
  );
};

export default AuthPage;