DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;
USE employeesDB;

CREATE TABLE departments (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (id)
);


CREATE TABLE roles (
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    salary DECIMAL(8, 2),
    department_id INT(11),
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) references departments(id)
);


CREATE TABLE employees (
    id INT(11) NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT(11),
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) references roles(id)
);
