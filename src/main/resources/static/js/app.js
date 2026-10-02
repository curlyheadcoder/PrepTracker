// Global App State
const API_BASE = '/api/v1';

// 18 Core Interview Topics Map with Subtopics categorized by Day
const STUDY_TOPICS = [
    // Day 1
    {
        id: 't1', day: 1, title: 'Java 8 Features',
        subtopics: [
            { id: 't1_s1', title: 'Lambda Expressions & Anonymous Functions Syntax' },
            { id: 't1_s2', title: 'Functional Interfaces (Function, Predicate, Consumer, Supplier)' },
            { id: 't1_s3', title: 'Optional Class & Null-Safe Exception Handling' },
            { id: 't1_s4', title: 'Method References (Class::methodName)' }
        ]
    },
    {
        id: 't2', day: 1, title: 'Stream API',
        subtopics: [
            { id: 't2_s1', title: 'filter() & map() Transformation Pipelines' },
            { id: 't2_s2', title: 'flatMap(), sorted(), distinct()' },
            { id: 't2_s3', title: 'collect(Collectors.toList()) & Collectors.toMap()' },
            { id: 't2_s4', title: 'collect(Collectors.groupingBy(..., counting())) Aggregations' },
            { id: 't2_s5', title: 'reduce() & count() Terminal Operations' }
        ]
    },
    {
        id: 't3', day: 1, title: 'Spring Boot REST API & CRUD',
        subtopics: [
            { id: 't3_s1', title: 'Controller Layer (@RestController, @RequestMapping)' },
            { id: 't3_s2', title: 'HTTP Verbs (GET, POST, PUT, PATCH, DELETE)' },
            { id: 't3_s3', title: 'Path Variables (@PathVariable) & Query Params (@RequestParam)' },
            { id: 't3_s4', title: 'Pagination & Sorting (Pageable, PageRequest, Sort)' }
        ]
    },
    {
        id: 't4', day: 1, title: 'ResponseEntity Class & HTTP Status Codes',
        subtopics: [
            { id: 't4_s1', title: '201 CREATED (Resource Creation)' },
            { id: 't4_s2', title: '200 OK (Successful Retrieval & Updates)' },
            { id: 't4_s3', title: '204 NO CONTENT (Successful Deletion)' },
            { id: 't4_s4', title: '400 BAD REQUEST (Bean Validation Failures)' },
            { id: 't4_s5', title: '404 NOT FOUND & 409 CONFLICT' }
        ]
    },
    {
        id: 't5', day: 1, title: 'Global Exception Handling',
        subtopics: [
            { id: 't5_s1', title: '@RestControllerAdvice vs @ControllerAdvice' },
            { id: 't5_s2', title: '@ExceptionHandler for Custom Exceptions (TodoNotFoundException)' },
            { id: 't5_s3', title: 'Handling MethodArgumentNotValidException for @Valid' },
            { id: 't5_s4', title: 'Standardized ErrorResponse JSON Structure' }
        ]
    },
    {
        id: 't6', day: 1, title: 'DTOs & Layer Separation',
        subtopics: [
            { id: 't6_s1', title: 'Request DTOs vs Response DTOs' },
            { id: 't6_s2', title: 'Entity vs DTO Separation Rationale' },
            { id: 't6_s3', title: 'Preventing Over-posting & Circular JSON Loops' }
        ]
    },
    {
        id: 't7', day: 1, title: 'Spring Validation',
        subtopics: [
            { id: 't7_s1', title: '@NotBlank & @NotNull' },
            { id: 't7_s2', title: '@Size & @Email' },
            { id: 't7_s3', title: '@FutureOrPresent Date Rules' },
            { id: 't7_s4', title: 'Controller @Valid Trigger' }
        ]
    },
    {
        id: 't8', day: 1, title: 'Spring Data JPA',
        subtopics: [
            { id: 't8_s1', title: 'JpaRepository Interface' },
            { id: 't8_s2', title: 'Derived Query Methods (findByStatus)' },
            { id: 't8_s3', title: 'JPQL Query (@Query("SELECT t FROM Todo t..."))' },
            { id: 't8_s4', title: 'Native SQL Query (@Query(nativeQuery = true))' },
            { id: 't8_s5', title: 'N+1 Problem & FetchType.LAZY vs EAGER' }
        ]
    },
    {
        id: 't9', day: 1, title: 'MySQL CRUD & JOIN Queries',
        subtopics: [
            { id: 't9_s1', title: 'Basic DDL & DML (INSERT, SELECT, UPDATE, DELETE)' },
            { id: 't9_s2', title: 'INNER JOIN & LEFT JOIN' },
            { id: 't9_s3', title: 'GROUP BY & HAVING Clause Aggregations' },
            { id: 't9_s4', title: 'Subqueries & WHERE IN Clauses' }
        ]
    },

    // Day 2
    {
        id: 't10', day: 2, title: 'Spring Transaction Management',
        subtopics: [
            { id: 't10_s1', title: '@Transactional Annotation & Boundaries' },
            { id: 't10_s2', title: 'ACID Properties in Relational Databases' },
            { id: 't10_s3', title: 'Rollback Rules (Checked vs Unchecked Exceptions)' },
            { id: 't10_s4', title: 'readOnly = true Optimization' }
        ]
    },
    {
        id: 't11', day: 2, title: 'SQL Aggregations & Advanced Queries',
        subtopics: [
            { id: 't11_s1', title: 'COUNT, SUM, AVG, MIN, MAX Functions' },
            { id: 't11_s2', title: 'HAVING Clause Filtering on Aggregates' },
            { id: 't11_s3', title: 'Identifying Users with 0 Todos (LEFT JOIN IS NULL)' }
        ]
    },
    {
        id: 't12', day: 2, title: 'JUnit 5 & Mockito Testing',
        subtopics: [
            { id: 't12_s1', title: '@ExtendWith(MockitoExtension.class)' },
            { id: 't12_s2', title: '@Mock vs @InjectMocks' },
            { id: 't12_s3', title: 'when().thenReturn() & verify()' },
            { id: 't12_s4', title: 'assertThrows() for Exception Testing' }
        ]
    },
    {
        id: 't13', day: 2, title: 'MockMvc Controller Integration Testing',
        subtopics: [
            { id: 't13_s1', title: '@WebMvcTest(Controller.class)' },
            { id: 't13_s2', title: 'MockMvc perform(), post(), get(), delete()' },
            { id: 't13_s3', title: 'Asserting Status Codes (status().isCreated(), status().isNotFound())' },
            { id: 't13_s4', title: 'JSON Path Assertions (jsonPath("$.title"))' }
        ]
    },

    // Day 3
    {
        id: 't14', day: 3, title: 'Microservices Architecture',
        subtopics: [
            { id: 't14_s1', title: 'Monolith to Microservices Evolution' },
            { id: 't14_s2', title: 'API Gateway & Routing' },
            { id: 't14_s3', title: 'Service Discovery (Eureka / Consul)' },
            { id: 't14_s4', title: 'Database per Service & Config Server' }
        ]
    },
    {
        id: 't15', day: 3, title: 'Synchronous vs Asynchronous Communication',
        subtopics: [
            { id: 't15_s1', title: 'REST Synchronous HTTP Communication' },
            { id: 't15_s2', title: 'Tightly Coupled vs Loosely Coupled Systems' },
            { id: 't15_s3', title: 'Timeouts, Retries, and Circuit Breakers' }
        ]
    },
    {
        id: 't16', day: 3, title: 'Apache Kafka Event Messaging',
        subtopics: [
            { id: 't16_s1', title: 'Kafka Producer & Consumer Concepts' },
            { id: 't16_s2', title: 'Topics, Partitions, and Offsets' },
            { id: 't16_s3', title: 'Consumer Groups & Eventual Consistency' }
        ]
    },

    // Day 4
    {
        id: 't17', day: 4, title: 'Docker & Containerization',
        subtopics: [
            { id: 't17_s1', title: 'Multi-stage Dockerfile Design' },
            { id: 't17_s2', title: 'docker-compose.yml for Multi-Container Setup' },
            { id: 't17_s3', title: 'Images, Containers, Volumes, and Port Mapping' }
        ]
    },
    {
        id: 't18', day: 4, title: 'Kubernetes & CI/CD Deployment',
        subtopics: [
            { id: 't18_s1', title: 'Deployments, Pods, and Services' },
            { id: 't18_s2', title: 'ConfigMaps & Secrets' },
            { id: 't18_s3', title: 'Git/GitHub Actions CI/CD Pipeline' },
            { id: 't18_s4', title: 'JIRA & Confluence Agile Workflow' }
        ]
    }
];

// Pre-populated Cheatsheet Content
const CHEATSHEET_DATA = {
    java8: `
        <h2>Java 8 & Stream API Cheatsheet</h2>
        <p><strong>Lambda Expressions:</strong> <code>(a, b) -> a + b</code></p>
        <p><strong>Method References:</strong> <code>TodoResponse::new</code> or <code>User::getName</code></p>
        <p><strong>Optional Pattern:</strong></p>
        <pre>User user = userRepository.findById(id)
    .orElseThrow(() -> new UserNotFoundException("User not found: " + id));</pre>
        <p><strong>Stream Aggregation Example:</strong></p>
        <pre>Map&lt;TodoStatus, Long&gt; countByStatus = todos.stream()
    .collect(Collectors.groupingBy(Todo::getStatus, Collectors.counting()));</pre>
    `,
    rest: `
        <h2>REST API & ResponseEntity Guide</h2>
        <p><strong>HTTP Status Codes:</strong></p>
        <ul>
            <li><code>201 CREATED</code>: Returned on successful resource creation (POST)</li>
            <li><code>200 OK</code>: Returned on successful retrieval (GET) or update (PUT/PATCH)</li>
            <li><code>204 NO CONTENT</code>: Returned on successful deletion (DELETE)</li>
            <li><code>400 BAD REQUEST</code>: Bean validation failure (@Valid)</li>
            <li><code>404 NOT FOUND</code>: Entity missing in DB</li>
            <li><code>409 CONFLICT</code>: Duplicate resource (e.g. duplicate email)</li>
        </ul>
    `,
    jpa: `
        <h2>Spring Data JPA Cheat Sheet</h2>
        <p><strong>Derived Query Method:</strong></p>
        <pre>Page&lt;Todo&gt; findByStatus(TodoStatus status, Pageable pageable);</pre>
        <p><strong>JPQL Example:</strong></p>
        <pre>@Query("SELECT t FROM Todo t WHERE t.user.id = :userId AND t.status = :status")
List&lt;Todo&gt; findUserTodosByStatus(@Param("userId") Long userId, @Param("status") TodoStatus status);</pre>
        <p><strong>Native SQL Example:</strong></p>
        <pre>@Query(value = "SELECT * FROM todos WHERE priority = :priority", nativeQuery = true)
List&lt;Todo&gt; findOverdueTodosByPriority(@Param("priority") String priority);</pre>
    `,
    sql: `
        <h2>SQL & JOIN Queries</h2>
        <p><strong>INNER JOIN:</strong></p>
        <pre>SELECT t.id, t.title, u.name 
FROM todos t 
INNER JOIN users u ON t.user_id = u.id;</pre>
        <p><strong>LEFT JOIN (Find Users with 0 Todos):</strong></p>
        <pre>SELECT u.id, u.name 
FROM users u 
LEFT JOIN todos t ON u.id = t.user_id 
WHERE t.id IS NULL;</pre>
        <p><strong>GROUP BY & HAVING:</strong></p>
        <pre>SELECT user_id, COUNT(*) AS todo_count 
FROM todos 
GROUP BY user_id 
HAVING COUNT(*) > 5;</pre>
    `,
    qa: `
        <h2>Top Interview Questions & Answers</h2>
        <p><strong>1. Q: Why did you use DTOs instead of returning JPA entities?</strong></p>
        <p><em>A: Prevents exposing internal database schemas, avoids over-posting security issues, and solves Jackson infinite recursion loops on bidirectional relationships.</em></p>
        <p><strong>2. Q: What is the N+1 SELECT problem in JPA?</strong></p>
        <p><em>A: Occurs when retrieving N parent entities triggers 1 initial query + N additional SELECT queries to fetch LAZY child entities. Solved using <code>JOIN FETCH</code> or <code>@EntityGraph</code>.</em></p>
        <p><strong>3. Q: Why use @RestControllerAdvice?</strong></p>
        <p><em>A: Centralizes exception handling across all controllers in a single global component.</em></p>
    `
};

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initStudyTracker();
    initUserManagement();
    initTodoManagement();
    initAnalytics();
    initCheatsheets();
});

// Navigation Handling
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');

            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');

            if (targetTab === 'analytics') {
                fetchAnalytics();
            } else if (targetTab === 'todos') {
                fetchTodos();
            }
        });
    });
}

// 1. Study Tracker Logic with Subtopics Accordion
function initStudyTracker() {
    const savedSubtopics = JSON.parse(localStorage.getItem('java_prep_subtopics') || '{}');

    [1, 2, 3, 4].forEach(day => {
        const container = document.getElementById(`day${day}Topics`);
        const dayTopics = STUDY_TOPICS.filter(t => t.day === day);

        container.innerHTML = dayTopics.map(topic => {
            const totalSub = topic.subtopics.length;
            const completedSub = topic.subtopics.filter(s => savedSubtopics[s.id]).length;
            const isAllCompleted = completedSub === totalSub;

            const subtopicsHtml = topic.subtopics.map(sub => {
                const checked = savedSubtopics[sub.id] ? 'checked' : '';
                const completedClass = savedSubtopics[sub.id] ? 'completed' : '';
                return `
                    <div class="subtopic-item ${completedClass}" id="item-${sub.id}">
                        <input type="checkbox" id="${sub.id}" ${checked} onchange="toggleSubtopic('${topic.id}', '${sub.id}')">
                        <label for="${sub.id}">${sub.title}</label>
                    </div>
                `;
            }).join('');

            return `
                <div class="topic-accordion ${isAllCompleted ? 'completed' : ''}" id="accordion-${topic.id}">
                    <div class="topic-header" onclick="toggleAccordion('${topic.id}', event)">
                        <div class="topic-main-info">
                            <input type="checkbox" id="parent-${topic.id}" ${isAllCompleted ? 'checked' : ''} onclick="event.stopPropagation()" onchange="toggleParentTopic('${topic.id}')">
                            <span class="topic-title-text">${topic.title}</span>
                        </div>
                        <div class="topic-meta">
                            <span class="subtopic-count-pill ${isAllCompleted ? 'all-done' : ''}" id="pill-${topic.id}">
                                ${completedSub}/${totalSub} Done
                            </span>
                            <span class="accordion-arrow">▼</span>
                        </div>
                    </div>
                    <div class="subtopics-list" id="sublist-${topic.id}">
                        ${subtopicsHtml}
                    </div>
                </div>
            `;
        }).join('');
    });

    updateProgressStats();
}

window.toggleAccordion = function(topicId, event) {
    if (event.target.tagName === 'INPUT') return;
    const accordion = document.getElementById(`accordion-${topicId}`);
    accordion.classList.toggle('expanded');
};

window.toggleParentTopic = function(topicId) {
    const savedSubtopics = JSON.parse(localStorage.getItem('java_prep_subtopics') || '{}');
    const parentCheckbox = document.getElementById(`parent-${topicId}`);
    const topic = STUDY_TOPICS.find(t => t.id === topicId);

    if (!topic) return;

    topic.subtopics.forEach(sub => {
        savedSubtopics[sub.id] = parentCheckbox.checked;
        const subCheck = document.getElementById(sub.id);
        const subItem = document.getElementById(`item-${sub.id}`);
        if (subCheck) subCheck.checked = parentCheckbox.checked;
        if (subItem) {
            if (parentCheckbox.checked) subItem.classList.add('completed');
            else subItem.classList.remove('completed');
        }
    });

    localStorage.setItem('java_prep_subtopics', JSON.stringify(savedSubtopics));
    updateTopicState(topicId);
    updateProgressStats();
};

window.toggleSubtopic = function(topicId, subtopicId) {
    const savedSubtopics = JSON.parse(localStorage.getItem('java_prep_subtopics') || '{}');
    const subCheck = document.getElementById(subtopicId);
    const subItem = document.getElementById(`item-${subtopicId}`);

    savedSubtopics[subtopicId] = subCheck.checked;
    if (subCheck.checked) {
        subItem.classList.add('completed');
    } else {
        subItem.classList.remove('completed');
    }

    localStorage.setItem('java_prep_subtopics', JSON.stringify(savedSubtopics));
    updateTopicState(topicId);
    updateProgressStats();
};

function updateTopicState(topicId) {
    const savedSubtopics = JSON.parse(localStorage.getItem('java_prep_subtopics') || '{}');
    const topic = STUDY_TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    const totalSub = topic.subtopics.length;
    const completedSub = topic.subtopics.filter(s => savedSubtopics[s.id]).length;
    const isAllCompleted = completedSub === totalSub;

    const accordion = document.getElementById(`accordion-${topicId}`);
    const parentCheck = document.getElementById(`parent-${topicId}`);
    const pill = document.getElementById(`pill-${topicId}`);

    if (parentCheck) parentCheck.checked = isAllCompleted;
    if (accordion) {
        if (isAllCompleted) accordion.classList.add('completed');
        else accordion.classList.remove('completed');
    }
    if (pill) {
        pill.textContent = `${completedSub}/${totalSub} Done`;
        if (isAllCompleted) pill.classList.add('all-done');
        else pill.classList.remove('all-done');
    }
}

function updateProgressStats() {
    const savedSubtopics = JSON.parse(localStorage.getItem('java_prep_subtopics') || '{}');
    
    // Total subtopics across all topics
    let totalSubtopics = 0;
    let completedSubtopics = 0;

    // Total topics count
    const totalTopics = STUDY_TOPICS.length;
    let completedTopicsCount = 0;

    STUDY_TOPICS.forEach(topic => {
        const subCount = topic.subtopics.length;
        const doneSub = topic.subtopics.filter(s => savedSubtopics[s.id]).length;

        totalSubtopics += subCount;
        completedSubtopics += doneSub;

        if (doneSub === subCount) {
            completedTopicsCount++;
        }
    });

    const percentage = totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;

    document.getElementById('overallPercent').textContent = `${percentage}%`;
    document.getElementById('overallProgressBar').style.width = `${percentage}%`;
    document.getElementById('completedTopicsCount').textContent = completedTopicsCount;
    document.getElementById('pendingTopicsCount').textContent = totalTopics - completedTopicsCount;

    [1, 2, 3, 4].forEach(day => {
        const dayTopics = STUDY_TOPICS.filter(t => t.day === day);
        const dayDone = dayTopics.filter(t => {
            return t.subtopics.every(s => savedSubtopics[s.id]);
        }).length;
        document.getElementById(`day${day}Progress`).textContent = `${dayDone}/${dayTopics.length} Topics Done`;
    });
}

// 2. User Management Logic
function initUserManagement() {
    fetchUsers();

    document.getElementById('createUserForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('userNameInput').value.trim();
        const email = document.getElementById('userEmailInput').value.trim();

        try {
            const res = await fetch(`${API_BASE}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email })
            });

            if (!res.ok) {
                const err = await res.json();
                alert(`Error: ${err.message || 'Failed to create user'}`);
                return;
            }

            document.getElementById('userNameInput').value = '';
            document.getElementById('userEmailInput').value = '';
            fetchUsers();
        } catch (err) {
            alert('Failed to connect to backend server');
        }
    });
}

async function fetchUsers() {
    try {
        const res = await fetch(`${API_BASE}/users`);
        const users = await res.json();

        // Populate User Select dropdowns
        const userSelects = [document.getElementById('currentUserSelect'), document.getElementById('todoUser')];
        userSelects.forEach(select => {
            select.innerHTML = '<option value="">Select User...</option>' + 
                users.map(u => `<option value="${u.id}">${u.name} (${u.email})</option>`).join('');
        });

        // Populate User Management List
        const usersListElem = document.getElementById('usersList');
        if (users.length === 0) {
            usersListElem.innerHTML = '<p class="text-muted">No registered users found. Add one above.</p>';
            return;
        }

        usersListElem.innerHTML = users.map(u => `
            <div class="distribution-item">
                <div>
                    <strong>${u.name}</strong>
                    <div style="font-size:12px; color:var(--text-muted);">${u.email}</div>
                </div>
                <span class="badge badge-in_progress">${u.todoCount || 0} Todos</span>
            </div>
        `).join('');

        // If no user selected in current user picker, auto select first user
        if (users.length > 0 && !document.getElementById('currentUserSelect').value) {
            document.getElementById('currentUserSelect').value = users[0].id;
        }
    } catch (err) {
        console.error('Error fetching users:', err);
    }
}

// 3. Todo Management Logic
function initTodoManagement() {
    document.getElementById('openCreateTodoModal').addEventListener('click', () => openModal());
    document.getElementById('closeModalBtn').addEventListener('click', () => closeModal());
    document.getElementById('cancelModalBtn').addEventListener('click', () => closeModal());

    document.getElementById('filterStatus').addEventListener('change', () => fetchTodos());
    document.getElementById('filterPriority').addEventListener('change', () => fetchTodos());
    document.getElementById('currentUserSelect').addEventListener('change', () => fetchTodos());

    document.getElementById('todoForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveTodo();
    });
}

async function fetchTodos(page = 0) {
    const status = document.getElementById('filterStatus').value;
    const priority = document.getElementById('filterPriority').value;
    const userId = document.getElementById('currentUserSelect').value;

    let url = `${API_BASE}/todos?page=${page}&size=12`;
    if (status) url += `&status=${status}`;
    if (priority) url += `&priority=${priority}`;
    if (userId) url += `&userId=${userId}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        renderTodos(data.content || []);
    } catch (err) {
        document.getElementById('todosList').innerHTML = '<div class="empty-state">Failed to load todos</div>';
    }
}

function renderTodos(todos) {
    const container = document.getElementById('todosList');
    if (!todos || todos.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <h3>No Todos Found</h3>
                <p>Create a new task to get started!</p>
            </div>
        `;
        return;
    }

    container.innerHTML = todos.map(t => `
        <div class="todo-card">
            <div>
                <div class="todo-tags">
                    <span class="badge badge-${t.status.toLowerCase()}">${t.status}</span>
                    <span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span>
                </div>
                <h4 class="todo-title">${t.title}</h4>
                <p class="todo-desc">${t.description || 'No description provided.'}</p>
            </div>
            <div class="todo-footer">
                <span>👤 ${t.userName}</span>
                <div class="todo-actions">
                    ${t.status !== 'COMPLETED' ? `<button class="icon-btn" onclick="markComplete(${t.id})" title="Mark Completed">✅</button>` : ''}
                    <button class="icon-btn" onclick="deleteTodo(${t.id})" title="Delete">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.markComplete = async function(id) {
    try {
        const res = await fetch(`${API_BASE}/todos/${id}/complete`, { method: 'PATCH' });
        if (res.ok) fetchTodos();
    } catch (err) {
        alert('Failed to update status');
    }
};

window.deleteTodo = async function(id) {
    if (!confirm('Are you sure you want to delete this Todo task?')) return;
    try {
        const res = await fetch(`${API_BASE}/todos/${id}`, { method: 'DELETE' });
        if (res.ok) fetchTodos();
    } catch (err) {
        alert('Failed to delete todo');
    }
};

function openModal() {
    document.getElementById('todoForm').reset();
    document.getElementById('todoModal').classList.add('active');
}

function closeModal() {
    document.getElementById('todoModal').classList.remove('active');
}

async function saveTodo() {
    const title = document.getElementById('todoTitle').value.trim();
    const description = document.getElementById('todoDescription').value.trim();
    const status = document.getElementById('todoStatus').value;
    const priority = document.getElementById('todoPriority').value;
    const dueDate = document.getElementById('todoDueDate').value || null;
    const userId = document.getElementById('todoUser').value;

    const payload = { title, description, status, priority, dueDate, userId };

    try {
        const res = await fetch(`${API_BASE}/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const err = await res.json();
            alert(`Validation Error: ${JSON.stringify(err.errors || err.message)}`);
            return;
        }

        closeModal();
        fetchTodos();
        fetchUsers();
    } catch (err) {
        alert('Error saving todo');
    }
}

// 4. Stream API Live Analytics
async function initAnalytics() {
    document.getElementById('refreshAnalyticsBtn').addEventListener('click', () => fetchAnalytics());
}

async function fetchAnalytics() {
    try {
        const res = await fetch(`${API_BASE}/todos/analytics`);
        const data = await res.json();

        document.getElementById('analyticsTotal').textContent = data.totalTodos || 0;
        document.getElementById('analyticsCompleted').textContent = data.completedCount || 0;
        document.getElementById('analyticsPending').textContent = data.pendingCount || 0;
        document.getElementById('analyticsInProgress').textContent = data.inProgressCount || 0;

        // Render Status Map
        const statusElem = document.getElementById('statusDistribution');
        statusElem.innerHTML = Object.entries(data.countByStatus || {}).map(([k, v]) => `
            <div class="distribution-item">
                <span>${k}</span>
                <strong style="font-family:'JetBrains Mono'">${v}</strong>
            </div>
        `).join('') || '<p class="text-muted">No data</p>';

        // Render Priority Map
        const priorityElem = document.getElementById('priorityDistribution');
        priorityElem.innerHTML = Object.entries(data.countByPriority || {}).map(([k, v]) => `
            <div class="distribution-item">
                <span>${k}</span>
                <strong style="font-family:'JetBrains Mono'">${v}</strong>
            </div>
        `).join('') || '<p class="text-muted">No data</p>';
    } catch (err) {
        console.error('Error fetching analytics:', err);
    }
}

// 5. Cheatsheet Navigation
function initCheatsheets() {
    const csTabs = document.querySelectorAll('.cs-tab');
    const bodyElem = document.getElementById('cheatsheetBody');

    bodyElem.innerHTML = CHEATSHEET_DATA.java8;

    csTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const key = tab.getAttribute('data-cs');
            csTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            bodyElem.innerHTML = CHEATSHEET_DATA[key] || '<p>No content</p>';
        });
    });
}
