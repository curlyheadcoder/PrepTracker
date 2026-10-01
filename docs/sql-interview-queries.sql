-- =====================================================================
-- SQL INTERVIEW QUERY GUIDE - TODO MANAGEMENT SYSTEM
-- Covers: CRUD, WHERE, GROUP BY, HAVING, AGGREGATIONS, INNER/LEFT JOIN, SUBQUERIES
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. DDL SCHEMA (For MySQL Reference)
-- ---------------------------------------------------------------------
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE todos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    due_date DATE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_todos_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- 2. CRUD OPERATIONS
-- ---------------------------------------------------------------------
-- CREATE (INSERT)
INSERT INTO users (name, email) VALUES ('Alice Smith', 'alice@example.com');
INSERT INTO todos (title, description, status, priority, due_date, user_id) 
VALUES ('Prepare Java 8 Slides', 'Review Lambdas and Streams', 'PENDING', 'HIGH', '2026-10-10', 1);

-- READ (SELECT)
SELECT id, title, status, priority FROM todos WHERE user_id = 1;

-- UPDATE
UPDATE todos SET status = 'COMPLETED', updated_at = NOW() WHERE id = 1;

-- DELETE
DELETE FROM todos WHERE id = 1;

-- ---------------------------------------------------------------------
-- 3. FILTERING & SORTING (WHERE, ORDER BY)
-- ---------------------------------------------------------------------
-- Find all completed todos ordered by due date descending
SELECT * FROM todos 
WHERE status = 'COMPLETED' 
ORDER BY due_date DESC;

-- Find all HIGH priority todos that are pending or in progress
SELECT * FROM todos 
WHERE priority = 'HIGH' AND status IN ('PENDING', 'IN_PROGRESS');

-- Find overdue todos (due date is prior to current date and not completed)
SELECT * FROM todos 
WHERE due_date < CURRENT_DATE() AND status != 'COMPLETED';

-- ---------------------------------------------------------------------
-- 4. AGGREGATION & GROUP BY (COUNT, SUM, AVG, MIN, MAX, HAVING)
-- ---------------------------------------------------------------------
-- Count total todos by status
SELECT status, COUNT(*) AS total_count 
FROM todos 
GROUP BY status;

-- Count total todos by priority
SELECT priority, COUNT(*) AS total_count 
FROM todos 
GROUP BY priority 
ORDER BY total_count DESC;

-- Find users who have created more than 5 todos (HAVING clause filter on aggregate)
SELECT user_id, COUNT(*) AS todo_count 
FROM todos 
GROUP BY user_id 
HAVING COUNT(*) > 5;

-- ---------------------------------------------------------------------
-- 5. JOINS (INNER JOIN, LEFT JOIN, RIGHT JOIN)
-- ---------------------------------------------------------------------
-- INNER JOIN: Retrieve todos along with user information (Only users who have todos)
SELECT t.id AS todo_id, t.title, t.status, t.priority, u.id AS user_id, u.name AS user_name, u.email
FROM todos t
INNER JOIN users u ON t.user_id = u.id;

-- LEFT JOIN: Retrieve ALL users and their todos (Includes users with 0 todos)
SELECT u.id AS user_id, u.name, u.email, t.id AS todo_id, t.title, t.status
FROM users u
LEFT JOIN todos t ON u.id = t.user_id;

-- Find users who have NO todos assigned (LEFT JOIN where right side IS NULL)
SELECT u.id, u.name, u.email 
FROM users u
LEFT JOIN todos t ON u.id = t.user_id
WHERE t.id IS NULL;

-- ---------------------------------------------------------------------
-- 6. SUBQUERIES
-- ---------------------------------------------------------------------
-- Find users who have at least one HIGH priority pending todo
SELECT id, name, email 
FROM users 
WHERE id IN (
    SELECT DISTINCT user_id 
    FROM todos 
    WHERE priority = 'HIGH' AND status = 'PENDING'
);

-- Find todos owned by the user with email 'alice@example.com'
SELECT * FROM todos 
WHERE user_id = (SELECT id FROM users WHERE email = 'alice@example.com');
