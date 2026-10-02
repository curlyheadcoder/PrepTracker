import React, { useState } from 'react';
import type { SubtopicNote } from '../types';
import { Sparkles, FileText, Link as LinkIcon, Check, Copy } from 'lucide-react';

interface SubtopicNotesModalProps {
  subtopicId: string;
  subtopicTitle: string;
  topicTitle: string;
  existingNote?: SubtopicNote;
  onSaveNote: (note: SubtopicNote) => void;
  onClose: () => void;
}

export const SubtopicNotesModal: React.FC<SubtopicNotesModalProps> = ({
  subtopicId,
  subtopicTitle,
  topicTitle,
  existingNote,
  onSaveNote,
  onClose,
}) => {
  const [contentMarkdown, setContentMarkdown] = useState(
    existingNote?.contentMarkdown || ''
  );
  const [attachmentUrl, setAttachmentUrl] = useState(existingNote?.attachmentUrl || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateAiNotes = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const generatedContent = `
# 📖 Interview Study Notes: ${subtopicTitle}
*Topic Category: ${topicTitle}*

---

## 1. Core Concept & Analogy
**${subtopicTitle}** is a fundamental technical concept asked frequently in top engineering interviews.

### Key Takeaway
- Decouples core logic from boilerplates.
- Provides thread safety, immutability, and predictable performance.
- Eliminates common runtime errors (e.g., NullPointerException or memory leaks).

---

## 2. Practical Code Example
\`\`\`java
// Example implementation for ${subtopicTitle}
public class InterviewExample {
    public static void main(String[] args) {
        System.out.println("Demonstrating ${subtopicTitle} concept...");
        // Core implementation snippet
    }
}
\`\`\`

---

## 3. Top Interview Q&A Flashcards
**Q1: What is the primary advantage of ${subtopicTitle}?**  
*A:* Enhances maintainability, reduces lines of code, and improves execution efficiency.

**Q2: How do you handle common failure edge cases?**  
*A:* Use explicit validation rules, graceful fallback defaults, and global exception handling wrappers.

---

## 💡 Quick Memory Trick
> Remember **A-C-I-D / F-M-C**: Filter early, map cleanly, and collect safely.
      `.trim();

      setContentMarkdown(generatedContent);
      setIsGenerating(false);
    }, 1000);
  };

  const handleSave = () => {
    onSaveNote({
      subtopicId,
      contentMarkdown,
      attachmentUrl: attachmentUrl.trim() || undefined,
      isAiGenerated: true,
      updatedAt: new Date().toISOString(),
    });
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(contentMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card" style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="modal-header">
          <div>
            <span className="badge badge-in_progress" style={{ marginBottom: '4px' }}>{topicTitle}</span>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Study Notes: {subtopicTitle}</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)' }}
            disabled={isGenerating}
            onClick={handleGenerateAiNotes}
          >
            <Sparkles size={16} />
            {isGenerating ? 'Generating AI Notes...' : '✨ AI Generate Notes & Q&As'}
          </button>

          {contentMarkdown && (
            <button type="button" className="btn btn-secondary" onClick={handleCopy}>
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              {copied ? 'Copied Notes!' : 'Copy Notes'}
            </button>
          )}
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={14} /> Custom Study Notes (Markdown)
          </label>
          <textarea
            className="form-control"
            style={{ width: '100%', minHeight: '260px', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', lineHeight: '1.6' }}
            placeholder="Write your personal notes or click '✨ AI Generate Notes' to auto-create notes..."
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LinkIcon size={14} /> Attachment / External Resource URL (PDF, GitHub, Drive)
          </label>
          <input
            type="url"
            className="form-control"
            style={{ width: '100%' }}
            placeholder="https://github.com/... or https://drive.google.com/..."
            value={attachmentUrl}
            onChange={(e) => setAttachmentUrl(e.target.value)}
          />
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save Study Notes
          </button>
        </div>
      </div>
    </div>
  );
};
