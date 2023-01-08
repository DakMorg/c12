const inquirer = require("inquirer");
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



function runSite() {
    inquirer
        .prompt({
            name: "name",
            message: "choose an option.",
            type: "list",
            choices: [
                "Add department",
                "Add role",
                "Add employee",
                "View departments",
                "View roles",
                "View employees",
                "Update employee role",
                "EXIT"]
        })

        .then((task) => {

            switch (task) {
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "View departments":
                    viewDepartment();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                case "EXIT":
                    EXIT();
            }
        })

        .catch((error) => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
                console.log("oof, that didnt work.");
            } else {
                // Something else went wrong
                console.log("Yo chill, its not working.");
            }
        });
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "Please enter Department name.",
        name: "departmentName"
    }).then(function (userInput) {
        connection.query("INSERT INTO department (name) VALUES (?)",
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
                [userInput.department_id, userInput.title, userInput.salary],
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