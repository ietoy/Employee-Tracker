var mysql = require("mysql");
var inquirer = require("inquirer");
var express = require("express");
// var exphbs = require("express-handlebars");
var cTable = require("console.table");

var app = express();


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "applebeaver",
    database: "employeesDB"
  });
  connection.connect(function(err) {
    if (err) throw err;
    initialPrompt();
  });

function initialPrompt() {
    inquirer.prompt({
        name: "userchoice",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add a department.",
            "Add roles.",
            "Add employees.",
            "View departments.",
            "View roles.",
            "View employees.",
            // "Update employee information.",
            // bonus functionality
            // "Update employee managers.",
            // "View employees by manager.",
            // "Delete departments.",
            // "Delete roles",
            // "Remove employees",
            // "View department budget totals"

        ]
    }).then(function(data) {
        switch (data.userchoice) {
            case "Add a department.":
                addDept();
                break;
            case "Add roles.":
                addRole();
                break;
            case "Add employees.":
                addEmployee();
                break;
        
            case "View departments.":
                viewDepts();
                break;
            case "View roles.":
                viewRoles();
                break;
            case "View employees.":
                viewEmployees();
                break;
        
            // case "Update employee information.":
            //     console.log(data.userchoice);
            //     // viewEmployeeInfo fx goes here
            //     break;
        }
    })
};

function addDept() {
    inquirer.prompt([
        {
            name: "newdept",
            type: "input",
            message: "What is the name of this new department?"
        }
    ]).then(function(data) {
        connection.query("INSERT INTO departments SET ?", { name: data.newdept }, function(err) {
            if (err) throw err;
            // connection.end();
            initialPrompt();
        });
        
    })
};

function addRole() {
    inquirer.prompt([
        {
            name: "newrole",
            type: "input",
            message: "What is the name of this new role?"
        },
        {
            name: "newsalary",
            type: "input",
            message: "What is the salary for this new role?"
        },
    ]).then(function(data) {

        var newTitle = data.newrole;
        var newSalary = data.newsalary;
        var deptId;

        connection.query("SELECT * FROM departments", function(err, results) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "dept",
                    type: "rawlist",
                    choices: function() {
                        var deptList = [];
                        for (var i = 0; i < results.length; i++) {
                            deptList.push(results[i].name);
                        }
                        return deptList;
                    },
                    message: "To which department does this role belong?"
                }
            ]).then(function(data) {

                connection.query("SELECT * FROM departments", function(err, res) {
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].name === data.dept) {
                            deptId = res[i].id;
                        }
                    }

                    connection.query("INSERT INTO roles SET ?", 
                    {
                        title: newTitle,
                        salary: newSalary,
                        department_id: deptId
                    },
                    function(err) {
                        if (err) throw err;
                    });
                    initialPrompt();
                // END connection.query TO SET deptId B/O department RESPONSE
                })
            // END .then RESPONSE TO department INFO
            })
        // END FOLLOW UP connection.query TO OBTAIN department INFO
        })
    // END .then RESPONSE TO INITIAL inquirer.prompt
    })
// END addRole()
};

function addEmployee() {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastname",
            type: "input",
            message: "What is the employee's last name?"
        }
    ]).then(function(data) {

        var firstName = data.firstname;
        var lastName = data.lastname;
        var roleId;

        connection.query("SELECT * FROM roles", function(err, results) {
            if (err) throw err;
            inquirer.prompt([
                {
                    name: "role",
                    type: "rawlist",
                    choices: function() {
                        var roleList = [];
                        for (var i = 0; i < results.length; i++) {
                            roleList.push(results[i].title)
                        }
                        return roleList;
                    },
                    message: "What is this new employee's role?"
                }
            ]).then(function(data) {

                connection.query("SELECT * FROM roles", function(err, res) {
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].title === data.role) {
                            roleId = res[i].id;
                        }
                    }

                    connection.query("INSERT INTO employees SET ?", 
                    {
                        first_name: firstName,
                        last_name: lastName,
                        role_id: roleId
                    },
                    function(err) {
                        if (err) throw err;
                    });
                    initialPrompt();
                })
            })
        })
    });
};

function viewDepts() {
    connection.query("SELECT * FROM departments", function(err, res) {
        if (err) throw err;
        console.table(res);
        initialPrompt();
    });
    
};

function viewRoles() {
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        console.table(res);
        initialPrompt();
    });
};

function viewEmployees() {
    var query = "SELECT employees.id, employees.first_name, employees.last_name, employees.role_id ";
    query += "FROM employees LEFT JOIN roles ON (employees.role_id = roles.id)";
    connection.query(query, function(err, res) {



        if (err) throw err;
        console.table(res);
        initialPrompt();
    })
};

// function changeEmployeeInfo() {};

