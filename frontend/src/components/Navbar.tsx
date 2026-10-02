import React from 'react';
import type { UserItem } from '../types';
import { CheckSquare, BarChart2, BookOpen, Users, Zap, ExternalLink } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  users: UserItem[];
  currentUserId: number | null;
  setCurrentUserId: (id: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  users,
  currentUserId,
  setCurrentUserId,
}) => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <Zap size={24} />
        </div>
        <div className="brand-text">
          <h2>JavaPrep Pro</h2>
          <p>Interview & Todo Tracker</p>
        </div>
      </div>

      <nav className="nav-menu">
        <button
          className={`nav-item ${activeTab === 'tracker' ? 'active' : ''}`}
          onClick={() => setActiveTab('tracker')}
        >
          <CheckSquare size={18} /> 3-4 Day Study Tracker
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
        <div className="form-group">
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
            Active User Context:
          </label>
          <select
            className="form-select"
            style={{ width: '100%' }}
            value={currentUserId || ''}
            onChange={(e) => setCurrentUserId(Number(e.target.value))}
          >
            {users.length === 0 && <option value="">No users</option>}
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
        <div className="vercel-badge" style={{ marginTop: '12px' }}>
          <ExternalLink size={14} color="#10b981" /> Ready for <strong>Vercel</strong>
        </div>
      </div>
    </aside>
  );
};
