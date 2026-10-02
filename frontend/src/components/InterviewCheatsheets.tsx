import React, { useState } from 'react';
import { CHEATSHEET_TOPICS } from '../data/cheatsheetsData';
import { Copy, Check, HelpCircle } from 'lucide-react';

export const InterviewCheatsheets: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('java8');
  const [copied, setCopied] = useState(false);

  const currentTopic = CHEATSHEET_TOPICS.find((t) => t.id === activeId) || CHEATSHEET_TOPICS[0];

  const handleCopyCode = () => {
    if (currentTopic.codeSnippet) {
      navigator.clipboard.writeText(currentTopic.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      {/* Category Tabs */}
      <div className="cheatsheet-tabs">
        {CHEATSHEET_TOPICS.map((topic) => (
          <button
            key={topic.id}
            className={`cs-tab ${activeId === topic.id ? 'active' : ''}`}
            onClick={() => setActiveId(topic.id)}
          >
            {topic.category}
          </button>
        ))}
      </div>

      {/* Main Cheatsheet Viewer */}
      <div className="glass-card cheatsheet-viewer">
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
          {currentTopic.title}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{currentTopic.summary}</p>

        {currentTopic.codeSnippet && (
          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <button
              className="btn btn-secondary"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '6px 12px',
                fontSize: '12px',
              }}
              onClick={handleCopyCode}
            >
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
            <pre>
              <code>{currentTopic.codeSnippet}</code>
            </pre>
          </div>
        )}

        {currentTopic.questions && (
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '24px', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={18} color="#818cf8" /> Key Interview Q&A Flashcards
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {currentTopic.questions.map((q, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.6)',
                    border: '1px solid var(--border-color)',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <p style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '6px' }}>
                    Q: {q.q}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic' }}>
                    A: {q.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
