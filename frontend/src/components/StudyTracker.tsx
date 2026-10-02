import React, { useState } from 'react';
import { STUDY_TOPICS } from '../data/topicsData';
import { ChevronDown, Search, CheckCircle, Sparkles } from 'lucide-react';

interface StudyTrackerProps {
  completedSubtopics: Record<string, boolean>;
  setCompletedSubtopics: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const StudyTracker: React.FC<StudyTrackerProps> = ({
  completedSubtopics,
  setCompletedSubtopics,
}) => {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({
    t1: true,
    t2: true,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate Subtopics & Topics Metrics
  let totalSubtopicsCount = 0;
  let doneSubtopicsCount = 0;
  let totalTopicsCount = STUDY_TOPICS.length;
  let completedTopicsCount = 0;

  STUDY_TOPICS.forEach((topic) => {
    const subCount = topic.subtopics.length;
    const doneSub = topic.subtopics.filter((s) => completedSubtopics[s.id]).length;
    totalSubtopicsCount += subCount;
    doneSubtopicsCount += doneSub;
    if (doneSub === subCount) {
      completedTopicsCount++;
    }
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
    const topic = STUDY_TOPICS.find((t) => t.id === topicId);
    if (!topic) return;

    const targetVal = !currentIsAllDone;
    const updates: Record<string, boolean> = {};
    topic.subtopics.forEach((s) => {
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
            <h3>Overall Interview Readiness</h3>
            <p>Complete all 18 core Java topics & subtopics before your interview</p>
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
          <div className="stat-pill" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            <Sparkles size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
            {doneSubtopicsCount} / {totalSubtopicsCount} Subtopics Done
          </div>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="action-bar" style={{ marginBottom: '20px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '12px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: '40px', width: '100%' }}
            placeholder="Search subtopics (e.g. Lambdas, JPA, Kafka)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Days Grid */}
      <div className="days-grid">
        {[1, 2, 3, 4].map((dayNum) => {
          const dayTopics = STUDY_TOPICS.filter((t) => t.day === dayNum);
          const dayDoneTopics = dayTopics.filter((t) =>
            t.subtopics.every((s) => completedSubtopics[s.id])
          ).length;

          return (
            <div key={dayNum} className="day-card">
              <div className="day-header">
                <span className={`day-badge day-${dayNum}`}>DAY {dayNum}</span>
                <h4>
                  {dayNum === 1 && 'Core Java 8, REST & JPA Monolith'}
                  {dayNum === 2 && 'SQL JOINs, Transactions & Testing'}
                  {dayNum === 3 && 'Microservices, Kafka & Docker'}
                  {dayNum === 4 && 'Kubernetes, Git, JIRA & Mock Interview'}
                </h4>
                <span className="day-progress">
                  {dayDoneTopics}/{dayTopics.length} Done
                </span>
              </div>

              {dayTopics.map((topic) => {
                const totalSub = topic.subtopics.length;
                const doneSub = topic.subtopics.filter((s) => completedSubtopics[s.id]).length;
                const isAllCompleted = doneSub === totalSub;
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
                    <div
                      className="topic-header"
                      onClick={() => toggleAccordion(topic.id)}
                    >
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
                        <span
                          className={`subtopic-count-pill ${isAllCompleted ? 'all-done' : ''}`}
                        >
                          {doneSub}/{totalSub} Done
                        </span>
                        <ChevronDown size={16} className="accordion-arrow" />
                      </div>
                    </div>

                    <div className="subtopics-list">
                      {filteredSubtopics.map((sub) => {
                        const checked = !!completedSubtopics[sub.id];
                        return (
                          <div
                            key={sub.id}
                            className={`subtopic-item ${checked ? 'completed' : ''}`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleSubtopic(sub.id)}
                            />
                            <label onClick={() => toggleSubtopic(sub.id)}>
                              {sub.title}
                            </label>
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
    </div>
  );
};
