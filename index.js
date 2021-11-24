const mysql = require("mysql");
const inquirer = require("inquirer");


const db = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "",
    database: "employeesDB"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + db.threadId)

    firstPrompt();
});

const firstPrompt = function() {
    inquirer
    .prompt({
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee's role",
            "Nevermind"]
    })
    .then(function ({ task }) {
        switch (task) {
            case "View all departments":
            viewDepartments();
            break;
            
            case "View all roles":
            viewRoles();
            break;

            case "View all employees":
            viewEmployees();
            break;

            case "Add a department":
            addDepartment();
            break;

            case "Add a role":
            addRole();
            break;

            case "Add an employee":
            addEmployee();
            break;

            case "Update an employee's role":
            updateRole();
            break; 

            case "Nevermind":
            db.end();
            break;
        }
    })
}