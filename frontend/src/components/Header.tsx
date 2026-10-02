import React from 'react';
import { Clock } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="top-header">
      <div className="header-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="header-actions">
        <div className="countdown-badge">
          <Clock size={16} color="#f43f5e" />
          <span>Interview Countdown:</span>
          <strong>3 Days Left</strong>
        </div>
      </div>
    </header>
  );
};
