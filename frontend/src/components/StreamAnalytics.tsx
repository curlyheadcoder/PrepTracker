import React from 'react';
import type { TodoAnalytics } from '../types';
import { RefreshCw, CheckCircle2, Clock, Zap, BarChart } from 'lucide-react';

interface StreamAnalyticsProps {
  analytics: TodoAnalytics;
  onRefresh: () => void;
}

export const StreamAnalytics: React.FC<StreamAnalyticsProps> = ({ analytics, onRefresh }) => {
  return (
    <div>
      <div className="action-bar" style={{ justifyContent: 'flex-end', marginBottom: '24px' }}>
        <button className="btn btn-secondary" onClick={onRefresh}>
          <RefreshCw size={16} /> Refresh Stream API Analytics
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="analytics-metrics-grid">
        <div className="metric-card">
          <BarChart size={32} color="#818cf8" />
          <div>
            <span className="metric-value">{analytics.totalTodos}</span>
            <span className="metric-label">Total Todos</span>
          </div>
        </div>

        <div className="metric-card">
          <CheckCircle2 size={32} color="#10b981" />
          <div>
            <span className="metric-value" style={{ color: '#10b981' }}>
              {analytics.completedCount}
            </span>
            <span className="metric-label">Completed</span>
          </div>
        </div>

        <div className="metric-card">
          <Clock size={32} color="#f59e0b" />
          <div>
            <span className="metric-value" style={{ color: '#f59e0b' }}>
              {analytics.pendingCount}
            </span>
            <span className="metric-label">Pending</span>
          </div>
        </div>

        <div className="metric-card">
          <Zap size={32} color="#06b6d4" />
          <div>
            <span className="metric-value" style={{ color: '#06b6d4' }}>
              {analytics.inProgressCount}
            </span>
            <span className="metric-label">In Progress</span>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="analytics-details-grid">
        <div className="glass-card">
          <h3>Status Distribution (Stream groupingBy)</h3>
          {Object.entries(analytics.countByStatus || {}).map(([status, count]) => (
            <div key={status} className="distribution-item">
              <span style={{ fontWeight: 600 }}>{status}</span>
              <strong style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', color: '#a5b4fc' }}>
                {count}
              </strong>
            </div>
          ))}
        </div>

        <div className="glass-card">
          <h3>Priority Distribution (Stream groupingBy)</h3>
          {Object.entries(analytics.countByPriority || {}).map(([priority, count]) => (
            <div key={priority} className="distribution-item">
              <span style={{ fontWeight: 600 }}>{priority}</span>
              <strong style={{ fontFamily: 'JetBrains Mono', fontSize: '18px', color: '#a5b4fc' }}>
                {count}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
