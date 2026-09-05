import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LandmarkIcon } from 'lucide-react';
import { login, loginDemo } from '../services/authApi';
import { useToast } from '../components/ToastContext';

export default function Login() {
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { showToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const result = login({
      name,
      identifier,
      password,
    });

    if (!result.success) {
      setError(result.error);
      return;
    }

    showToast(`Welcome, ${result.user.name}!`);
    navigate('/dashboard');
  }

  function handleDemo() {
    loginDemo();
    showToast('Logged in with demo account — Aarav Sharma.');
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 font-heading text-2xl font-bold text-navy-900 mb-8"
        >
          <LandmarkIcon
            size={26}
            className="text-saffron-500"
          />

          GovConnect
        </Link>

        {/* Login Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">

          <h1 className="font-heading text-xl font-semibold text-navy-900 mb-1">
            Login
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Enter your details to access your GovConnect account.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email / Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email or Mobile Number
              </label>

              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                placeholder="you@example.com or 9876543210"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
                placeholder="••••••••"
              />
            </div>

            {/* Login */}
            <button
              type="submit"
              className="w-full rounded-lg bg-navy-800 hover:bg-navy-900 transition-colors text-white font-semibold py-2.5 min-h-[44px]"
            >
              Login
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Demo Login */}
          <button
            type="button"
            onClick={handleDemo}
            className="w-full rounded-lg border border-saffron-400 text-saffron-700 hover:bg-saffron-50 transition-colors font-semibold py-2.5 min-h-[44px]"
          >
            Use Demo Account
          </button>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Demo account contains pre-filled mock profile and application data.
          </p>

        </div>
      </div>
    </div>
  );
}