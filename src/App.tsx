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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_OUT') setSession(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route 
              path="/auth" 
              element={!session ? <AuthPage /> : <Navigate replace to="/" />} 
            />
            <Route 
              path="/genre/:genreName" 
              element={session ? <MainApp /> : <Navigate replace to="/auth" />} 
            />
            <Route 
              path="/*" 
              element={session ? <MainApp /> : <Navigate replace to="/auth" />} 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
