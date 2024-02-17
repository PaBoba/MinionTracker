const db = require("../db/connections");

class Department {
  // Get all departments
  static getAllDepartments() {
    return db.promise().query("SELECT * FROM departments");
  }

  // Add a department
  static addDepartment(name) {
    return db
      .promise()
      .query("INSERT INTO departments (name) VALUES (?)", [name]);
  }

  // Delete a department
  static deleteDepartment(departmentId) {
    return db
      .promise()
      .query("DELETE FROM departments WHERE id = ?", [departmentId]);
  }
}

module.exports = Department;
