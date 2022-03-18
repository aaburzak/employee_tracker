require('console.table');
const fs = require('fs');
const inquirer = require ('inquirer');
const mysql = require ('mysql2');

const employee_DataBase = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeeDB'
    },
    console.log('Connected to employeeDB')
);

menu ()

function menu(){
    inquirer.prompt([
        {
            name: 'menu',
            type: 'list',
            message: 'MENU:',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Quit']
        }
    ])
    .then(({menuChoice}) => {
        if(menuChoice === 'View All Departments' ){
            selectDepartment()
        } else if (menuChoice === 'View All Roles'){
            selectRole()
        } else if (menuChoice === 'View All Employees'){
            selectEmployee()
        } else if (menuChoice === 'Add A Department'){
            addDepartment()
        } else if (menuChoice === 'Add A Role'){
            addRole()
        } else if (menuChoice === 'Add An Employee'){
            addEmployee()
        } else if (menuChoice === 'Update An Employee Role'){
            updateRole ()
        } else {
            process.exit();
        }
    })
}