import React from 'react';
import type { StudyPlan } from '../types';
import { Layers, Plus, Calendar, CheckCircle2 } from 'lucide-react';

interface PlanExplorerProps {
  plans: StudyPlan[];
  activePlanId: string;
  onSelectPlan: (planId: string) => void;
  onOpenCreatePlanModal: () => void;
}

export const PlanExplorer: React.FC<PlanExplorerProps> = ({
  plans,
  activePlanId,
  onSelectPlan,
  onOpenCreatePlanModal,
}) => {
  return (
    <div style={{ marginBottom: '28px' }}>
      <div className="action-bar" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={20} color="#818cf8" />
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Select Preparation Plan</h3>
        </div>

        <button className="btn btn-primary" onClick={onOpenCreatePlanModal}>
          <Plus size={16} /> Create Custom Plan (e.g. 5-6 Months)
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {plans.map((plan) => {
          const isActive = plan.id === activePlanId;
          let totalTopics = 0;
          let totalSubtopics = 0;

          plan.modules.forEach((m) => {
            totalTopics += m.topics.length;
            m.topics.forEach((t) => {
              totalSubtopics += t.subtopics.length;
            });
          });

          return (
            <div
              key={plan.id}
              className={`glass-card ${isActive ? 'active-plan-card' : ''}`}
              style={{
                cursor: 'pointer',
                border: isActive ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                background: isActive ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-card)',
                position: 'relative',
              }}
              onClick={() => onSelectPlan(plan.id)}
            >
              {isActive && (
                <div style={{ position: 'absolute', top: '14px', right: '14px', color: '#818cf8' }}>
                  <CheckCircle2 size={20} />
                </div>
              )}

              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <span className="badge badge-in_progress">{plan.category}</span>
                <span className="badge badge-pending" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> {plan.durationText}
                </span>
                {plan.isCustom && <span className="badge badge-completed">Custom</span>}
              </div>

              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>{plan.title}</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {plan.description}
              </p>

              <div style={{ fontSize: '12px', color: 'var(--text-dim)', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                {plan.modules.length} Modules • {totalTopics} Topics • {totalSubtopics} Subtopics
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
