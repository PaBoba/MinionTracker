const inquirer = require("inquirer");

const { getAllRoles } = require("../Role");
const {
  updateRoleTitle,
  updateRoleSalary,
  updateRoleDepartment,
} = require("../Role");

function updateRoleInfo(options) {
  getAllRoles().then(([roles]) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "roleId",
          message: "Pick a role to update",
          choices: roles.map((role) => ({ name: role.title, value: role.id })),
        },
      ])
      .then(({ roleId }) => {
        inquirer
          .prompt([
            {
              type: "list",
              name: "action",
              message: "Pick an attribute to update",
              choices: ["Title", "Salary", "Department", "Exit"],
            },
          ])
          .then(({ action }) => {
            switch (action) {
              case "Title":
                return updateTitle(roleId, options);
              case "Salary":
                return updateSalary(roleId, options);
              case "Department":
                return updateDepartment(roleId, options);
              case "Exit":
                return options();
              default:
                console.log("Invalid option");
                updateRoleInfo(options);
            }
          });
      });
  });
}

function updateTitle(roleId, options) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newTitle",
        message: "Input the new title for the role:",
      },
    ])
    .then(({ newTitle }) => {
      updateRoleTitle(roleId, newTitle).then(() => {
        console.log("New title updated successfully.");
        options();
      });
    });
}

function updateSalary(roleId, options) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newSalary",
        message: "Input the new salary for the role:",
      },
    ])
    .then(({ newSalary }) => {
      updateRoleSalary(roleId, newSalary).then(() => {
        console.log("New salary updated successfully.");
        options();
      });
    });
}

function updateDepartment(roleId, options) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "Input the new department for the role",
      },
    ])
    .then(({ newDepartment }) => {
      updateRoleDepartment(roleId, newDepartment).then(() => {
        console.log("New department updated successfully.");
        options();
      });
    });
}

module.exports = { updateRoleInfo };
