require('console.table');
const fs = require('fs');
const inquirer = require ('inquirer');
const mysql = require ('mysql2');

const connect = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeDB'
    },
    console.log('Connected to employeeDB')
);

async function init(){
    await menu();
};

function menu(){
    inquirer.prompt([
            {
                type: "list",
                name: "userChoice",
                message:"Menu:",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees"
                ]
            },
        ])
        .then(({userChoice}) => {
            if (userChoice === "View All Departments"){
                viewDepartment()
            } else if (role === "View All Roles") {
                viewRole()
            } else {
                viewEmployee()
            }
        })
}

const viewDepartment = () => {
    connect.query(
        'SELECT * FROM department;',
        (err, results) => {
            console.table(results);
            menu();
        }
    )
};

const viewRole = () => {
    connect.query(
        'SELECT * FROM role;',
        (err, results) => {
            console.table(results);
            menu();
        }
    )
};

const viewEmployee = () => {
    connect.query(
        'SELECT * FROM employee;',
        (err, results) => {
            console.table(results);
            menu();
        }
    )
};

init();