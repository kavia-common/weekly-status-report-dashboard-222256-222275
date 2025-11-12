import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// PUBLIC_INTERFACE
/**
 * LoginPage component - Minimal permissive login form for demo usage.
 * Any email/password combination will "log in" by setting localStorage 'isLoggedIn' = 'true'.
 * Uses Minimalist Soft Mono theme and Tailwind classes. Includes data-testid attributes.
 *
 * Behavior:
 * - If already logged in, redirect to '/dashboard' if present, otherwise '/'.
 * - On submit, set isLoggedIn and redirect to the main app route.
 *
 * @returns {JSX.Element} The login page component
 */
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in, redirect away from login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      // Prefer dashboard if route exists in app
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Permissive: accept any creds and set logged-in state
    localStorage.setItem('isLoggedIn', 'true');
    // Prefer dashboard if available else root
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-6">
            <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-text">Sign in</h1>
            <p className="mt-1 text-sm text-secondary">
              Weekly Status Report Dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-text mb-2">
                Email
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@company.com"
                data-testid="login-email"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-text mb-2">
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter your password"
                data-testid="login-password"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-lg bg-primary text-white px-4 py-2 font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              data-testid="login-submit"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-xs text-secondary text-center">
            This is a demo login. Any email and password will sign you in.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
