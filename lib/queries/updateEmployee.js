const inquirer = require("inquirer");

const {
  updateEmployeeDepartment,
  updateEmployeeRole,
  updateEmployeeManager,
} = require("../Employee");
const { getAllDepartments } = require("../Department");
const { getAllRoles } = require("../Role");

function updateEmployeeInfo(options) {
  getAllEmployees().then(([employees]) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Input the employee to update:",
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
      ])
      .then(({ employeeId }) => {
        console.log(
          `${employees.find((emp) => emp.id === employeeId).first_name} ${
            employees.find((emp) => emp.id === employeeId).last_name
          } selected`
        );
        inquirer
          .prompt([
            {
              type: "list",
              name: "updateChoice",
              message: "Pick an attribute to update:",
              choices: ["Department", "Role", "Manager"],
            },
          ])
          .then(({ updateChoice }) => {
            switch (updateChoice) {
              case "Department":
                updateDepartment(employeeId, options);
                break;
              case "Role":
                updateRole(employeeId, options);
                break;
              case "Manager":
                updateManager(employeeId, options);
                break;
            }
          });
      });
  });
}

function updateDepartment(employeeId, options) {
  getAllDepartments().then(([departments]) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentId",
          message: "Input the new department for the employee:",
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ])
      .then(({ departmentId }) => {
        updateEmployeeDepartment(employeeId, departmentId).then(() => {
          console.log(
            `${employee.first_name} ${
              employee.last_name
            } department updated to ${
              departments.find((dep) => dep.id === departmentId).name
            }.`
          );
          askForMoreChanges(employeeId, options);
        });
      });
  });
}

function updateRole(employeeId, departmentId, options) {
  getAllRoles().then(([roles]) => {
    const filteredRoles = roles.filter(
      (role) => role.department_id === departmentId
    );
    const roleChoices = filteredRoles.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "roleId",
          message: "Input the new role for the employee:",
          choices: roleChoices,
        },
      ])
      .then(({ roleId }) => {
        updateEmployeeRole(employeeId, roleId).then(() => {
          console.log(
            `${employee.first_name} ${employee.last_name} role updated to ${
              roles.find((rol) => rol.id === roleId).title
            }.`
          );
          askForMoreChanges(employeeId, options);
        });
      });
  });
}

function updateManager(employeeId, options) {
  getAllEmployees().then(([managers]) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "managerId",
          message: "Input the new manager for the employee:",
          choices: managers.map((manager) => ({
            name: `${manager.first_name} ${manager.last_name}`,
            value: manager.id,
          })),
        },
      ])
      .then(({ managerId }) => {
        updateEmployeeManager(employeeId, managerId).then(() => {
          console.log(
            `${employee.first_name} ${employee.last_name} manager updated to ${newManager.first_name} ${newManager.last_name}.`
          );
          askForMoreChanges(employeeId, options);
        });
      });
  });
}

function askForMoreChanges(employeeId, options) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirmChange",
        message: "Do you want to make any more changes?",
      },
    ])
    .then(({ confirmChange }) => {
      if (confirmChange) {
        updateEmployeeInfo(employeeId, options);
      } else {
        options();
      }
    });
}

module.exports = { updateEmployeeInfo };
