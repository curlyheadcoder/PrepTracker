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
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        {/* Top Header Theme Toggle Button */}
        <button
          className="header-theme-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <>
              <Sun size={16} className="theme-icon sun-icon" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={16} className="theme-icon moon-icon" />
              <span>Dark Mode</span>
            </>
          )}
        </button>

        {/* User Profile Selector (Top Bar) */}
        <div className="header-user-badge">
          <User size={15} className="user-icon" />
          <select
            className="header-user-select"
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

        {/* Interview Countdown Badge */}
        <div className="countdown-badge">
          <Clock size={16} color="#ef4444" />
          <span>Interview:</span>
          <strong>3 Days Left</strong>
        </div>
      </div>
    </header>
  );
};

