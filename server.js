var mysql = require("mysql");
var inquirer = require("inquirer");
var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

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
            "Update employee information."
        ]
    }).then(function(data) {
        switch (data.userchoice) {
            case "Add a department.":
                console.log(data.userchoice);
                // addDept fx goes here
                break;

            case "Add roles.":
                console.log(data.userchoice);
                // addRoles fx goes here
                break;
            
            case "Add employees.":
                console.log(data.userchoice);
                // addEmployees fx goes here
                break;
        
            case "View departments.":
            console.log(data.userchoice);
            // viewDept fx goes here
            break;
        
            case "View roles.":
            console.log(data.userchoice);
            // viewRoles fx goes here
            break;
        
            case "View employees.":
            console.log(data.userchoice);
            // viewEmployees fx goes here
            break;
        
            case "Update employee information.":
            console.log(data.userchoice);
            // viewEmployeeInfo fx goes here
            break;
            

        }
    })
};

initialPrompt();