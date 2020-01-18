INSERT INTO departments (name)
VALUES  ("Development"),
        ("Administrative"),
        ("Billing/Customer Service"),
        ("Marketing");

-- re-add deptID once we figure out how to tie it with the dept id table
INSERT INTO roles (title, salary, department_id)
VALUES  ("Customer Service Representative", 60000, 3),
        ("Accountant", 80000, 3),
        ("Receptionist", 40000, 2),
        ("Mail Clerk", 35000, 2),
        ("Game Developer", 100000, 1),
        ("Marketing Agent", 75000, 4);

INSERT INTO employees (first_name, last_name, role_id)
VALUES  ("Ian", "Toy", 5),
        ("Tommy", "Townsend", 6),
        ("Jeremy", "West", 1);

