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
          <Zap size={22} />
        </div>
        <div className="brand-text">
          <h2>PrepTracker</h2>
          <p>Multi-Plan Study Platform</p>
        </div>
      </div>

      <nav className="nav-menu">
        <button
          className={`nav-item ${activeTab === 'plans' ? 'active' : ''}`}
          onClick={() => setActiveTab('plans')}
        >
          <Layers size={18} /> Plan Marketplace
        </button>
        <button
          className={`nav-item ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
        >
          <CheckSquare size={18} /> Study Roadmap
        </button>
        <button
          className={`nav-item ${activeTab === 'todos' ? 'active' : ''}`}
          onClick={() => setActiveTab('todos')}
        >
          <CheckSquare size={18} /> Todo Management
        </button>
        <button
          className={`nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <BarChart2 size={18} /> Stream API Analytics
        </button>
        <button
          className={`nav-item ${activeTab === 'cheatsheets' ? 'active' : ''}`}
          onClick={() => setActiveTab('cheatsheets')}
        >
          <BookOpen size={18} /> Interview Cheatsheets
        </button>
        <button
          className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} /> User Management
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
            {users.length === 0 && <option value="">No Active Profile</option>}
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
