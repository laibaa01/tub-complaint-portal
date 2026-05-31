/**
 * 
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { supabase } from '../supabaseClient';
import React, { useState, useRef } from 'react';
import {
  FileText,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  Upload,
  X,
  Paperclip,
  FileCheck,
  Send,
  Info
} from 'lucide-react';

export default function StudentDashboard({ currentUser, complaints, onSubmitComplaint }) {
  const [activeTab, setActiveTab] = useState('my-complaints');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('IT Support');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newTicketId, setNewTicketId] = useState('');

  const fileInputRef = useRef(null);

  if (!currentUser) return <div className="p-6 text-gray-500">Loading...</div>;

  const studentComplaints = (complaints ?? []).filter(
    c => c.submittedBy?.email?.toLowerCase() === currentUser?.email?.toLowerCase()
  );

  const filteredComplaints = studentComplaints.filter(c => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ? true : c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalComplaints = studentComplaints.length;
  const pendingCount    = studentComplaints.filter(c => c.status === 'Pending').length;
  const inProgressCount = studentComplaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount   = studentComplaints.filter(c => c.status === 'Resolved').length;

  const getDepartmentForCategory = (cat) => {
    switch (cat) {
      case 'IT Support':  return 'IT Support & Networking Block';
      case 'Academics':   return 'Academics & Exam Registration office';
      case 'Hostel':      return 'Facilities & Hostel Wardens Desk';
      case 'Transport':   return 'Campus Transport Supervisions Group';
      case 'Finance/Fee': return 'Accounts Desk & Student Finance Bureau';
      case 'Security':    return 'Campus General Security Services Office';
      default:            return 'General Registrar Board';
    }
  };

  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      setAttachment({ name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(2)} MB` });
    }
  };
  const handleFileSelect = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setAttachment({ name: file.name, size: `${(file.size / 1024).toFixed(0)} KB` });
    }
  };

  const executeSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill out the Title and Description fields.');
      return;
    }
    const rId = `TUB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    onSubmitComplaint({
      title, description, category, priority,
      status: 'Pending',
      department: getDepartmentForCategory(category),
      attachmentName: attachment?.name,
      attachmentSize: attachment?.size,
    });
    setNewTicketId(rId);
    setShowSuccessModal(true);
    setTitle(''); setDescription(''); setCategory('IT Support'); setPriority('Medium'); setAttachment(null);
  };

  const getStatusBadgeColor = (s) => {
    switch (s) {
      case 'Pending':     return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'In Progress': return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Resolved':    return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'Rejected':    return 'bg-rose-50 text-rose-700 border-rose-200';
      default:            return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getPriorityBadgeColor = (p) => {
    switch (p) {
      case 'High':   return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':    return 'bg-green-50 text-green-700 border-green-200';
      default:       return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8 font-sans">

      {/* Welcome Banner */}
      <div className="bg-[#0C2340] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md mb-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
          <p className="text-sm text-gray-300 max-w-xl">
            You can file new technical or administrative complaints here. Our system routes them directly to the relevant department.
          </p>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg"><FileText className="w-5 h-5" /></div>
          <div className="text-left">
            <span className="block text-2xl font-bold text-slate-800 font-mono">{totalComplaints}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Filed</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg"><Clock className="w-5 h-5" /></div>
          <div className="text-left">
            <span className="block text-2xl font-bold text-slate-800 font-mono">{pendingCount}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Pending</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-sky-50 text-sky-600 rounded-lg"><Info className="w-5 h-5" /></div>
          <div className="text-left">
            <span className="block text-2xl font-bold text-slate-800 font-mono">{inProgressCount}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">In Progress</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-teal-50 text-teal-600 rounded-lg"><CheckCircle2 className="w-5 h-5" /></div>
          <div className="text-left">
            <span className="block text-2xl font-bold text-slate-800 font-mono">{resolvedCount}</span>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Resolved</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center mb-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('my-complaints')}
            className={`pb-3.5 text-sm font-semibold border-b-2 px-1 focus:outline-none transition-all cursor-pointer ${
              activeTab === 'my-complaints'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Complaints ({studentComplaints.length})
          </button>
          <button
            onClick={() => setActiveTab('file-new')}
            className={`pb-3.5 text-sm font-semibold border-b-2 px-1 focus:outline-none transition-all cursor-pointer flex items-center space-x-1.5 ${
              activeTab === 'file-new'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>New Complaint</span>
          </button>
        </div>
      </div>

      {/* ── My Complaints Tab ── */}
      {activeTab === 'my-complaints' ? (
        <div className="space-y-4">

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title or ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none transition-all"
              />
            </div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none text-slate-700 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Complaint Cards */}
          {filteredComplaints.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-3">
              <FileCheck className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-semibold text-sm text-slate-700">No Complaints Found</p>
              <p className="text-xs text-slate-400">
                {searchQuery || statusFilter !== 'All'
                  ? 'No matching results. Try clearing the filters.'
                  : "You haven't filed any complaints yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredComplaints.map(c => (
                <div key={c.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">

                      {/* Tags row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#0C2340] text-blue-300 font-mono text-[10px] font-bold">{c.id}</span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(c.submittedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                        {/* Category badge */}
                        {c.category && (
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-medium">
                            {c.category}
                          </span>
                        )}
                        {/* Priority badge */}
                        {c.priority && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityBadgeColor(c.priority)}`}>
                            {c.priority}
                          </span>
                        )}
                      </div>

                      <h3 className="font-semibold text-sm text-slate-800">{c.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{c.description}</p>

                      {c.attachmentName && (
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 pt-0.5">
                          <Paperclip className="w-3.5 h-3.5" />
                          <span>{c.attachmentName}</span>
                        </div>
                      )}
                    </div>

                    <div className="shrink-0">
                      <span className={`px-2.5 py-1 rounded-full border text-xs font-bold ${getStatusBadgeColor(c.status)}`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      ) : (
        /* ── File New Complaint Tab ── */
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-1">Submit a New Complaint</h2>
            <p className="text-xs text-slate-400 mb-6">
              Fill in the details below and submit. The system will route it to the right department automatically.
            </p>

            <form onSubmit={executeSubmit} className="space-y-5">

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">Complaint Title</label>
                <input
                  type="text" required
                  placeholder="e.g. Broken water tap in hostel block B"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none transition-all text-slate-800"
                />
              </div>

              {/* Category + Priority — side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none text-slate-800 bg-white cursor-pointer"
                  >
                    <option>IT Support</option>
                    <option>Academics</option>
                    <option>Hostel</option>
                    <option>Transport</option>
                    <option>Finance/Fee</option>
                    <option>Security</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">Priority</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    className="w-full text-sm px-3 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none text-slate-800 bg-white cursor-pointer"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">Description</label>
                <textarea
                  required rows={4}
                  placeholder="Describe your issue in detail..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none transition-all text-slate-800"
                />
              </div>

              {/* Attachment */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">Attachment (optional)</label>
                {attachment ? (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-slate-800">{attachment.name}</span>
                      <span className="text-slate-400 font-mono">{attachment.size}</span>
                    </div>
                    <button type="button" onClick={() => setAttachment(null)} className="text-slate-400 hover:text-rose-600 cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                      isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                    }`}
                  >
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" />
                    <Upload className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                    <p className="text-xs text-slate-600 font-medium">Click or drag file to upload</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, PDF up to 5MB</p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Complaint</span>
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-sm w-full p-8 text-center space-y-4 shadow-2xl">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Complaint Submitted!</h3>
              <p className="text-xs text-slate-500 mt-1">Your complaint has been logged successfully.</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Receipt ID</span>
              <span className="font-bold font-mono text-blue-600 text-sm">{newTicketId}</span>
            </div>
            <button
              onClick={() => { setShowSuccessModal(false); setActiveTab('my-complaints'); }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              View My Complaints
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
