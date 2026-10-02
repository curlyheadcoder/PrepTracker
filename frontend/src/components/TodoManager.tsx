import React, { useState } from 'react';
import type { TodoItem, TodoPriority, TodoStatus, UserItem } from '../types';
import { Plus, Check, Trash2, User, Tag } from 'lucide-react';

interface TodoManagerProps {
  todos: TodoItem[];
  users: UserItem[];
  currentUserId: number | null;
  onCreateTodo: (todo: Omit<TodoItem, 'id'>) => void;
  onMarkComplete: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export const TodoManager: React.FC<TodoManagerProps> = ({
  todos,
  users,
  currentUserId,
  onCreateTodo,
  onMarkComplete,
  onDeleteTodo,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TodoStatus>('PENDING');
  const [priority, setPriority] = useState<TodoPriority>('MEDIUM');
  const [dueDate, setDueDate] = useState('');
  const [assignedUserId, setAssignedUserId] = useState<number>(currentUserId || 1);

  const filteredTodos = todos.filter((t) => {
    if (statusFilter && t.status !== statusFilter) return false;
    if (priorityFilter && t.priority !== priorityFilter) return false;
    if (currentUserId && t.userId !== currentUserId) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const assignedUser = users.find((u) => u.id === assignedUserId);

    onCreateTodo({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate,
      userId: assignedUserId,
      userName: assignedUser ? assignedUser.name : 'Unassigned',
    });

    setTitle('');
    setDescription('');
    setStatus('PENDING');
    setPriority('MEDIUM');
    setDueDate('');
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Action Bar */}
      <div className="action-bar">
        <div className="filter-controls">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="PENDING">PENDING</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>

          <select
            className="form-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="">All Priorities</option>
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Create New Todo
        </button>
      </div>

      {/* Todos Grid */}
      {filteredTodos.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <Tag size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
          <h3>No Todo Tasks Found</h3>
          <p style={{ marginTop: '6px', fontSize: '14px' }}>
            Add a new task or adjust your filters above.
          </p>
        </div>
      ) : (
        <div className="todos-grid">
          {filteredTodos.map((todo) => (
            <div key={todo.id} className="todo-card">
              <div>
                <div className="todo-tags">
                  <span className={`badge badge-${todo.status.toLowerCase()}`}>
                    {todo.status}
                  </span>
                  <span className={`badge badge-${todo.priority.toLowerCase()}`}>
                    {todo.priority} PRIORITY
                  </span>
                </div>
                <h4 className="todo-title">{todo.title}</h4>
                <p className="todo-desc">{todo.description || 'No detailed description.'}</p>
              </div>

              <div className="todo-footer">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={13} /> {todo.userName || `User ${todo.userId}`}
                </span>
                <div className="todo-actions">
                  {todo.status !== 'COMPLETED' && (
                    <button
                      className="icon-btn"
                      title="Mark Completed"
                      onClick={() => onMarkComplete(todo.id)}
                    >
                      <Check size={16} color="#10b981" />
                    </button>
                  )}
                  <button
                    className="icon-btn"
                    title="Delete"
                    onClick={() => onDeleteTodo(todo.id)}
                  >
                    <Trash2 size={16} color="#ef4444" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Todo Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Create New Todo Task</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Task Title *</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ width: '100%' }}
                  placeholder="e.g. Master Spring Data JPA N+1 problem solution"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  style={{ width: '100%', minHeight: '80px' }}
                  placeholder="Key concepts, sample code snippets, or notes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <label>Status</label>
                  <select
                    className="form-select"
                    style={{ width: '100%' }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TodoStatus)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>

                <div className="form-group col">
                  <label>Priority</label>
                  <select
                    className="form-select"
                    style={{ width: '100%' }}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as TodoPriority)}
                  >
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col">
                  <label>Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    style={{ width: '100%' }}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>

                <div className="form-group col">
                  <label>Assigned User</label>
                  <select
                    className="form-select"
                    style={{ width: '100%' }}
                    value={assignedUserId}
                    onChange={(e) => setAssignedUserId(Number(e.target.value))}
                  >
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Todo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
