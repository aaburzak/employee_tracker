INSERT INTO department (name) 
VALUES 
    ('Sales'), 
    ('Engineering'), 
    ('Finanace'), 
    ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('Sales Manager', 80000, 1), 
    ('Sales Represenative', 50000, 1), 
    ('Senior Engineer', 100000, 2), 
    ('Junior Engineer', 70000, 2), 
    ('Account Manager', 80000, 3), 
    ('Accountant', 60000, 3), 
    ('Lawyer', 125000, 4), 
    ('Legal Aide' 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Bruce', 'Springsteen', 1, NULL),
    ('John', 'Mellencamp', 2, 1),
    ('Damon', 'Albarn', 3, NULL),
    ('Norman', 'Cook', 4, 3),
    ('Janis', 'Joplin', 5, NULL),
    ('Tom', 'Petty', 6, 5),
    ('Stevie', 'Nicks', 7, NULL),
    ('George', 'Harrison', 8, 7);
