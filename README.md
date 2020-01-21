# Employee-Tracker
A node.js CLI application that allows a user to manage a database of employee information

## Table of Contents
List the different sections of your README here.

## Introduction
This node.js application allows the user to manage employee, role, and department information for a business using the command line interface. 

## Technologies Used
* HTML
* CSS
* JavaScript
* Node.js
* NPM Packages
    - mysql
    - express
    - console.table
    - inquirer

## Requirements
* node.js

## Code Examples
The below code snippet shows how the employee tracker allows the user to add new roles to their database.

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

After filling in the name of the role and it's salary, the application queries a mySQL database.

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

Before asking the user which department this new role falls under, our SQL query generates a list of extant departments by pulling from the table of the same name.

Once that response is entered, our application does the following work to assign a department id to the new role.

                ]).then(function(data) {
                    connection.query("SELECT * FROM departments", function(err, res) {
                        for (var i = 0; i < res.length; i++) {
                            if (res[i].name === data.dept) {
                                deptId = res[i].id;
                            }
                        }

Finally, we insert all of our information about the new role into our roles table within our SQL database.

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

## Authors
Ian Toy
* [GitHub](https://github.com/ietoy)
* [LinkedIn](https://www.linkedin.com/in/ian-toy-265077196/)

## Licensure
List any relevant licensing information here if necessary.

## Acknowledgements
Special thanks to our instructor Jerome and especially to our TA Mahisha, who grately helped solidify my understanding of how information is stored and passed between objects and functions. Thanks a bunch!