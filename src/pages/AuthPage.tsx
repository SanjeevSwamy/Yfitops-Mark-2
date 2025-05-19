import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const AuthPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-6">
      <div className="w-full max-w-sm mx-auto">
        {currentView === 'login' ? (
          <Login onSwitchToSignup={() => setCurrentView('signup')} />
        ) : (
          <Signup onSwitchToLogin={() => setCurrentView('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
