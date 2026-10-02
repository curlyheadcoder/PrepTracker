import React from 'react';
import { Clock, Sun, Moon, User } from 'lucide-react';
import type { UserItem } from '../types';

interface HeaderProps {
  title: string;
  subtitle: string;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  users: UserItem[];
  currentUserId: number | null;
  setCurrentUserId: (id: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  theme,
  toggleTheme,
  users,
  currentUserId,
  setCurrentUserId,
}) => {
  return (
    <header className="top-header">
      <div className="header-title">
        <h1 className="header-gradient-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>

      <div className="header-actions">
        {/* Top Header Theme Toggle Button */}
        <button
          className="header-theme-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          <div className="theme-btn-inner">
            {theme === 'dark' ? (
              <>
                <Sun size={15} className="theme-icon sun-icon" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon size={15} className="theme-icon moon-icon" />
                <span>Dark</span>
              </>
            )}
          </div>
        </button>

        {/* User Profile Selector (Top Bar) */}
        <div className="header-user-badge">
          <div className="avatar-chip">
            <User size={14} className="user-icon" />
          </div>
          <select
            className="header-user-select"
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

        {/* Live Countdown Badge */}
        <div className="countdown-badge">
          <span className="live-pulse-dot"></span>
          <Clock size={14} className="countdown-icon" />
          <span className="countdown-label">Target Interview:</span>
          <strong className="countdown-time">3 Days</strong>
        </div>
      </div>
    </header>
  );
};


