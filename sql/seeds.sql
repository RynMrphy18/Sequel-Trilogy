USE employeesDB;

-- beginning data for departments, roles, and employees that can be seen at the beginning using the view___() functions

INSERT INTO department (name)
VALUES ("Sales");
INSERT INTO department (name)
VALUES ("R&D");
INSERT INTO department (name)
VALUES ("Accounting");
INSERT INTO department (name)
VALUES ("Custodial");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesman", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Assistant", 55000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Researcher", 90000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Assistant", 60000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 75000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Intern", 35000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Janitor", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Pratt", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Donald", "Glover", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Richards", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Chris", "Evans", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Scar", "Jo", 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Samuel L", "Jackson", 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Guillermo", "Del Toro", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Nigel", "Thornberry", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Guy", "Fieri", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("My", "Mom", 3, null);
