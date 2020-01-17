DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;
USE employeesDB;

CREATE TABLE department (
    id INT(11) NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT(11) NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(5,2),
    department_id INT(11) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT(11) NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT(11) NOT NULL,
    manager_id INT(11) NOT NULL,
    PRIMARY KEY (id)
);