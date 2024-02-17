const inquirer = require("inquirer");

const { getAllDepartments } = require("../Department");
const { getAllRoles } = require("../Role");
const { getEmployeeManagers, addEmployee } = require("../Employee");

function addNewEmployee(options) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Input the employee's first name:",
        validate: (input) => (input ? true : "Cannot be empty."),
      },
      {
        type: "input",
        name: "lastName",
        message: "Input the employee's last name:",
        validate: (input) => (input ? true : "Cannot be empty."),
      },
    ])
    .then(({ firstName, lastName }) => {
      getAllDepartments().then(([departments]) => {
        const departmentChoices = departments.map((department) => ({
          name: department.name,
          value: department.id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "departmentId",
              message: "Pick a department for the employee:",
              choices: departmentChoices,
            },
          ])
          .then(({ departmentId }) => {
            getAllRoles().then(([roles]) => {
              const filteredRoles = roles.filter(
                (role) => role.department_id === departmentId
              );
              const roleChoices = filteredRoles.map((role) => ({
                name: role.title,
                value: role.id,
              }));

              getEmployeeManagers().then(([managers]) => {
                const managerChoices = managers.map((manager) => ({
                  name: `${manager.first_name} ${manager.last_name}`,
                  value: manager.id,
                }));
                managerChoices.unshift({ name: "None", value: null });
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "roleId",
                      message: "Pick a role for the employee:",
                      choices: roleChoices,
                    },
                    {
                      type: "list",
                      name: "managerId",
                      message: "Pick a manager for the employee:",
                      choices: managerChoices,
                    },
                  ])
                  .then(({ roleId, managerId }) => {
                    addEmployee(firstName, lastName, roleId, managerId).then(
                      () => {
                        console.log(
                          `Added ${firstName} ${lastName} to the database.`
                        );
                        options();
                      }
                    );
                  });
              });
            });
          });
      });
    });
}

module.exports = { addNewEmployee };
