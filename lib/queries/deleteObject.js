const inquirer = require("inquirer");

const { getAllDepartments } = require("../Department");
const { getAllRoles } = require("../Role");
const { getAllEmployees } = require("../Employee");

const { deleteDepartment } = require("../Department");
const { deleteRole } = require("../Role");
const { deleteEmployee } = require("../Employee");

function deleteDepartmentOption(options) {
  getAllDepartments().then(([departments]) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Input the department to delete:",
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ])
      .then(({ departmentId }) => {
        const departmentName = departments.find(
          (department) => department.id === departmentId
        ).name;
        inquirer
          .prompt([
            {
              type: "confirm",
              name: "confirmDelete",
              message: `Delete: ${departmentName}?`,
            },
          ])
          .then(({ confirmDelete }) => {
            if (confirmDelete) {
              deleteDepartment(departmentId).then(() => {
                console.log("Department deleted successfully.");
                options();
              });
            } else {
              console.log("Deletion cancelled.");
              options();
            }
          });
      });
  });
}

function deleteRoleOption(options) {
  getAllRoles().then(([roles]) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "roleId",
          message: "Pick a role to delete:",
          choices: roles.map((role) => ({ name: role.title, value: role.id })),
        },
      ])
      .then(({ roleId }) => {
        const roleName = roles.find((role) => role.id === roleId).title;
        inquirer
          .prompt([
            {
              type: "confirm",
              name: "confirmDelete",
              message: `Delete: ${roleName}?`,
            },
          ])
          .then(({ confirmDelete }) => {
            if (confirmDelete) {
              deleteRole(roleId).then(() => {
                console.log("Role deleted successfully.");
                options();
              });
            } else {
              console.log("Deletion cancelled.");
              options();
            }
          });
      });
  });
}

function deleteEmployeeOption(options) {
  getAllEmployees().then(([employees]) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Pick an employee to delete:",
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
      ])
      .then(({ employeeId }) => {
        const employeeName =
          employees.find((employee) => employee.id === employeeId).first_name +
          " " +
          employees.find((employee) => employee.id === employeeId).last_name;
        inquirer
          .prompt([
            {
              type: "confirm",
              name: "confirmDelete",
              message: `Delete: ${employeeName}?`,
            },
          ])
          .then(({ confirmDelete }) => {
            if (confirmDelete) {
              deleteEmployee(employeeId).then(() => {
                console.log("Employee deleted successfully.");
                options();
              });
            } else {
              console.log("Deletion cancelled.");
              options();
            }
          });
      });
  });
}

module.exports = {
  deleteDepartmentOption,
  deleteRoleOption,
  deleteEmployeeOption,
};
