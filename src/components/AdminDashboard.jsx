/**
 * Admin Dashboard - Complaint Management System
 */

import React, { useState } from 'react';
import {
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
  ChevronRight,
  User,
  LayoutGrid,
  Send,
  Paperclip,
} from 'lucide-react';

const SAMPLE_COMPLAINTS = [
  {
    id: 'CMP-001',
    title: 'WiFi not working in Block A',
    category: 'IT Support',
    priority: 'High',
    status: 'Pending',
    submittedAt: '2025-05-10',
    submittedBy: { name: 'Student A', studentId: 'F21-1001', email: 'student.a@uni.edu' },
    description: 'Internet has been down for 3 days in Block A hostel. Students cannot access online resources for upcoming exams.',
    attachmentName: 'screenshot.png',
    attachmentSize: '120 KB',
    history: [{ id: 'h1', updatedBy: 'System', date: '2025-05-10', comment: 'Complaint registered and queued for review.' }],
  },
  {
    id: 'CMP-002',
    title: 'Grade not updated after recheck',
    category: 'Academics',
    priority: 'Medium',
    status: 'In Progress',
    submittedAt: '2025-05-12',
    submittedBy: { name: 'Student B', studentId: 'F21-1002', email: 'student.b@uni.edu' },
    description: 'Recheck request for CS301 was submitted two weeks ago but the grade has not been updated in the portal.',
    attachmentName: null,
    attachmentSize: null,
    history: [
      { id: 'h1', updatedBy: 'System', date: '2025-05-12', comment: 'Complaint registered.' },
      { id: 'h2', updatedBy: 'Admin', date: '2025-05-14', comment: 'Forwarded to Academics department.' },
    ],
  },
  {
    id: 'CMP-003',
    title: 'Hostel room AC not working',
    category: 'Hostel',
    priority: 'High',
    status: 'Pending',
    submittedAt: '2025-05-14',
    submittedBy: { name: 'Student C', studentId: 'F22-1003', email: 'student.c@uni.edu' },
    description: 'AC in room 204 has been non-functional for a week. Room temperature is extremely high.',
    attachmentName: 'ac_issue.jpg',
    attachmentSize: '85 KB',
    history: [{ id: 'h1', updatedBy: 'System', date: '2025-05-14', comment: 'Complaint registered.' }],
  },
  {
    id: 'CMP-004',
    title: 'Bus not arriving on time',
    category: 'Transport',
    priority: 'Low',
    status: 'Resolved',
    submittedAt: '2025-05-08',
    submittedBy: { name: 'Student D', studentId: 'F20-1004', email: 'student.d@uni.edu' },
    description: 'Route 3 bus consistently arrives 40 minutes late causing missed lectures.',
    attachmentName: null,
    attachmentSize: null,
    history: [
      { id: 'h1', updatedBy: 'System', date: '2025-05-08', comment: 'Registered.' },
      { id: 'h2', updatedBy: 'Admin', date: '2025-05-11', comment: 'Route schedule adjusted. Driver notified. Issue resolved.' },
    ],
  },
  {
    id: 'CMP-005',
    title: 'Fee challan not generated',
    category: 'Finance/Fee',
    priority: 'High',
    status: 'Pending',
    submittedAt: '2025-05-16',
    submittedBy: { name: 'Student E', studentId: 'F23-1005', email: 'student.e@uni.edu' },
    description: 'Fee challan for Summer 2025 semester is not appearing in the student portal. Deadline is approaching.',
    attachmentName: null,
    attachmentSize: null,
    history: [{ id: 'h1', updatedBy: 'System', date: '2025-05-16', comment: 'Complaint registered.' }],
  },
  {
    id: 'CMP-006',
    title: 'Harassment complaint — lab area',
    category: 'Security',
    priority: 'High',
    status: 'In Progress',
    submittedAt: '2025-05-13',
    submittedBy: { name: 'Student F', studentId: 'F22-1006', email: 'student.f@uni.edu' },
    description: 'Inappropriate behavior reported in CS Lab 2. Full details provided in attached document.',
    attachmentName: 'incident_report.pdf',
    attachmentSize: '210 KB',
    history: [
      { id: 'h1', updatedBy: 'System', date: '2025-05-13', comment: 'Registered.' },
      { id: 'h2', updatedBy: 'Admin', date: '2025-05-15', comment: 'Under investigation by student affairs office.' },
    ],
  },
];

const statusColor = (s) => {
  switch (s) {
    case 'Pending':     return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    case 'In Progress': return 'bg-sky-50 text-sky-700 border-sky-200';
    case 'Resolved':    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Rejected':    return 'bg-rose-50 text-rose-700 border-rose-200';
    default:            return 'bg-slate-100 text-slate-600 border-slate-200';
  }
};

export default function AdminDashboard({
  currentUser = { name: 'Admin', role: 'Super Admin' },
  complaints: propComplaints,
  onUpdateComplaint,
}) {
  const [data, setData]                   = useState(propComplaints || SAMPLE_COMPLAINTS);
  const [search, setSearch]               = useState('');
  const [statusFilter, setStatusFilter]   = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [selectedId, setSelectedId]       = useState(null);
  const [comment, setComment]             = useState('');
  const [newStatus, setNewStatus]         = useState('Pending');
  const [newPriority, setNewPriority]     = useState('Medium');
  const [toast, setToast]                 = useState(false);

  const selected = data.find((c) => c.id === selectedId);

  const total      = data.length;
  const pending    = data.filter((c) => c.status === 'Pending').length;
  const inProgress = data.filter((c) => c.status === 'In Progress').length;
  const resolved   = data.filter((c) => c.status === 'Resolved').length;
  const rejected   = data.filter((c) => c.status === 'Rejected').length;

  const filtered = data.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch =
      c.title.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.submittedBy.studentId?.toLowerCase().includes(q);
    const matchStatus   = statusFilter   === 'All' || c.status   === statusFilter;
    const matchCategory = categoryFilter === 'All' || c.category === categoryFilter;
    const matchPriority = priorityFilter === 'All' || c.priority === priorityFilter;
    return matchSearch && matchStatus && matchCategory && matchPriority;
  });

  const handleSelect = (c) => {
    setSelectedId(c.id);
    setNewStatus(c.status);
    setNewPriority(c.priority);
    setComment('');
    setToast(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Please write an admin comment before updating.');
      return;
    }
    const log = {
      id: `h-${Date.now()}`,
      updatedBy: currentUser.name,
      date: new Date().toISOString().slice(0, 10),
      comment: comment.trim(),
    };
    const updated = data.map((c) =>
      c.id === selectedId
        ? { ...c, status: newStatus, priority: newPriority, history: [...c.history, log], lastUpdated: new Date().toISOString() }
        : c
    );
    setData(updated);
    if (onUpdateComplaint) onUpdateComplaint(selectedId, { status: newStatus, priority: newPriority, history: [...selected.history, log] });
    setComment('');
    setToast(true);
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8 font-sans">

      {/* ── Welcome Banner — same style as StudentDashboard ── */}
      <div className="bg-[#0C2340] rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md mb-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="space-y-2 relative z-10">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome Back, {currentUser.name}
          </h1>
          <p className="text-sm text-gray-300 max-w-xl">
            Review and manage all submitted complaints from this panel. Update statuses, add comments, and keep students informed.
          </p>
        </div>
      </div>

      {/* ── Metric cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        {[
          { label: 'Total',       value: total,      icon: <FileText className="w-5 h-5" />,      iconBg: 'bg-blue-50 text-blue-600' },
          { label: 'Pending',     value: pending,    icon: <Clock className="w-5 h-5" />,          iconBg: 'bg-yellow-50 text-yellow-600' },
          { label: 'In Progress', value: inProgress, icon: <Activity className="w-5 h-5" />,       iconBg: 'bg-sky-50 text-sky-600' },
          { label: 'Resolved',    value: resolved,   icon: <CheckCircle2 className="w-5 h-5" />,   iconBg: 'bg-teal-50 text-teal-600' },
          { label: 'Rejected',    value: rejected,   icon: <AlertTriangle className="w-5 h-5" />,  iconBg: 'bg-rose-50 text-rose-600' },
        ].map((m) => (
          <div key={m.label} className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-lg shrink-0 ${m.iconBg}`}>{m.icon}</div>
            <div className="text-left">
              <span className="block text-2xl font-bold text-slate-800 font-mono">{m.value}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{m.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main workspace ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        {/* Left: filters + list */}
        <div className="lg:col-span-7 space-y-3">

          {/* Search + filters */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, ticket ID, or student ID…"
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 border border-slate-200 rounded-lg bg-white focus:border-blue-500 focus:outline-none text-slate-700 cursor-pointer"
                >
                  <option value="All">All</option>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 border border-slate-200 rounded-lg bg-white focus:border-blue-500 focus:outline-none text-slate-700 cursor-pointer"
                >
                  <option value="All">All</option>
                  <option>IT Support</option>
                  <option>Academics</option>
                  <option>Hostel</option>
                  <option>Transport</option>
                  <option>Finance/Fee</option>
                  <option>Security</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Priority</label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full text-xs px-2.5 py-2 border border-slate-200 rounded-lg bg-white focus:border-blue-500 focus:outline-none text-slate-700 cursor-pointer"
                >
                  <option value="All">All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Complaint rows */}
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl border border-dashed border-slate-300 py-14 text-center text-slate-400">
                <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                <p className="text-sm font-medium text-slate-500">No complaints found</p>
                <p className="text-xs mt-1">Try adjusting your search or filter</p>
              </div>
            ) : (
              filtered.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  className={`bg-white rounded-xl border p-4 sm:p-5 cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 ${
                    selectedId === c.id
                      ? 'border-blue-500 ring-1 ring-blue-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] bg-[#0C2340] text-blue-300 px-2 py-0.5 rounded font-bold">
                        {c.id}
                      </span>
                      <span className="text-[10px] text-slate-400">{c.submittedAt}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{c.category}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        c.priority === 'High'   ? 'bg-rose-50 text-rose-700 border-rose-200' :
                        c.priority === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                  'bg-green-50 text-green-700 border-green-200'
                      }`}>{c.priority}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 truncate">{c.title}</p>
                    <p className="text-xs text-slate-400">
                      Student ID: <span className="font-mono text-slate-600">{c.submittedBy.studentId}</span>
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor(c.status)}`}>
                      {c.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: action panel */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl border border-slate-200 p-5 sticky top-6">
            {!selected ? (
              <div className="py-20 text-center text-slate-400 space-y-2">
                <LayoutGrid className="w-10 h-10 mx-auto text-slate-200" />
                <p className="text-sm font-medium text-slate-500">Select a complaint</p>
                <p className="text-xs">Click any row to open it here</p>
              </div>
            ) : (
              <div className="space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ticket</p>
                    <p className="font-mono text-sm font-bold text-slate-900">{selected.id}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusColor(selected.status)}`}>
                    {selected.status}
                  </span>
                </div>

                {/* Student info */}
                <div className="bg-slate-50 rounded-lg border border-slate-100 p-3 space-y-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <User className="w-3 h-3" /> Student Details
                  </p>
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <div>
                      <p className="text-slate-400 mb-0.5">Student ID</p>
                      <p className="font-mono font-semibold text-slate-800">{selected.submittedBy.studentId}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 mb-0.5">Email</p>
                      <p className="text-slate-600 truncate" title={selected.submittedBy.email}>{selected.submittedBy.email}</p>
                    </div>
                  </div>
                </div>

                {/* Complaint description */}
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Complaint</p>
                  <p className="text-sm font-semibold text-slate-800">{selected.title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed max-h-20 overflow-y-auto">
                    {selected.description}
                  </p>
                </div>

                {/* Attachment */}
                {selected.attachmentName && (
                  <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 truncate">
                      <Paperclip className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate font-medium">{selected.attachmentName}</span>
                      <span className="text-slate-400 shrink-0">({selected.attachmentSize})</span>
                    </div>
                    <button
                      onClick={() => alert(`Opening: ${selected.attachmentName}`)}
                      className="text-blue-600 font-semibold hover:underline ml-2 shrink-0 cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                )}

                {/* History log */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Activity Log ({selected.history.length})
                  </p>
                  <div className="space-y-2 max-h-28 overflow-y-auto pr-0.5">
                    {selected.history.map((log) => (
                      <div key={log.id} className="bg-slate-50 rounded-lg border border-slate-100 px-3 py-2 text-xs space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-blue-600">{log.updatedBy}</span>
                          <span className="text-slate-400">{log.date}</span>
                        </div>
                        <p className="text-slate-500 leading-relaxed">{log.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Update form */}
                <form onSubmit={handleSubmit} className="space-y-3 pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update Complaint</p>

                  {toast && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-3 py-2 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      Update saved. Student will be notified.
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Change Status</label>
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white focus:border-blue-500 focus:outline-none text-slate-800 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Priority</label>
                      <select
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg bg-white focus:border-blue-500 focus:outline-none text-slate-800 cursor-pointer"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Admin Comment</label>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Write your action note, resolution details, or reason for rejection…"
                      className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg bg-white focus:border-blue-500 focus:outline-none resize-none text-slate-800"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Save & Notify Student
                  </button>
                </form>

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
