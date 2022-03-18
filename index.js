require('console.table');
const fs = require('fs');
const inquirer = require ('inquirer');
const mysql = require ('mysql2');

const connectDB = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeDB'
    },
    console.log('Connected to employeeDB')
);

function menu(){
    inquirer.prompt([
            {
                type: "list",
                name: "userMenu",
                message:"Menu:",
                choices: [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees"
                ]
            },
        ])
        .then(({userMenu}) => {
            if (userMenu === "View All Departments"){
                viewDepartment()
            } else if (role === "View All Roles") {
                viewRole()
            } else {
                viewEmployee()
            }
        })
}

const viewDepartment = () => {
    connectDB.query(
        'SELECT * FROM department;',
        (err, results) => {
            console.table(results);
            menu();
        }
    )
};

const viewRole = () => {
    connectDB.query(
        'SELECT * FROM role;',
        (err, results) => {
            console.table(results);
            menu();
        }
    )
};

const viewEmployee = () => {
    connectDB.query(
        'SELECT * FROM employee;',
        (err, results) => {
            console.table(results);
            menu();
        }
    )
};

menu ();