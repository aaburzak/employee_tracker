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
