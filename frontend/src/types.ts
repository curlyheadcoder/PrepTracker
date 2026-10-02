export type TodoStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TodoPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Subtopic {
  id: string;
  title: string;
}

export interface StudyTopic {
  id: string;
  day: 1 | 2 | 3 | 4;
  title: string;
  subtopics: Subtopic[];
}

export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: TodoPriority;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  userId: number;
  userName?: string;
}

export interface UserItem {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
  todoCount?: number;
}

export interface TodoAnalytics {
  totalTodos: number;
  completedCount: number;
  pendingCount: number;
  inProgressCount: number;
  countByStatus: Record<TodoStatus, number>;
  countByPriority: Record<TodoPriority, number>;
}
