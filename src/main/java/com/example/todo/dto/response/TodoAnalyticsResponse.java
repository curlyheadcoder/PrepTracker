package com.example.todo.dto.response;

import com.example.todo.enums.TodoPriority;
import com.example.todo.enums.TodoStatus;
import java.util.Map;

public class TodoAnalyticsResponse {

    private long totalTodos;
    private long completedCount;
    private long pendingCount;
    private long inProgressCount;
    private Map<TodoStatus, Long> countByStatus;
    private Map<TodoPriority, Long> countByPriority;

    public TodoAnalyticsResponse() {
    }

    public TodoAnalyticsResponse(long totalTodos, long completedCount, long pendingCount, long inProgressCount,
                                 Map<TodoStatus, Long> countByStatus, Map<TodoPriority, Long> countByPriority) {
        this.totalTodos = totalTodos;
        this.completedCount = completedCount;
        this.pendingCount = pendingCount;
        this.inProgressCount = inProgressCount;
        this.countByStatus = countByStatus;
        this.countByPriority = countByPriority;
    }

    public long getTotalTodos() {
        return totalTodos;
    }

    public void setTotalTodos(long totalTodos) {
        this.totalTodos = totalTodos;
    }

    public long getCompletedCount() {
        return completedCount;
    }

    public void setCompletedCount(long completedCount) {
        this.completedCount = completedCount;
    }

    public long getPendingCount() {
        return pendingCount;
    }

    public void setPendingCount(long pendingCount) {
        this.pendingCount = pendingCount;
    }

    public long getInProgressCount() {
        return inProgressCount;
    }

    public void setInProgressCount(long inProgressCount) {
        this.inProgressCount = inProgressCount;
    }

    public Map<TodoStatus, Long> getCountByStatus() {
        return countByStatus;
    }

    public void setCountByStatus(Map<TodoStatus, Long> countByStatus) {
        this.countByStatus = countByStatus;
    }

    public Map<TodoPriority, Long> getCountByPriority() {
        return countByPriority;
    }

    public void setCountByPriority(Map<TodoPriority, Long> countByPriority) {
        this.countByPriority = countByPriority;
    }
}
