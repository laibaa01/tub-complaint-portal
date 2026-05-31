/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  LogIn,
  UserPlus
} from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function RegisterView({ onLoginClick }) {
  const [fullName, setFullName]         = useState('');
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPassword, setConfirm]   = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [errorMsg, setErrorMsg]         = useState('');
  const [successMsg, setSuccessMsg]     = useState('');
  const [loading, setLoading]           = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validation
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (!email.toLowerCase().endsWith('@tub.edu.pk')) {
      setErrorMsg('Please use your institutional email (e.g. name@tub.edu.pk).');
      return;
    }

    if (password.length < 3) {
      setErrorMsg('Password must be at least 3 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please try again.');
      return;
    }

    setLoading(true);

    try {
      // Pehle check karo yeh email already exist to nahi karti
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (existingUser) {
        setErrorMsg('This email is already registered. Please login.');
        setLoading(false);
        return;
      }

      // Naya user Supabase mein insert karo
      const { error } = await supabase
        .from('users')
        .insert([{
          name: fullName.trim(),
          email: email.toLowerCase().trim(),
          password: password,
          role: 'Student'
        }]);

      if (error) {
        setErrorMsg('Registration failed: ' + error.message);
        setLoading(false);
        return;
      }

      // Success!
      setSuccessMsg('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        onLoginClick();
      }, 2000);

    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-2xl">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

            {/* Banner */}
            <div className="bg-[#0C2340] px-10 py-10 text-center space-y-1.5">
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-blue-300" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Create Your Account</h2>
              <p className="text-sm text-slate-400">Thal University Complaint Management System</p>
            </div>

            {/* Form */}
            <div className="px-10 py-10 space-y-5">

              {errorMsg && (
                <div className="bg-rose-50 text-rose-700 border border-rose-200 p-3 text-xs flex items-center gap-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="bg-emerald-50 text-emerald-700 border border-emerald-200 p-3 text-xs flex items-center gap-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <input type="text" style={{ display: 'none' }} aria-hidden="true" />
              <input type="password" style={{ display: 'none' }} aria-hidden="true" />

              <form onSubmit={handleRegister} autoComplete="off" className="space-y-6">

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Ahmed Raza"
                    autoComplete="off"
                    className="w-full border border-slate-200 rounded-lg py-4 px-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-slate-800"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Institutional Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="yourname@tub.edu.pk"
                    autoComplete="off"
                    className="w-full border border-slate-200 rounded-lg py-4 px-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-slate-800"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min. 3 characters"
                      autoComplete="new-password"
                      className="w-full border border-slate-200 rounded-lg py-4 px-4 pr-10 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-slate-800"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirm(e.target.value)}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      className="w-full border border-slate-200 rounded-lg py-4 px-4 pr-10 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-slate-800"
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword && (
                    <p className={`text-xs mt-1 ${password === confirmPassword ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 text-sm rounded-xl flex justify-center items-center gap-2 font-bold tracking-wide shadow-md shadow-blue-900/20 transition-all cursor-pointer mt-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Create Account
                    </>
                  )}
                </button>

              </form>

              {/* Login Link */}
              <div className="pt-4 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  Already have an account?{' '}
                  <button onClick={onLoginClick}
                    className="text-blue-600 hover:text-blue-500 font-semibold transition-colors cursor-pointer inline-flex items-center gap-1">
                    <LogIn className="w-3.5 h-3.5" />
                    Login Here
                  </button>
                </p>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
