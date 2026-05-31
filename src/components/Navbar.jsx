/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LogIn, LogOut, Menu, X, LayoutDashboard, Home } from 'lucide-react';

export default function Navbar({
  currentUser,
  onLoginClick,
  onLogout,
  currentView,
  onViewChange
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view, elementId) => {
    setMobileMenuOpen(false);
    onViewChange(view);
    if (elementId) {
      setTimeout(() => {
        const item = document.getElementById(elementId);
        if (item) {
          item.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0C2340] text-white border-b border-[#1E3A5F]">
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo Brand */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group"
            id="nav-logo"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden bg-[#0C2340] group-hover:bg-[#112F56] transition-colors">
              <img
                src="/src/assets/images/logo.png"
                alt="Thal University Logo"
                className="w-10 h-10 object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/40x40/0c2340/ffffff?text=Logo";
                }}
              />
            </div>
            <div>
              <span className="block font-display font-bold tracking-wider text-sm sm:text-base text-white">
                THAL UNIVERSITY
              </span>
              <span className="block text-xs font-mono text-gray-300 tracking-widest leading-none">
                BHAKKAR
              </span>
            </div>
            <div className="hidden xl:block h-6 border-l border-slate-600 pl-3">
              <span className="text-xs font-sans text-gray-300 font-medium tracking-wide">
                University Complaint Management System
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {currentView === 'home' && (
              <>
                <button
                  onClick={() => handleNavClick('home')}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('home', 'features')}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => handleNavClick('home', 'contact-section-footer')}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                >
                  Contact Us
                </button>
              </>
            )}

            {currentView !== 'home' && (
              <button
                onClick={() => onViewChange('home')}
                className="flex items-center space-x-1.5 text-gray-300 hover:text-white text-sm font-medium transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Return to Web</span>
              </button>
            )}

            {/* Login / Logout */}
            {currentUser ? (
              <div className="flex items-center space-x-4 border-l border-slate-700 pl-4">
                <button
                  onClick={() => onViewChange(currentUser.role === 'Student' ? 'student-dashboard' : 'admin-dashboard')}
                  className="flex items-center space-x-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-medium transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium tracking-wide text-white transition-all duration-200 shadow-md shadow-blue-900/20 active:scale-95 cursor-pointer"
                id="btn-nav-login"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C2340] border-t border-slate-800 px-4 pt-2 pb-4 space-y-2">
          {currentView === 'home' && (
            <>
              <button
                onClick={() => handleNavClick('home')}
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-gray-300 hover:text-white text-base font-medium"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('home', 'features')}
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-gray-300 hover:text-white text-base font-medium"
              >
                Features
              </button>
              <button
                onClick={() => handleNavClick('home', 'contact-section-footer')}
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-gray-300 hover:text-white text-base font-medium"
              >
                Contact Us
              </button>
            </>
          )}

          {currentView !== 'home' && (
            <button
              onClick={() => { setMobileMenuOpen(false); onViewChange('home'); }}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-slate-800 text-gray-300 hover:text-white text-base font-medium"
            >
              Return to Web Home
            </button>
          )}

          <div className="pt-4 border-t border-slate-800">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); onViewChange(currentUser.role === 'Student' ? 'student-dashboard' : 'admin-dashboard'); }}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md bg-slate-800 text-blue-400 hover:text-white text-base font-medium"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); onLogout(); }}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white text-base font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); onLoginClick(); }}
                className="flex items-center justify-center space-x-2 w-full px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-base font-medium transition-colors"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
