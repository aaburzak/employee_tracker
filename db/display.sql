SELECT * FROM department;

SELECT role.id AS id, role.title AS title, department.name AS department, role.salary AS salary
FROM role
JOIN department ON role.department_id = department.role_id
ORDER BY id;

SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(M.first_name, ' ', M.last_name) AS manager
FROM employee E
LEFT JOIN role ON E.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee M ON E.manaer_id = M.id;