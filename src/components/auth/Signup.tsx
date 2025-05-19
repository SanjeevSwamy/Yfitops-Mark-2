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
      setError("Passwords don't match");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          Join Yfitops
        </h1>

        {error && (
          <div className="text-center text-sm mb-4 text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center dark:bg-green-900 dark:border-green-600 dark:text-green-300">
            Account created successfully! Please check your email to confirm your signup.
            <br />
            Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full p-3 mb-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold flex justify-center items-center transition-colors"
            disabled={isLoading || success}
          >
            {isLoading ? (
              <span className="inline-block animate-spin h-5 w-5 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
            ) : null}
            Sign up
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-700 dark:text-gray-300">
          Already have an account?
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-green-600 dark:text-green-400 hover:underline ml-1"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
