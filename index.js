require("console.table");
const fs = require("fs");
const inquirer = require("inquirer");
const mysql = require("mysql2");

const connect = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employeeDB",
  },
  console.log("Connected to employeeDB")
);

function init() {
  menu();
}

function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "Menu:",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add An Employee",
          "Update An Employee Role",
          "Quit"
        ],
      },
    ])
    .then(({ userChoice }) => {
      if (userChoice === "View All Departments") {
        viewDepartment();
      } else if (userChoice === "View All Roles") {
        viewRole();
      } else if (userChoice === "View All Employees"){
        viewEmployee();
      } else if (userChoice === "View All Employees"){
        viewEmployee();
      } else if (userChoice === "Add A Department"){
        addDepartment();
      } else if (userChoice === "Add An Employee"){
        addEmployee();
      } else if (userChoice === "Update An Employee Role"){
        updateRole();
      } else {
        process.exit();
      }
    });
}

const viewDepartment = () => {
  connect.query("SELECT * FROM department;", (err, results) => {
    console.table(results);
    menu();
  });
};

const viewRole = () => {
  connect.query("SELECT * FROM role;", (err, results) => {
    console.table(results);
    menu();
  });
};

const viewEmployee = () => {
  connect.query("SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(M.first_name, ' ', M.last_name) AS manager FROM employee E LEFT JOIN role ON E.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee M ON E.manager_id = M.id;  ", (err, results) => {
    console.table(results);
    menu();
  });
};

init();