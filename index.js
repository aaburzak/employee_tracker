require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2");

//connects to employee database
const connect = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "employeeDB",
  },
  console.log("Connected to employeeDB")
);

//initiates the application and calls the menu function
function init() {
  menu();
}

//displays menu options for user to select then calls on next function based on user selection
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
          "Add A Role",
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
      } else if (userChoice === "Add A Role"){
        addRole();
      } else if (userChoice === "Add An Employee"){
        addEmployee();
      } else if (userChoice === "Update An Employee Role"){
        updateRole();
      } else {
        process.exit();
      }
    });
}

//displays all departments
const viewDepartment = () => {
  connect.query("SELECT * FROM department;", (err, results) => {
    console.table(results);
    menu();
  });
};

//displays all roles and corresponding salaries and departments
const viewRole = () => {
  connect.query("SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary FROM role JOIN department ON role.department_id = department.id ORDER BY id;", (err, results) => {
    console.table(results);
    menu();
  });
};

//displays all employees, their respective roles, departments, salaries, managers and ids
const viewEmployee = () => {
  connect.query("SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(M.first_name, ' ', M.last_name) AS manager FROM employee E LEFT JOIN role ON E.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee M ON E.manager_id = M.id;  ", (err, results) => {
    console.table(results);
    menu();
  });
};

//allows the user to add a new department to the database
const addDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the new department:'
    }])
    .then (name => {
        connect.promise().query("INSERT INTO department SET ?", name);
        viewDepartment();
    })
}

//allows the user to add a new role to the database
const addRole = () => {
    return connect.promise().query(
        "SELECT department.id, department.name FROM department;"
    )
        .then(([departments]) => {
            let departmentChoices = departments.map(({
                id,
                name
            }) => ({
                name: name,
                value: id
            }));
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Please enter the title of the new role:'
                },
                {
                    type:'list',
                    name: 'department',
                    message:'Which department is the new role in?',
                    choices: departmentChoices
                },
                {
                    type:'input',
                    name: 'salary',
                    message: 'What is the new roles salary?'
                }
        ])
            .then (({title, department, salary}) => {
                const query = connect.query(
                    'INSERT INTO role SET ?',
                    {
                        title: title,
                        department_id: department,
                        salary: salary
                    },
                    function (err, res){
                        if (err) throw err;
                    }
                )
            })
            .then(() => viewRole())
        })
}

//allows the user to add an employee to the database
const addEmployee = (roles) => {
    return connect.promise().query(
        'SELECT id, title FROM role;'
    )
        .then(([employees]) => {
            let titleChoices = employees.map(({
                id,
                title
            }) => ({
                value: id,
                name: title
            }))
            connect.promise().query(
                "SELECT M.id, CONCAT(M.first_name, ' ',M.last_name) AS manager FROM employee M;"
            )
            .then(([managers]) => {
                let managerChoices = managers.map(({
                    id,
                    manager
                }) => ({
                    value: id,
                    name: manager
                }));
                inquirer.prompt(
                    [
                        {
                            type: 'input',
                            name: 'firstName',
                            message: "Please enter the new employee's first name:"
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: "Please enter the new employee's last name:"
                        },
                        {
                            type:'list',
                            name: 'role',
                            message: "Please select the new employee's role:",
                            choices: titleChoices
                        },
                        {
                            type: 'list',
                            name: 'manager',
                            message: "Please select the employee's manager:",
                            choices: managerChoices
                        }
                    ]
                )
                .then(({firstName, lastName, role, manager}) => {
                    const query = connect.query(
                        'INSERT INTO employee SET ?',
                        {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: role,
                            manager_id: manager
                        },
                        function (err, res){
                            if (err) throw err;
                            console.log({ role, manager})
                        }
                    )
                })
                .then(() => viewEmployee())
            })
        })
}

//allows the user to edit a role within the database
const updateRole = () => {
    return connect.promise().query(
        'SELECT id, title FROM role;'
    )
    .then(([roles]) => {
        let roleChoices = roles.map(({
            id,
            title
        }) => (
            {
                value: id,
                name: title
            }
        ));
        inquirer.prompt(
            [
                {
                    type: 'list',
                    name: 'role',
                    message: 'Please select a role to update:',
                    choices: roleChoices
                }
            ]
        )
        .then(role => {
            inquirer.prompt(
                [
                    {
                        type: 'input',
                        name: 'title',
                        message: "Please enter the updated title of the role",
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Please enter the updated salary of the role'
                    }
                ]
            )
            .then(({ title, salary }) => {
                const query = connect.query(
                    'UPDATE role SET title = ?, salary = ? WHERE id = ?',
                    [
                        title,
                        salary,
                        role.role
                    ],
                    function (err, res) {
                        if (err) throw err;
                    }
                )
            })
            .then (() => viewRole())
        })
    })
}

init();