/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ❌ Removed TypeScript imports:
// import { Complaint, User, SystemStats } from './types';

export const MOCK_USERS = [
  {
    id: 'user-student',
    name: 'Laiba Arooj',
    email: 'student@tub.edu.pk',
    role: 'Student',
    studentId: 'TUB-2024-F-0842',
    phone: '+92 300 1234567'
  },
  {
    id: 'user-it-head',
    name: 'Dr. Kamran Malik',
    email: 'it-head@tub.edu.pk',
    role: 'Department Head',
    department: 'IT Support',
    phone: '+92 300 7654321'
  },
  {
    id: 'user-academic-head',
    name: 'Prof. Saima Khan',
    email: 'academics@tub.edu.pk',
    role: 'Department Head',
    department: 'Academics',
    phone: '+92 301 2345678'
  },
  {
    id: 'user-admin',
    name: 'Registrar Admin Office',
    email: 'admin@tub.edu.pk',
    role: 'Administrator',
    phone: '+92 489 123456'
  }
];

export const MOCK_STATS = {
  total: 1248,
  pending: 286,
  inProgress: 412,
  resolved: 550,
  rejected: 0
};

export const MOCK_COMPLAINTS = [
  {
    id: 'TUB-2026-0842',
    title: 'No Wi-Fi connectivity in Science Block Classrooms 3 & 4',
    description:
      'The Wi-Fi access point in the second-floor corridor of the Science Block is completely unresponsive for the past 4 days. Students cannot access course portals during practical lab hours or lectures.',
    category: 'IT Support',
    priority: 'High',
    status: 'In Progress',
    submittedBy: {
      name: 'Laiba Arooj',
      email: 'student@tub.edu.pk',
      studentId: 'TUB-2024-F-0842'
    },
    submittedAt: '2026-05-28T09:12:00Z',
    lastUpdated: '2026-05-29T14:30:00Z',
    department: 'IT Support & Networking',
    attachmentName: 'wifi_error_log.png',
    attachmentSize: '412 KB',
    history: [
      {
        id: 'h1',
        status: 'Pending',
        date: '2026-05-28T09:12:00Z',
        comment: 'Complaint successfully filed in System.',
        updatedBy: 'System Auto-Route'
      },
      {
        id: 'h2',
        status: 'In Progress',
        date: '2026-05-29T14:30:00Z',
        comment: 'Technician assigned for inspection.',
        updatedBy: 'IT Department'
      }
    ],
    adminNotes: 'Assigned to Networking Team'
  },

  {
    id: 'TUB-2026-0612',
    title: 'Delay in Semester Grade Sheets Issuance',
    description:
      'Academic office has not issued semester grade sheets yet.',
    category: 'Academics',
    priority: 'Medium',
    status: 'Pending',
    submittedBy: {
      name: 'Ali Imran',
      email: 'ali.imran@tub.edu.pk',
      studentId: 'TUB-2024-F-0711'
    },
    submittedAt: '2026-05-29T11:45:00Z',
    lastUpdated: '2026-05-29T11:45:00Z',
    department: 'Academics & Registration Office',
    history: [
      {
        id: 'h3',
        status: 'Pending',
        date: '2026-05-29T11:45:00Z',
        comment: 'Queued for review.',
        updatedBy: 'System'
      }
    ]
  },

  {
    id: 'TUB-2026-0422',
    title: 'Water filter maintenance required in Hostel',
    description:
      'Water cooler in Hostel Block B has bad taste.',
    category: 'Hostel',
    priority: 'High',
    status: 'Resolved',
    submittedBy: {
      name: 'Zainab Fatima',
      email: 'zainab.f@tub.edu.pk',
      studentId: 'TUB-2023-F-1140'
    },
    submittedAt: '2026-05-20T08:00:00Z',
    lastUpdated: '2026-05-23T16:00:00Z',
    department: 'Hostel Facilities',
    history: [
      {
        id: 'h4',
        status: 'Resolved',
        date: '2026-05-23T16:00:00Z',
        comment: 'Filters replaced and cleaned.',
        updatedBy: 'Maintenance Team'
      }
    ]
  },

  {
    id: 'TUB-2026-0302',
    title: 'Overcharging at Canteen',
    description:
      'Canteen charging higher than approved rates.',
    category: 'Finance/Fee',
    priority: 'Low',
    status: 'Resolved',
    submittedBy: {
      name: 'Hamza Nisar',
      email: 'hamza.nisar@tub.edu.pk',
      studentId: 'TUB-2025-S-0102'
    },
    submittedAt: '2026-05-15T13:10:00Z',
    lastUpdated: '2026-05-18T10:00:00Z',
    department: 'Canteen Committee',
    history: [
      {
        id: 'h5',
        status: 'Resolved',
        date: '2026-05-18T10:00:00Z',
        comment: 'Warning issued to contractor.',
        updatedBy: 'Admin Office'
      }
    ]
  },

  {
    id: 'TUB-2026-0112',
    title: 'Shuttle Bus Delay Issue',
    description:
      'Morning shuttle bus is frequently late.',
    category: 'Transport',
    priority: 'Medium',
    status: 'In Progress',
    submittedBy: {
      name: 'Laiba Arooj',
      email: 'student@tub.edu.pk',
      studentId: 'TUB-2024-F-0842'
    },
    submittedAt: '2026-05-25T11:00:00Z',
    lastUpdated: '2026-05-27T09:15:00Z',
    department: 'Transport Office',
    history: [
      {
        id: 'h6',
        status: 'In Progress',
        date: '2026-05-27T09:15:00Z',
        comment: 'Schedule being adjusted.',
        updatedBy: 'Transport Manager'
      }
    ]
  }
];

export const FAQs = [
  {
    q: 'How long does it take to resolve a complaint?',
    a: 'High: 24-48 hrs, Medium: 3-5 days, Low: up to 10 days.'
  },
  {
    q: 'Can I upload files?',
    a: 'Yes, up to 5MB attachments allowed.'
  },
  {
    q: 'Who can view complaints?',
    a: 'Student, assigned department, and admin only.'
  },
  {
    q: 'What if not satisfied?',
    a: 'You can escalate to admin office.'
  }
];