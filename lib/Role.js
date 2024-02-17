const db = require("../db/connections");

class Role {
  // Get all roles
  static getAllRoles() {
    return db.promise().query("SELECT * FROM roles");
  }

  // Add a role
  static addRole(title, salary, department_id) {
    return db
      .promise()
      .query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [title, salary, department_id]
      );
  }

  // Update a role title
  static updateRoleTitle(role_id, title) {
    return db
      .promise()
      .query("UPDATE roles SET title = ? WHERE id = ?", [title, role_id]);
  }

  // Update a role's salary
  static updateRoleSalary(role_id, salary) {
    return db
      .promise()
      .query("UPDATE roles SET salary = ? WHERE id = ?", [salary, role_id]);
  }

  // Update a role's department
  static updateRoleDepartment(role_id, department_id) {
    return db
      .promise()
      .query("UPDATE roles SET department_id = ? WHERE id = ?", [
        department_id,
        role_id,
      ]);
  }

  // Delete a role
  static deleteRole(roleId) {
    return db.promise().query("DELETE FROM roles WHERE id = ?", [roleId]);
  }
}

module.exports = Role;
