/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView'; // ← NAYA IMPORT
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import { MOCK_COMPLAINTS, MOCK_STATS } from './data';
// ── SUPABASE SERVICE IMPORT ──
import { supabase } from './supabaseClient'; 

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  const [complaints, setComplaints] = useState(() => {
    try {
      const persisted = localStorage.getItem('tub_complaints');
      return persisted ? JSON.parse(persisted) : MOCK_COMPLAINTS;
    } catch {
      return MOCK_COMPLAINTS;
    }
  });

  const [stats, setStats] = useState(() => {
    try {
      const persisted = localStorage.getItem('tub_stats');
      return persisted ? JSON.parse(persisted) : MOCK_STATS;
    } catch {
      return MOCK_STATS;
    }
  });

  const [loginPreselectedEmail, setLoginPreselectedEmail] = useState('');

  useEffect(() => {
    localStorage.setItem('tub_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('tub_stats', JSON.stringify(stats));
  }, [stats]);

  const handleLoginClick = (email) => {
    setLoginPreselectedEmail(email || '');
    setCurrentView('login');
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user.role === 'Student') {
      setCurrentView('student-dashboard');
    } else {
      setCurrentView('admin-dashboard');
    }
    setLoginPreselectedEmail('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  // ── 1. STUDENT: SUBMIT COMPLAINT TO SUPABASE ──
  const handleSubmitComplaint = async (newCompDetails) => {
    const newId = `TUB-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString();

    const supabaseData = {
      id: newId,
      title: newCompDetails.title,
      description: newCompDetails.description,
      category: newCompDetails.category,
      priority: newCompDetails.priority,
      status: 'Pending',
      department: newCompDetails.department || 'General Registrar Board'
    };

    try {
      const { data, error } = await supabase
        .from('complaints')
        .insert([supabaseData])
        .select();

      if (error) {
        console.error("Supabase Insertion Error:", error.message);
        alert("Database Error: " + error.message);
        return;
      }

      console.log("Successfully saved in Supabase!", data);

      const stateComplaintFormat = {
        ...supabaseData,
        attachmentName: newCompDetails.attachmentName || null,
        attachmentSize: newCompDetails.attachmentSize || null,
        submittedBy: {
          name: currentUser ? currentUser.name : 'Student',
          email: currentUser ? currentUser.email : 'student@tub.edu.pk',
          studentId: currentUser?.studentId || 'TUB-0000'
        },
        submittedAt: timestamp,
        lastUpdated: timestamp,
        history: [
          {
            id: `h-${Date.now()}`,
            status: 'Pending',
            date: timestamp,
            comment: 'Complaint submitted successfully.',
            updatedBy: 'System'
          }
        ]
      };

      setComplaints((prev) => [stateComplaintFormat, ...prev]);
      setStats((prev) => ({
        ...prev,
        total: prev.total + 1,
        pending: prev.pending + 1
      }));

    } catch (err) {
      console.error("Connection Failed:", err);
      alert("Network Error: Could not connect to Supabase.");
    }
  };

  // ── 2. ADMIN: UPDATE STATUS IN SUPABASE LIVE ──
  const handleUpdateComplaint = async (id, updatedFields) => {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .update({ status: updatedFields.status })
        .eq('id', id)
        .select();

      if (error) {
        console.error("Supabase Update Error:", error.message);
        alert("Database Error: " + error.message);
        return;
      }

      console.log("Successfully updated in Supabase!", data);

      setComplaints((prev) =>
        prev.map((c) => {
          if (c.id === id) {
            const oldStatus = c.status;
            const newStatus = updatedFields.status || oldStatus;

            if (oldStatus !== newStatus) {
              setStats((prevStats) => {
                const copy = { ...prevStats };
                if (oldStatus === 'Pending') copy.pending--;
                if (oldStatus === 'In Progress') copy.inProgress--;
                if (oldStatus === 'Resolved') copy.resolved--;
                if (oldStatus === 'Rejected') copy.rejected--;
                if (newStatus === 'Pending') copy.pending++;
                if (newStatus === 'In Progress') copy.inProgress++;
                if (newStatus === 'Resolved') copy.resolved++;
                if (newStatus === 'Rejected') copy.rejected++;
                return copy;
              });
            }

            return { ...c, ...updatedFields };
          }
          return c;
        })
      );

    } catch (err) {
      console.error("Connection Failed:", err);
      alert("Network Error: Could not update status.");
    }
  };

  // ── FIX: HOME PAR JAANE SE PEHLE USER LOGOUT KAREIN ──
  const handleNavigate = (view) => {
    if (view === 'home') {
      setCurrentUser(null);
    }
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">

      <Navbar
        currentUser={currentUser}
        onLoginClick={handleLoginClick}
        onRegisterClick={() => setCurrentView('register')}  // ← NAYA
        onLogout={handleLogout}
        currentView={currentView}
        onViewChange={handleNavigate}
      />

      <div className="flex-grow">
        {currentView === 'home' && (
          <HomeView onLoginClick={handleLoginClick} stats={stats} />
        )}

        {currentView === 'login' && (
          <LoginView
            onLoginSuccess={handleLoginSuccess}
            preselectedEmail={loginPreselectedEmail}
            onBackToHome={() => setCurrentView('home')}
            onRegisterClick={() => setCurrentView('register')}  // ← NAYA
          />
        )}

        {currentView === 'register' && (  // ← NAYA PURA BLOCK
          <RegisterView
            onLoginClick={() => setCurrentView('login')}
          />
        )}

        {currentView === 'student-dashboard' && currentUser && (
          <StudentDashboard
            currentUser={currentUser}
            complaints={complaints}
            onSubmitComplaint={handleSubmitComplaint}
          />
        )}

        {currentView === 'admin-dashboard' && currentUser && (
          <AdminDashboard
            currentUser={currentUser}
            complaints={complaints}
            onUpdateComplaint={handleUpdateComplaint}
          />
        )}
      </div>

      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
