import React, { useState } from 'react';
import { signUp } from '../../lib/supabase';

type SignupProps = {
  onSwitchToLogin: () => void;
};

const Signup: React.FC<SignupProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords don\'t match');
      return;
    }

    setIsLoading(true);
    try {
      const { error: signUpError } = await signUp(email, password);
      
      if (signUpError) {
        throw new Error(signUpError.message);
      }

      setSuccess(true);
      setTimeout(() => {
        onSwitchToLogin();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup');
      setIsLoading(false);
    }
  };

  return (
    <div id="signupPage" className="login-form p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Join Yfitops</h1>
      
      {error && (
        <div className="text-center text-sm mb-4" style={{ color: 'var(--error-color)' }}>
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          Account created successfully! Please check your email to confirm your signup.
          Redirecting to login...
        </div>
      )}
      
      <form onSubmit={handleSignup}>
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
        
        <input 
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="login-input w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        <button 
          type="submit" 
          className="spotify-button w-full flex justify-center items-center"
          disabled={isLoading || success}
        >
          {isLoading ? (
            <span className="inline-block animate-spin h-5 w-5 border-t-2 border-b-2 border-black rounded-full mr-2"></span>
          ) : null}
          Sign up
        </button>
      </form>
      
      <p className="text-center text-sm mt-4">
        Already have an account? 
        <a href="#" onClick={onSwitchToLogin} className="text-accent hover:underline ml-1">
          Log in
        </a>
      </p>
    </div>
  );
};

export default Signup;