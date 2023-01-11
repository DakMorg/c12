const inquirer = require("inquirer");
const { prompt } = require("inquirer");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Zizcvb765",
    database: "employeesdb"

},);

connection.connect(function (err) {
    if (err) throw err;
    runSite();
});

//////////
/* function init() {
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);

    runSite();
} */

function runSite() {

    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Please choose an option.',
            choices: [
                {
                    name: 'Add department',
                    value: 'ADD_DEPARTMENT'
                },

                {
                    name: 'Add role',
                    value: 'ADD_ROLE'
                },

                {
                    name: 'Add employee',
                    value: 'ADD_EMPLOYEE'
                },

                {
                    name: 'View departments',
                    value: 'VIEW_DEPARTMENTS'
                },

                {
                    name: 'View roles',
                    value: 'VIEW_ROLES'
                },

                {
                    name: 'View employees',
                    value: 'VIEW_EMPLOYEES'
                },

                {
                    name: 'Update employee role',
                    value: 'UPDATE_EMPLOYEES'
                },

                {
                    name: 'EXIT',
                    value: 'EXIT'
                }
            ]
        }
    ]).then(res => {
        let choice = res.choice;

        switch (choice) {
            case "ADD_DEPARTMENT":
                addDepartment();
                break;
            case "ADD_ROLE":
                addRole();
                break;
            case "ADD_EMPLOYEE":
                addEmployee();
                break;
            case "VIEW_DEPARTMENTS":
                viewDepartment();
                break;
            case "VIEW_ROLES":
                viewRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewEmployees();
                break;
            case "UPDATE_EMPLOYEES":
                updateEmployee();
                break;
            case "EXIT":
                EXIT();
        }
    }
    )
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "Please enter Department name.",
        name: "departmentName"
    }).then(function (userInput) {
        connection.query("INSERT INTO department (title) VALUES (?)",
            [userInput.departmentName],
            function (err, res) {
                if (err) throw err;
                console.table(res)
                runSite()
            })
    })
}


function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter department ID.",
                name: "department_id"
            },
            {
                type: "input",
                message: "Please enter Role name.",
                name: "title"
            },
            {
                type: "input",
                message: "Please enter role Salary.",
                name: "salary"
            }
        ])
        .then(function (userInput) {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
                [userInput.title, userInput.salary, userInput.department_id],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    runSite();
                });
        });
}



function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter employee's first name.",
                name: "first_name"
            },
            {
                type: "input",
                message: "Please enter employee's last name.",
                name: "last_name"
            },
            {
                type: "input",
                message: "Please enter employee's role ID.",
                name: "role_id"
            },
            {
                type: "input",
                message: "Please enter managers ID.",
                name: "manager_id"
            }
        ])
        .then(function (userInput) {
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                [userInput.first_name, userInput.last_name, userInput.role_id, userInput.manager_id],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    runSite();
                });
        });
}

function updateEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which employee would you like to update?",
                name: "update"
            },

            {
                type: "input",
                message: "What do you want to update to?",
                name: "updateRole"
            }
        ])
        .then(function (userInput) {
            connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',
                [userInput.updateRole, userInput.update], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    runSite();
                });
        });
}

function viewDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSite();
    });
}

function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSite();
    });
}

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSite();
    });
}

function EXIT() {
    connection.end();
    process.exit();
}