const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Dundermifflin1",
    database: "employeesDB"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + db.threadId)

    prompt();
});

function prompt() {
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

const viewDepartments = async function() {
    let data;
    try {
        data = await query(`SELECT id, name FROM department`);
    } catch (e) {
        console.log(e);
    }
    return data;
}

const viewRoles = async function() {
    let data;
    try {
        data = await query (`SELECT r.id, r.title, r.salary, d.name department FROM role r INNER JOIN department d ON d.id = r.department_id`); 
    } catch (e) {
        console.log(e);
    }
    return data;
}

const viewEmployees = async function() {
    let data;
    try {
        data = await query(`SELECT e.id, e.first_name FirstName, e.last_name LastName, r.title Title, m.first_name ManagerFirst, m.last_name ManagerLast FROM employee e INNER JOIN role r ON r.id = e.role_id LEFT JOIN employee m ON m.id = e.manager_id`);
    } catch (e) {
        console.log(e);
    }
    return data;
}

const addDepartment = async function() {
    await inquirer 
    .prompt({
        name: "deptName",
        message: "Enter the department name"
    })
    .then(async answers => {
        await query(`INSERT INTO department SET ?`, {
            id: uuid.v4(),
            name: answers.deptName
        });
    });
    return "Created!"
}

const addRole = async function() {
    var departments = await viewDepartments();
    var choiceDepartments = [];

    for (var department of departments) {
        choiceDepartments.push({name: department.name, value: department.id});
    }

    await inquirer
    .prompt([{
        name: "roleName",
        message: "Please enter the name of the role"
    },
    {
        name: "salary",
        message: "Please enter the salary of the role"
    },
    {
        name: "deptID",
        type: "list",
        message: "Please select the department tis role belongs to",
        choices: choiceDepartments
    }])
    .then(async answers => {
        await query(`INSERT INTO role SET ?`,{
            id: uuid.v4(),
            title: answers.roleName,
            salary: answers.salary,
            department_id : answers.deptID
        });
    });
    return "Created!";
}

const addEmployee = async function() {
    const roles = await viewRoles();
    const managers = await viewEmployees();

    const choiceRoles = [];
    const choiceManagers = [];

    for (var role of roles) {
        choiceRoles.push({name: `${role.title} (${role.department})`, value: role.id});
    }

    for (var manager of managers) {
        choiceManagers.push({name: `${manager.FirstName} ${manager.LastName} (${manager.Title})`, value: manager.id});
    }
    choiceManagers.push({name: "None", value: ""});

    await inquirer
    .prompt([{
        name: "firstName",
        message: "Please enter the employee's first name"
    },
    {
        name: "lastName",
        message: "Please enter the employees last name"
    },
    {
        name: "roleID",
        type: "list",
        message: "Please select the employees role",
        choices: choiceRoles
    },
    {
        name: "managerID",
        type: "list",
        message: "Please select this employees manager",
        choices: choiceManagers
    }])
    .then(async answers => {
        await query(`INSERT INTO employee SET ?`, {
            id: uuid.v4(),
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleID,
            manager_id: answers.managerID
        });
    });
    return "Created!";
}

const updateRole = async function() {
    const employees = await viewEmployees();
    const roles = await viewRoles();
    const choiceEmployees = [];
    const choiceRoles = [];

    for (var employee of employees) {
        choiceEmployees.push({name : `${employee.FirstName} ${employee.LastName} (${employee.Title})`, value: employee.id});
    }
    for (var role of roles) {
        choiceRoles.push({name : `${role.title} (${role.department})`, value: employee.id});
    }

    await inquirer.prompt([{
        name: "employeeID",
        type: "list",
        message: "Please select whose role you'd like to change",
        choices: choiceEmployees
    },
    {
        name: "roleID",
        type: "list",
        message: "Please select this employees new role",
        choices: choiceRoles
    }])
    .then(async answers => {
        await query(
            `
            UPDATE employee SET role_id = "${answers.roleID} WHERE id = "${answers.employeeID}";`
        );
    });
    return "Done!";
}