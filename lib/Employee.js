const db = require("../db/connections");

class Employee {
  // Get all employees
  static getAllEmployees() {
    return db.promise().query(`
      SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employees e
      LEFT JOIN roles r ON e.role_id = r.id
      LEFT JOIN departments d ON r.department_id = d.id
      LEFT JOIN employees m ON e.manager_id = m.id
    `);
  }

  // List potential managers
  static getEmployeeManagers() {
    return db.promise().query(`
    SELECT id, first_name, last_name 
    FROM employees 
    WHERE manager_id IS NULL
  `);
  }

  // Add an employee
  static addEmployee(first_name, last_name, role_id, manager_id) {
    return db
      .promise()
      .query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [first_name, last_name, role_id, manager_id]
      );
  }

  // Update an employee's department
  static updateEmployeeDepartment(employee_id, department_id) {
    return db
      .promise()
      .query(
        "UPDATE roles r INNER JOIN employees e ON r.id = e.role_id SET r.department_id = ? WHERE e.id = ?",
        [department_id, employee_id]
      );
  }
  // Update an employee's role
  static updateEmployeeRole(employee_id, role_id) {
    return db
      .promise()
      .query("UPDATE employees SET role_id = ? WHERE id = ?", [
        role_id,
        employee_id,
      ]);
  }

  // Update an employee's manager
  static updateEmployeeManager(employee_id, manager_id) {
    return db
      .promise()
      .query("UPDATE employees SET manager_id = ? WHERE id = ?", [
        manager_id,
        employee_id,
      ]);
  }

  // Delete an employee
  static deleteEmployee(employeeId) {
    return db
      .promise()
      .query("DELETE FROM employees WHERE id = ?", [employeeId]);
  }
}

module.exports = Employee;
