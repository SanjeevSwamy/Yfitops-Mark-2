import React, { useState } from 'react';
import { signIn } from '../../lib/supabase';

type LoginProps = {
  onSwitchToSignup: () => void;
};

const Login: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        throw new Error(signInError.message);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      setIsLoading(false);
    }
  };

  return (
    <div id="loginPage" className="login-form p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Yfitops</h1>
      
      {error && (
        <div className="text-center text-sm mb-4" style={{ color: 'var(--error-color)' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <input 
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        <input 
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        <button 
          type="submit" 
          className="spotify-button w-full flex justify-center items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="inline-block animate-spin h-5 w-5 border-t-2 border-b-2 border-black rounded-full mr-2"></span>
          ) : null}
          Log in
        </button>
      </form>
      
      <p className="text-center text-sm mt-4">
        Don't have an account? 
        <a href="#" onClick={onSwitchToSignup} className="text-accent hover:underline ml-1">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default Login;