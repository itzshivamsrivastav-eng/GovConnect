import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LandmarkIcon,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';

import { login, loginDemo } from '../services/authApi';
import { useToast } from '../components/ToastContext';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { showToast } = useToast();

  function handleSubmit(e) {
    e.preventDefault();

    const result = login({ identifier, password });

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
    <div className="min-h-screen relative overflow-hidden bg-[#f5f9ff] flex items-center justify-center px-4 py-8">

      {/* Background Decorative Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Top Right Blue Shapes */}
        <div className="absolute -top-20 -right-24 w-[430px] h-[220px] bg-blue-100/70 rotate-[25deg] rounded-[50%]" />
        <div className="absolute -top-28 -right-10 w-[430px] h-[190px] border-[28px] border-blue-200/40 rotate-[25deg] rounded-[50%]" />

        {/* Bottom Left Tricolor Inspired Curves */}
        <div className="absolute -bottom-28 -left-32 w-[550px] h-[190px] bg-orange-200/60 rotate-[25deg] rounded-[50%]" />
        <div className="absolute -bottom-36 -left-24 w-[550px] h-[170px] bg-white rotate-[25deg] rounded-[50%]" />
        <div className="absolute -bottom-44 -left-16 w-[560px] h-[170px] bg-emerald-200/60 rotate-[25deg] rounded-[50%]" />

        {/* Right Bottom Building Silhouette */}
        <div className="absolute right-[-80px] bottom-[-40px] opacity-[0.10] text-blue-300">
          <div className="w-[420px] h-[220px] rounded-t-[220px] border-[25px] border-blue-300 relative">
            <div className="absolute left-1/2 -translate-x-1/2 -top-[75px] w-20 h-20 rounded-full border-[15px] border-blue-300" />
            <div className="absolute left-10 right-10 top-20 h-24 border-x-[20px] border-blue-300" />
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[560px]">

        {/* Brand */}
        <Link
          to="/"
          className="flex flex-col items-center justify-center mb-8"
        >
          <div className="flex items-center gap-3">
            <LandmarkIcon
              size={38}
              strokeWidth={2.4}
              className="text-[#f2a33a]"
            />

            <span className="font-heading text-[34px] sm:text-[38px] font-bold tracking-tight text-[#092f6b]">
              GovConnect
            </span>
          </div>

          <div className="mt-3 flex items-center gap-3 text-sm sm:text-base text-[#71829d]">
            <span>One Profile</span>
            <span className="text-gray-300">•</span>
            <span>Multiple Services</span>
            <span className="text-gray-300">•</span>
            <span>A Smarter Tomorrow</span>
          </div>
        </Link>

        {/* Login Card */}
        <div className="rounded-2xl border border-[#dce6f3] bg-white/95 backdrop-blur-sm p-7 sm:p-9 shadow-[0_12px_40px_rgba(25,65,120,0.10)]">

          {/* Heading */}
          <div className="mb-7">
            <h1 className="font-heading text-3xl font-bold text-[#092f6b] mb-2">
              Login
            </h1>

            <p className="text-sm sm:text-base text-[#667892]">
              Enter your details to access your GovConnect account.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-[#33445c] mb-2">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={21}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8291a8]"
                />

                <input
                  type="text"
                  value={identifier.includes('@') ? '' : identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-[49px] rounded-xl border border-[#cfd9e6] bg-white pl-12 pr-4 text-sm text-[#26364d] placeholder:text-[#91a0b4] outline-none transition-all focus:border-[#125bb5] focus:ring-2 focus:ring-blue-100"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email / Mobile */}
            <div>
              <label className="block text-sm font-semibold text-[#33445c] mb-2">
                Email or Mobile Number
              </label>

              <div className="relative">
                <Mail
                  size={21}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8291a8]"
                />

                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-[49px] rounded-xl border border-[#cfd9e6] bg-white pl-12 pr-4 text-sm text-[#26364d] placeholder:text-[#91a0b4] outline-none transition-all focus:border-[#125bb5] focus:ring-2 focus:ring-blue-100"
                  placeholder="you@example.com or 9876543210"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#33445c] mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={21}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#53647d]"
                />

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[49px] rounded-xl border border-[#cfd9e6] bg-white pl-12 pr-12 text-sm text-[#26364d] placeholder:text-[#91a0b4] outline-none transition-all focus:border-[#125bb5] focus:ring-2 focus:ring-blue-100"
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71829d] hover:text-[#092f6b] transition-colors"
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={21} />
                  ) : (
                    <Eye size={21} />
                  )}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-[49px] rounded-xl bg-[#075bb5] hover:bg-[#064c97] transition-all text-white font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              <span>Login</span>
              <ArrowRight size={20} />
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="h-px flex-1 bg-[#e2e7ee]" />

            <span className="text-xs font-medium text-[#8b98aa]">
              OR
            </span>

            <div className="h-px flex-1 bg-[#e2e7ee]" />
          </div>

          {/* Demo Account */}
          <button
            type="button"
            onClick={handleDemo}
            className="w-full h-[49px] rounded-xl border border-[#e5c49d] bg-[#fffdfa] text-[#a76627] hover:bg-[#fff8ed] transition-all font-semibold flex items-center justify-center gap-2"
          >
            <User size={20} />
            <span>Use Demo Account</span>
          </button>

          <p className="text-xs sm:text-sm text-[#8290a4] mt-4 text-center leading-5">
            Demo account contains pre-filled mock profile and application data.
          </p>
        </div>
      </div>
    </div>
  );
}