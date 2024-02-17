db = require("./db/connections");
const appTitle = require("./lib/title");
const { options } = require("./lib/queries/menuChoices");

// Function to start the application
function startApp() {
  console.log(appTitle);
  options();
}

db.promise()
  .connect()
  .then(() => {
    console.log("Connected to the database.");
    startApp();
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
