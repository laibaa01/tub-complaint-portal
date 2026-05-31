/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import universityImg from '../assets/images/university_image.png';
import React from 'react';
import {
  Users,
} from 'lucide-react';

export default function HomeView({ onLoginClick, stats }) {

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ── 1. Hero Section ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0C2340] via-[#112F56] to-[#0B1E36] text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8 min-h-[600px] flex items-center">

        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* LEFT: Text */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Badge — dot removed */}
            <div className="inline-flex items-center space-x-2 bg-blue-500/15 border border-blue-400/20 px-3.5 py-1.5 rounded-full">
              <span className="text-xs font-mono text-blue-300 font-bold tracking-wider uppercase">
                Welcome to Thal University
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-light leading-tight tracking-tight text-white">
              University Complaint <br />
              <strong className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                Management System
              </strong>
            </h1>

            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl">
              A smart and efficient way to submit, track and resolve complaints within Thal University Bhakkar.
              Designed to ensure campus issues are routed instantly, audited transparently, and resolved efficiently.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <button
                onClick={() => onLoginClick()}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-900/30 active:scale-95 transition-all cursor-pointer"
              >
                <span>Login to Your Account</span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('features');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-white text-sm font-medium border border-slate-700 hover:border-slate-600 active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Features</span>
              </button>
            </div>

          </div>

          {/* RIGHT: Image */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 to-emerald-500 opacity-25 blur-sm" />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 border border-white/10 aspect-video lg:aspect-square flex items-center justify-center">
              <img
                src={universityImg}
                referrerPolicy="no-referrer"
                alt="Thal University Bhakkar Campus"
                className="object-cover w-full h-full opacity-90 transition-transform duration-700 hover:scale-105"
                onError={e => {
                  e.currentTarget.src =
                    'https://placehold.co/600x400/0c2340/ffffff?text=University+Campus+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. Features Grid ─────────────────────────────────────────────── */}
      <section id="features" className="bg-white w-full py-24 md:py-32 text-center min-h-[600px] flex flex-col justify-center">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">

        <span className="text-xs font-bold font-mono text-blue-600 tracking-widest uppercase block mb-2">
          ——— OUR FEATURES ———
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight">
          Powerful Features for a Better Experience
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-slate-500 text-sm sm:text-base leading-relaxed">
          Our system is designed to make complaint management easy, transparent and efficient for everyone.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12 text-left">

          {/* Card 1 — Complaint Tracking */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 mb-3">
              Complaint Tracking
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Easily submit and track your complaints in real-time. Stay updated on the progress of your complaint at every step of the process.
            </p>
          </div>

          {/* Card 2 — Easy Submission */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 mb-3">
              Easy Submission
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Submit your complaints quickly with a simple and user-friendly form. No complicated steps — just describe your issue and submit in seconds.
            </p>
          </div>

          {/* Card 3 — Admin Controlled */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 mb-3">
              Admin Controlled
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Administrators oversee and manage all complaint status updates and routing paths, ensuring resolutions are verified, fair, and trustworthy.
            </p>
          </div>

        </div>
        </div>
      </section>

      {/* ── 3. Statistics Section ────────────────────────────────────────── */}
      <section className="bg-slate-100 py-24 md:py-32 min-h-[600px] flex flex-col justify-center">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 text-center">

          <span className="text-xs font-bold font-mono text-blue-600 tracking-widest uppercase block mb-1">
            ——— SYSTEM OVERVIEW ———
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight">
            Complaint Statistics
          </h2>
          <p className="mt-2 text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
            An overview of complaints received from students and their current operational status.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">

            {/* Total */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm text-left relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0C2340]" />
              <span className="block text-2xl sm:text-3xl font-bold font-mono text-slate-900 group-hover:scale-105 transition-transform">
                {stats?.total?.toLocaleString() ?? 0}
              </span>
              <span className="block text-xs font-semibold text-[#0C2340] mt-2 tracking-wide uppercase">
                Total Complaints
              </span>
              <p className="text-[11px] text-slate-400 mt-1">All time complaints submitted</p>
            </div>

            {/* Pending */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm text-left relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0C2340]" />
              <span className="block text-2xl sm:text-3xl font-bold font-mono text-slate-900 group-hover:scale-105 transition-transform">
                {stats?.pending?.toLocaleString() ?? 0}
              </span>
              <span className="block text-xs font-semibold text-[#0C2340] mt-2 tracking-wide uppercase">
                Pending
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Awaiting department routing</p>
            </div>

            {/* In Progress */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm text-left relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0C2340]" />
              <span className="block text-2xl sm:text-3xl font-bold font-mono text-slate-900 group-hover:scale-105 transition-transform">
                {stats?.inProgress?.toLocaleString() ?? 0}
              </span>
              <span className="block text-xs font-semibold text-[#0C2340] mt-2 tracking-wide uppercase">
                In Progress
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Currently being resolved</p>
            </div>

            {/* Resolved */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm text-left relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0C2340]" />
              <span className="block text-2xl sm:text-3xl font-bold font-mono text-slate-900 group-hover:scale-105 transition-transform">
                {stats?.resolved?.toLocaleString() ?? 0}
              </span>
              <span className="block text-xs font-semibold text-[#0C2340] mt-2 tracking-wide uppercase">
                Resolved
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Successfully resolved cases</p>
            </div>

          </div>
        </div>
      </section>
      </div>
  );
}