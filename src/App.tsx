import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase, getCurrentSession } from './lib/supabase';
import AuthPage from './pages/AuthPage';
import MainApp from './pages/MainApp';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/index.css';

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const { data } = await getCurrentSession();
      setSession(data.session);
      setLoading(false);
    }

    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={session ? <MainApp /> : <Navigate replace to="/auth" />} 
          />
          <Route 
            path="/auth" 
            element={!session ? <AuthPage /> : <Navigate replace to="/" />} 
          />
          <Route 
            path="/genre/:genreName" 
            element={session ? <MainApp /> : <Navigate replace to="/auth" />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;