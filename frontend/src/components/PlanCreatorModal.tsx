import React, { useState } from 'react';
import type { StudyPlan } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface PlanCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePlan: (newPlan: StudyPlan) => void;
}

export const PlanCreatorModal: React.FC<PlanCreatorModalProps> = ({
  isOpen,
  onClose,
  onSavePlan,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Java' | 'Full Stack' | 'System Design' | 'AI & ML' | 'Custom'>('Custom');
  const [durationText, setDurationText] = useState('5-6 Months');

  // Dynamic Modules Creation
  const [modules, setModules] = useState<
    {
      title: string;
      topics: {
        title: string;
        subtopicsText: string;
      }[];
    }[]
  >([
    {
      title: 'MONTH 1: Foundation & Core Concepts',
      topics: [
        {
          title: 'Core Fundamentals',
          subtopicsText: 'Syntax & Types, Object-Oriented Principles, Data Structures, Algorithms',
        },
      ],
    },
  ]);

  if (!isOpen) return null;

  const handleAddModule = () => {
    setModules((prev) => [
      ...prev,
      {
        title: `MONTH ${prev.length + 1}: Core Advanced Topics`,
        topics: [
          {
            title: 'Advanced Module Topics',
            subtopicsText: 'Topic Subitem 1, Topic Subitem 2, Topic Subitem 3',
          },
        ],
      },
    ]);
  };

  const handleRemoveModule = (modIdx: number) => {
    setModules((prev) => prev.filter((_, idx) => idx !== modIdx));
  };

  const handleAddTopic = (modIdx: number) => {
    setModules((prev) =>
      prev.map((mod, idx) =>
        idx === modIdx
          ? {
              ...mod,
              topics: [
                ...mod.topics,
                { title: 'New Topic Title', subtopicsText: 'Subtopic 1, Subtopic 2' },
              ],
            }
          : mod
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPlanId = `custom_plan_${Date.now()}`;

    const formattedModules = modules.map((mod, mIdx) => ({
      id: `${newPlanId}_m${mIdx + 1}`,
      title: mod.title,
      orderIndex: mIdx + 1,
      topics: mod.topics.map((top, tIdx) => ({
        id: `${newPlanId}_m${mIdx + 1}_t${tIdx + 1}`,
        title: top.title,
        subtopics: top.subtopicsText
          .split(/,|\n/)
          .map((s) => s.trim())
          .filter(Boolean)
          .map((subTitle, sIdx) => ({
            id: `${newPlanId}_m${mIdx + 1}_t${tIdx + 1}_s${sIdx + 1}`,
            title: subTitle,
          })),
      })),
    }));

    const customPlan: StudyPlan = {
      id: newPlanId,
      title: title.trim(),
      description: description.trim() || 'Custom user study roadmap.',
      category,
      durationText: durationText.trim() || 'Custom Duration',
      isCustom: true,
      modules: formattedModules,
    };

    onSavePlan(customPlan);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card" style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <h3>Create Custom Study Plan (e.g. 5-6 Months)</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Plan Title *</label>
            <input
              type="text"
              className="form-control"
              style={{ width: '100%' }}
              placeholder="e.g. 6-Month Full Stack Java & System Design Masterclass"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              style={{ width: '100%', minHeight: '60px' }}
              placeholder="Target goals, target companies, or study instructions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group col">
              <label>Category</label>
              <select
                className="form-select"
                style={{ width: '100%' }}
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                <option value="Java">Java</option>
                <option value="Full Stack">Full Stack</option>
                <option value="System Design">System Design</option>
                <option value="AI & ML">AI & ML</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div className="form-group col">
              <label>Duration / Timeline *</label>
              <input
                type="text"
                className="form-control"
                style={{ width: '100%' }}
                placeholder="e.g. 5-6 Months, 30 Days, 1 Year"
                required
                value={durationText}
                onChange={(e) => setDurationText(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 600 }}>Plan Modules & Topics</h4>
              <button type="button" className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '12px' }} onClick={handleAddModule}>
                <Plus size={14} /> Add Module (Month/Week/Day)
              </button>
            </div>

            {modules.map((mod, mIdx) => (
              <div
                key={mIdx}
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    className="form-control"
                    style={{ flex: 1, fontWeight: 600 }}
                    value={mod.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setModules((prev) =>
                        prev.map((m, idx) => (idx === mIdx ? { ...m, title: val } : m))
                      );
                    }}
                  />
                  {modules.length > 1 && (
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => handleRemoveModule(mIdx)}
                    >
                      <Trash2 size={16} color="#ef4444" />
                    </button>
                  )}
                </div>

                {mod.topics.map((top, tIdx) => (
                  <div key={tIdx} style={{ marginLeft: '12px', marginTop: '10px', borderLeft: '2px solid var(--primary-light)', paddingLeft: '12px' }}>
                    <input
                      type="text"
                      className="form-control"
                      style={{ width: '100%', marginBottom: '6px', fontSize: '13px' }}
                      placeholder="Topic Title (e.g. Spring Security & JWT)"
                      value={top.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setModules((prev) =>
                          prev.map((m, idx) =>
                            idx === mIdx
                              ? {
                                  ...m,
                                  topics: m.topics.map((t, i) => (i === tIdx ? { ...t, title: val } : t)),
                                }
                              : m
                          )
                        );
                      }}
                    />
                    <textarea
                      className="form-control"
                      style={{ width: '100%', fontSize: '12px', minHeight: '50px' }}
                      placeholder="Subtopics (comma-separated, e.g. JWT Token Generation, Spring Security Filters, OAuth2)"
                      value={top.subtopicsText}
                      onChange={(e) => {
                        const val = e.target.value;
                        setModules((prev) =>
                          prev.map((m, idx) =>
                            idx === mIdx
                              ? {
                                  ...m,
                                  topics: m.topics.map((t, i) => (i === tIdx ? { ...t, subtopicsText: val } : t)),
                                }
                              : m
                          )
                        );
                      }}
                    />
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ marginTop: '10px', fontSize: '11px', padding: '4px 10px' }}
                  onClick={() => handleAddTopic(mIdx)}
                >
                  + Add Topic
                </button>
              </div>
            ))}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Custom Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
