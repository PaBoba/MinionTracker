const inquirer = require("inquirer");

const { addDepartment } = require("../Department");

function addNewDepartment(options) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Input the name of the department:",
      },
    ])
    .then(({ departmentName }) => {
      addDepartment(departmentName).then(() => {
        console.log(`Added ${departmentName} to the database.`);
        options();
      });
    });
}

module.exports = { addNewDepartment };
