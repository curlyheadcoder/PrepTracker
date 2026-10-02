export type TodoStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TodoPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Subtopic {
  id: string;
  title: string;
}

export interface StudyTopic {
  id: string;
  day?: 1 | 2 | 3 | 4;
  title: string;
  subtopics: Subtopic[];
}

export interface PlanModule {
  id: string;
  title: string; // e.g. "Day 1", "Week 1", "Month 1"
  orderIndex: number;
  topics: StudyTopic[];
}

export interface StudyPlan {
  id: string;
  title: string;
  description: string;
  category: 'Java' | 'Full Stack' | 'System Design' | 'AI & ML' | 'Custom';
  durationText: string; // e.g. "3-4 Days", "30 Days", "6 Months"
  isCustom?: boolean;
  modules: PlanModule[];
}

export interface SubtopicNote {
  subtopicId: string;
  contentMarkdown: string;
  attachmentUrl?: string;
  isAiGenerated?: boolean;
  updatedAt?: string;
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
