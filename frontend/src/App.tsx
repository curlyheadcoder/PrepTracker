import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { StudyTracker } from './components/StudyTracker';
import { TodoManager } from './components/TodoManager';
import { StreamAnalytics } from './components/StreamAnalytics';
import { InterviewCheatsheets } from './components/InterviewCheatsheets';
import { UserManager } from './components/UserManager';
import type { TodoItem, UserItem, TodoAnalytics } from './types';

const API_BASE = '/api/v1';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('tracker');

  // Subtopics persistence
  const [completedSubtopics, setCompletedSubtopics] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('java_prep_subtopics');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('java_prep_subtopics', JSON.stringify(completedSubtopics));
  }, [completedSubtopics]);

  // Users State
  const [users, setUsers] = useState<UserItem[]>([
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', todoCount: 2 },
    { id: 2, name: 'John Doe', email: 'john@example.com', todoCount: 1 },
  ]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(1);

  // Todos State
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 1,
      title: 'Master Java 8 Streams filter() and map()',
      description: 'Understand stream transformations and lazy evaluation pipelines.',
      status: 'PENDING',
      priority: 'HIGH',
      userId: 1,
      userName: 'Alice Smith',
    },
    {
      id: 2,
      title: 'Implement @RestControllerAdvice Global Exception Handler',
      description: 'Centralize custom exceptions returning standardized ErrorResponse JSON payloads.',
      status: 'COMPLETED',
      priority: 'MEDIUM',
      userId: 1,
      userName: 'Alice Smith',
    },
    {
      id: 3,
      title: 'Revise Spring Data JPA N+1 Select Problem',
      description: 'Use JOIN FETCH and @EntityGraph in JPQL queries.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      userId: 2,
      userName: 'John Doe',
    },
  ]);

  // Try fetching real data from Spring Boot API backend if available
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const uRes = await fetch(`${API_BASE}/users`);
        if (uRes.ok) {
          const uData = await uRes.json();
          if (Array.isArray(uData) && uData.length > 0) {
            setUsers(uData);
            if (!currentUserId) setCurrentUserId(uData[0].id);
          }
        }
      } catch {
        // Fallback to initial local state when running standalone on Vercel
      }
    };
    fetchBackendData();
  }, []);

  const handleCreateUser = (newUser: { name: string; email: string }) => {
    const userItem: UserItem = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      todoCount: 0,
    };
    setUsers((prev) => [...prev, userItem]);
    if (!currentUserId) setCurrentUserId(userItem.id);
  };

  const handleCreateTodo = (newTodo: Omit<TodoItem, 'id'>) => {
    const todoItem: TodoItem = {
      ...newTodo,
      id: Date.now(),
    };
    setTodos((prev) => [todoItem, ...prev]);

    // Update user todo count
    setUsers((prev) =>
      prev.map((u) => (u.id === newTodo.userId ? { ...u, todoCount: (u.todoCount || 0) + 1 } : u))
    );
  };

  const handleMarkComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'COMPLETED' as const } : t))
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // Compute Live Stream Analytics
  const analytics: TodoAnalytics = {
    totalTodos: todos.length,
    completedCount: todos.filter((t) => t.status === 'COMPLETED').length,
    pendingCount: todos.filter((t) => t.status === 'PENDING').length,
    inProgressCount: todos.filter((t) => t.status === 'IN_PROGRESS').length,
    countByStatus: {
      PENDING: todos.filter((t) => t.status === 'PENDING').length,
      IN_PROGRESS: todos.filter((t) => t.status === 'IN_PROGRESS').length,
      COMPLETED: todos.filter((t) => t.status === 'COMPLETED').length,
    },
    countByPriority: {
      LOW: todos.filter((t) => t.priority === 'LOW').length,
      MEDIUM: todos.filter((t) => t.priority === 'MEDIUM').length,
      HIGH: todos.filter((t) => t.priority === 'HIGH').length,
    },
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        users={users}
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
      />

      <main className="main-content">
        <Header
          title={
            activeTab === 'tracker'
              ? '3-4 Day Interview Study Tracker'
              : activeTab === 'todos'
              ? 'Todo Management System'
              : activeTab === 'analytics'
              ? 'Java 8 Stream API Analytics'
              : activeTab === 'cheatsheets'
              ? 'Interview Cheatsheets & Q&A Flashcards'
              : 'User Context Management'
          }
          subtitle={
            activeTab === 'tracker'
              ? 'Track your completion progress across 18 core Java Developer topics & subtopics'
              : activeTab === 'todos'
              ? 'Manage study tasks, priorities, and assignments'
              : activeTab === 'analytics'
              ? 'Real-time aggregations calculated via Java 8 Stream Collectors'
              : activeTab === 'cheatsheets'
              ? 'Quick-reference guides, code snippets, and top 30 interview questions'
              : 'Manage registered users and active workspace context'
          }
        />

        {activeTab === 'tracker' && (
          <StudyTracker
            completedSubtopics={completedSubtopics}
            setCompletedSubtopics={setCompletedSubtopics}
          />
        )}

        {activeTab === 'todos' && (
          <TodoManager
            todos={todos}
            users={users}
            currentUserId={currentUserId}
            onCreateTodo={handleCreateTodo}
            onMarkComplete={handleMarkComplete}
            onDeleteTodo={handleDeleteTodo}
          />
        )}

        {activeTab === 'analytics' && (
          <StreamAnalytics analytics={analytics} onRefresh={() => {}} />
        )}

        {activeTab === 'cheatsheets' && <InterviewCheatsheets />}

        {activeTab === 'users' && (
          <UserManager users={users} onCreateUser={handleCreateUser} />
        )}
      </main>
    </div>
  );
}

export default App;
