import React from 'react';
import type { UserItem } from '../types';
import { CheckSquare, BarChart2, BookOpen, Users, Zap, ExternalLink, Layers, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  users: UserItem[];
  currentUserId: number | null;
  setCurrentUserId: (id: number) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  users,
  currentUserId,
  setCurrentUserId,
  theme,
  toggleTheme,
}) => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Zap size={22} color="#ffffff" />
        </div>
        <div className="brand-text">
          <div className="brand-title">
            <h2>PrepTracker</h2>
            <span className="brand-badge">PRO</span>
          </div>
          <p>Interview Study Platform</p>
        </div>
      </div>

      <div className="nav-section-label">ROADMAPS & TASKS</div>
      <nav className="nav-menu">
        <button
          className={`nav-item ${activeTab === 'plans' ? 'active' : ''}`}
          onClick={() => setActiveTab('plans')}
        >
          <Layers size={18} className="nav-icon" />
          <span>Plan Marketplace</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
        >
          <CheckSquare size={18} className="nav-icon" />
          <span>Study Roadmap</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'todos' ? 'active' : ''}`}
          onClick={() => setActiveTab('todos')}
        >
          <CheckSquare size={18} className="nav-icon" />
          <span>Todo Management</span>
        </button>
      </nav>

      <div className="nav-section-label" style={{ marginTop: '20px' }}>
        KNOWLEDGE & ANALYTICS
      </div>
      <nav className="nav-menu">
        <button
          className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart2 size={18} className="nav-icon" />
          <span>Stream Analytics</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'cheatsheets' ? 'active' : ''}`}
          onClick={() => setActiveTab('cheatsheets')}
        >
          <BookOpen size={18} className="nav-icon" />
          <span>Interview Guides</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} className="nav-icon" />
          <span>User Profiles</span>
        </button>
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          <span>{theme === 'dark' ? '☀️ Light Theme' : '🌙 Dark Theme'}</span>
          {theme === 'dark' ? <Sun size={16} color="#fbbf24" /> : <Moon size={16} color="#60a5fa" />}
        </button>

        <div className="sidebar-user-context">
          <span className="user-context-label">Active Profile:</span>
          <select
            className="form-select sidebar-user-select"
            value={currentUserId || ''}
            onChange={(e) => setCurrentUserId(Number(e.target.value))}
          >
            {users.length === 0 && <option value="">No Profile</option>}
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="vercel-badge">
          <ExternalLink size={14} color="#10b981" /> <strong>PrepTracker</strong> Live
        </div>
      </div>
    </aside>
  );
};

