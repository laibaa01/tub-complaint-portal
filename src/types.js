/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ===================== USER =====================
export const UserRole = {
  STUDENT: 'Student',
  DEPARTMENT_HEAD: 'Department Head',
  ADMINISTRATOR: 'Administrator',
};

// ===================== USER STRUCTURE =====================
// (JS me interface nahi hota, sirf reference structure comment)
export const createUser = (data) => ({
  id: data.id,
  name: data.name,
  email: data.email,
  role: data.role,
  department: data.department || null,
  studentId: data.studentId || null,
  phone: data.phone || null,
});

// ===================== COMPLAINT CONSTANTS =====================
export const ComplaintCategory = {
  ACADEMICS: 'Academics',
  HOSTEL: 'Hostel',
  TRANSPORT: 'Transport',
  IT_SUPPORT: 'IT Support',
  FINANCE: 'Finance/Fee',
  SECURITY: 'Security',
  OTHER: 'Other',
};

export const ComplaintPriority = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export const ComplaintStatus = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  REJECTED: 'Rejected',
};

// ===================== COMPLAINT STRUCTURE =====================
export const createComplaint = (data) => ({
  id: data.id,
  title: data.title,
  description: data.description,
  category: data.category,
  priority: data.priority,
  status: data.status,
  submittedBy: {
    name: data.submittedBy?.name,
    email: data.submittedBy?.email,
    studentId: data.submittedBy?.studentId || null,
  },
  submittedAt: data.submittedAt,
  lastUpdated: data.lastUpdated,
  attachmentName: data.attachmentName || null,
  attachmentSize: data.attachmentSize || null,
  department: data.department,
  history: data.history || [],
  adminNotes: data.adminNotes || null,
});

// ===================== SYSTEM STATS =====================
export const createSystemStats = (data) => ({
  total: data.total || 0,
  pending: data.pending || 0,
  inProgress: data.inProgress || 0,
  resolved: data.resolved || 0,
  rejected: data.rejected || 0,
});