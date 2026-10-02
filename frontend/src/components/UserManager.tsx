import React, { useState } from 'react';
import type { UserItem } from '../types';
import { UserPlus, Users } from 'lucide-react';

interface UserManagerProps {
  users: UserItem[];
  onCreateUser: (user: { name: string; email: string }) => void;
}

export const UserManager: React.FC<UserManagerProps> = ({ users, onCreateUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onCreateUser({ name: name.trim(), email: email.trim() });
    setName('');
    setEmail('');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      <div className="glass-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <UserPlus size={18} color="#818cf8" /> Add Registered User
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              className="form-control"
              style={{ width: '100%' }}
              placeholder="e.g. Alex Rivera"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              className="form-control"
              style={{ width: '100%' }}
              placeholder="e.g. alex@preptracker.app"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '12px' }}>
            Save User
          </button>
        </form>
      </div>

      <div className="glass-card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Users size={18} color="#10b981" /> Registered Users List
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {users.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>No users found.</p>
          ) : (
            users.map((u) => (
              <div key={u.id} className="distribution-item">
                <div>
                  <strong style={{ fontSize: '15px' }}>{u.name}</strong>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{u.email}</div>
                </div>
                <span className="badge badge-in_progress">{u.todoCount || 0} Todos</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
