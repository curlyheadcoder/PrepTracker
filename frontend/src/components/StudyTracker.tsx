import React, { useState } from 'react';
import type { StudyPlan, SubtopicNote } from '../types';
import { ChevronDown, Search, CheckCircle, Sparkles, FileText } from 'lucide-react';
import { SubtopicNotesModal } from './SubtopicNotesModal';

interface StudyTrackerProps {
  currentPlan: StudyPlan;
  completedSubtopics: Record<string, boolean>;
  setCompletedSubtopics: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  notes: Record<string, SubtopicNote>;
  onSaveNote: (note: SubtopicNote) => void;
}

export const StudyTracker: React.FC<StudyTrackerProps> = ({
  currentPlan,
  completedSubtopics,
  setCompletedSubtopics,
  notes,
  onSaveNote,
}) => {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Active Note Modal Target
  const [activeNoteTarget, setActiveNoteTarget] = useState<{
    subtopicId: string;
    subtopicTitle: string;
    topicTitle: string;
  } | null>(null);

  // Calculate Plan Metrics
  let totalSubtopicsCount = 0;
  let doneSubtopicsCount = 0;
  let totalTopicsCount = 0;
  let completedTopicsCount = 0;

  currentPlan.modules.forEach((mod) => {
    totalTopicsCount += mod.topics.length;
    mod.topics.forEach((topic) => {
      const subCount = topic.subtopics.length;
      const doneSub = topic.subtopics.filter((s) => completedSubtopics[s.id]).length;
      totalSubtopicsCount += subCount;
      doneSubtopicsCount += doneSub;
      if (doneSub === subCount && subCount > 0) {
        completedTopicsCount++;
      }
    });
  });

  const overallPercent =
    totalSubtopicsCount > 0 ? Math.round((doneSubtopicsCount / totalSubtopicsCount) * 100) : 0;

  const toggleAccordion = (topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const toggleSubtopic = (subtopicId: string) => {
    setCompletedSubtopics((prev) => ({
      ...prev,
      [subtopicId]: !prev[subtopicId],
    }));
  };

  const toggleParentTopic = (topicId: string, currentIsAllDone: boolean) => {
    let targetTopic: any = null;
    currentPlan.modules.forEach((mod) => {
      const found = mod.topics.find((t) => t.id === topicId);
      if (found) targetTopic = found;
    });

    if (!targetTopic) return;

    const targetVal = !currentIsAllDone;
    const updates: Record<string, boolean> = {};
    targetTopic.subtopics.forEach((s: any) => {
      updates[s.id] = targetVal;
    });

    setCompletedSubtopics((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  return (
    <div>
      {/* Overview Progress Banner */}
      <div className="progress-overview-card">
        <div className="progress-header">
          <div>
            <span className="badge badge-in_progress" style={{ marginBottom: '6px' }}>
              {currentPlan.category} • {currentPlan.durationText}
            </span>
            <h3>{currentPlan.title}</h3>
            <p>{currentPlan.description}</p>
          </div>
          <div className="percentage-display">{overallPercent}%</div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar-fill" style={{ width: `${overallPercent}%` }}></div>
        </div>

        <div className="stats-row">
          <div className="stat-pill">
            <CheckCircle size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            {completedTopicsCount} / {totalTopicsCount} Topics Fully Completed
          </div>
          <div className="stat-pill pending">
            {totalSubtopicsCount - doneSubtopicsCount} Subtopics Remaining
          </div>
          <div
            className="stat-pill"
            style={{
              background: 'rgba(99, 102, 241, 0.15)',
              color: '#a5b4fc',
              border: '1px solid rgba(99, 102, 241, 0.3)',
            }}
          >
            <Sparkles size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            {doneSubtopicsCount} / {totalSubtopicsCount} Subtopics Done
          </div>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="action-bar" style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: '40px', width: '100%' }}
            placeholder="Search subtopics across modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Dynamic Plan Modules Grid */}
      <div className="days-grid">
        {currentPlan.modules.map((module) => {
          const moduleDoneTopics = module.topics.filter(
            (t) => t.subtopics.length > 0 && t.subtopics.every((s) => completedSubtopics[s.id])
          ).length;

          return (
            <div key={module.id} className="day-card">
              <div className="day-header">
                <span className="day-badge day-1">{module.title}</span>
                <span className="day-progress">
                  {moduleDoneTopics}/{module.topics.length} Topics Done
                </span>
              </div>

              {module.topics.map((topic) => {
                const totalSub = topic.subtopics.length;
                const doneSub = topic.subtopics.filter((s) => completedSubtopics[s.id]).length;
                const isAllCompleted = totalSub > 0 && doneSub === totalSub;
                const isExpanded = expandedTopics[topic.id] || searchQuery.length > 0;

                const filteredSubtopics = topic.subtopics.filter((s) =>
                  s.title.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (searchQuery && filteredSubtopics.length === 0) return null;

                return (
                  <div
                    key={topic.id}
                    className={`topic-accordion ${isAllCompleted ? 'completed' : ''} ${
                      isExpanded ? 'expanded' : ''
                    }`}
                  >
                    <div className="topic-header" onClick={() => toggleAccordion(topic.id)}>
                      <div className="topic-main-info">
                        <input
                          type="checkbox"
                          checked={isAllCompleted}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleParentTopic(topic.id, isAllCompleted)}
                        />
                        <span className="topic-title-text">{topic.title}</span>
                      </div>
                      <div className="topic-meta">
                        <span className={`subtopic-count-pill ${isAllCompleted ? 'all-done' : ''}`}>
                          {doneSub}/{totalSub} Done
                        </span>
                        <ChevronDown size={16} className="accordion-arrow" />
                      </div>
                    </div>

                    <div className="subtopics-list">
                      {filteredSubtopics.map((sub) => {
                        const checked = !!completedSubtopics[sub.id];
                        const hasNote = !!notes[sub.id]?.contentMarkdown;

                        return (
                          <div
                            key={sub.id}
                            className={`subtopic-item ${checked ? 'completed' : ''}`}
                            style={{ justifyContent: 'space-between' }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleSubtopic(sub.id)}
                              />
                              <label onClick={() => toggleSubtopic(sub.id)}>{sub.title}</label>
                            </div>

                            <button
                              type="button"
                              className="icon-btn"
                              style={{
                                color: hasNote ? '#8b5cf6' : 'var(--text-muted)',
                                fontSize: '11px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: hasNote ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-sm)',
                              }}
                              title="Add/Edit Study Notes & AI Generator"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveNoteTarget({
                                  subtopicId: sub.id,
                                  subtopicTitle: sub.title,
                                  topicTitle: topic.title,
                                });
                              }}
                            >
                              <FileText size={13} /> {hasNote ? 'Notes' : '+ Notes'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Notes & AI Notes Generator Modal */}
      {activeNoteTarget && (
        <SubtopicNotesModal
          subtopicId={activeNoteTarget.subtopicId}
          subtopicTitle={activeNoteTarget.subtopicTitle}
          topicTitle={activeNoteTarget.topicTitle}
          existingNote={notes[activeNoteTarget.subtopicId]}
          onSaveNote={onSaveNote}
          onClose={() => setActiveNoteTarget(null)}
        />
      )}
    </div>
  );
};
