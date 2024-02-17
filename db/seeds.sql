INSERT INTO departments (name) VALUES ('Engineering'), ('Human Resources'), ('Marketing'), ('Finance');

INSERT INTO roles (title, salary, department_id) VALUES 
('Software Engineer', 80000, 2),
('Senior Software Engineer', 120000, 2),
('HR Manager', 85000, 1),
('HR Assistant', 55000, 1),
('Marketing Director', 75000, 3),
('Accountant', 65000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Anne', 'Jones', 3, 2),
('Tom', 'Brown', 4, 2),
('Samantha', 'Baker', 5, 3),
('James', 'Johnson', 6, 4);
```