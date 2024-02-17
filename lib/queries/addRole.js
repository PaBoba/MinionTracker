const inquirer = require("inquirer");

const { getAllDepartments } = require("../Department");
const { addRole } = require("../Role");

function addNewRole(options) {
  getAllDepartments().then(([departments]) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Input the title of the role:",
        },
        {
          type: "input",
          name: "salary",
          message: "Input the salary for the role:",
        },
        {
          type: "list",
          name: "departmentId",
          message: "Pick a department for the role:",
          choices: departments.map((department) => ({
            name: department.name,
            value: department.id,
          })),
        },
      ])
      .then(({ title, salary, departmentId }) => {
        addRole(title, salary, departmentId).then(() => {
          console.log(`Added ${title} role to the database.`);
          options();
        });
      });
  });
}

module.exports = { addNewRole };
