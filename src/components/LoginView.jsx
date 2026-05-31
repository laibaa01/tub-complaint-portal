/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle, Sparkles, UserPlus } from 'lucide-react';
import { supabase } from '../supabaseClient'; 

export default function LoginView({
  onBackToHome,
  onLoginSuccess,
  onRegisterClick,
  preselectedEmail
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  useEffect(() => {
    if (preselectedEmail) {
      const emailValue = typeof preselectedEmail === 'object' && preselectedEmail !== null 
        ? (preselectedEmail.email || '') 
        : preselectedEmail;
      
      if (emailValue) {
        setEmail(emailValue);
        setInfoMsg(`Account ${emailValue} ready`);
        const t = setTimeout(() => setInfoMsg(''), 3000);
        return () => clearTimeout(t);
      }
    }
  }, [preselectedEmail]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!email || !password || !role) {
      setErrorMsg('All fields are required.');
      return;
    }

    // Dynamic Database Authentication
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.trim().toLowerCase())
      .eq('password', password)
      .eq('role', role)
      .maybeSingle();

    if (error) {
      setErrorMsg('Connection error. Please try again.');
      return;
    }

    if (data) {
      onLoginSuccess(data);
    } else {
      setErrorMsg('Invalid email, password, or role selection.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-[#0C2340] px-10 py-10 text-center space-y-1.5">
              <h2 className="text-2xl font-bold text-white tracking-tight">University Portal Login</h2>
              <p className="text-sm text-slate-400">Thal University Complaint Management System</p>
            </div>
            <div className="px-10 py-10 space-y-5">
              {errorMsg && (
                <div className="bg-rose-50 text-rose-700 border border-rose-200 p-3 text-xs flex items-center gap-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
              {infoMsg && (
                <div className="bg-blue-50 text-blue-700 border border-blue-200 p-3 text-xs flex items-center gap-2 rounded-lg">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>{infoMsg}</span>
                </div>
              )}
              <form onSubmit={handleLogin} autoComplete="off" className="space-y-6">
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
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="w-full border border-slate-200 rounded-lg py-4 px-4 pr-10 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-slate-800"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 block">Access Role</label>
                  <select
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg py-4 px-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition-all text-slate-700 font-medium cursor-pointer bg-white appearance-none"
                  >
                    <option value="">Select your role</option>
                    <option value="Student">Student</option>
                    <option value="Administrator">Administrator</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white py-4 text-sm rounded-xl flex justify-center items-center font-bold tracking-wide shadow-md shadow-blue-900/20 transition-all cursor-pointer mt-2">
                  Login
                </button>
              </form>
              <div className="pt-4 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  Don't have an account?{' '}
                  <button onClick={onRegisterClick} className="text-blue-600 hover:text-blue-500 font-semibold transition-colors cursor-pointer inline-flex items-center gap-1">
                    <UserPlus className="w-3.5 h-3.5" />
                    Create Account
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