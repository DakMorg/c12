use employees;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Inside Stock'),
    ('Outside Stock'),
    ('Store Management');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Materials Sales', 40000, 1),
    ('Cashier', 25000, 1),
    ('Hardware', 30000, 2),
    ('Plumbing', 30000, 2),
    ('Forklift Certified', 40000, 3),
    ('Walking Broom', 10000, 3),
    ('Assistant Manager', 80000, 4),
    ('General Manager', 120000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('SalesFirst', 'SalesLast', 1, NULL),
    ('OtherSalesFirst', 'OtherSalesLast', 1, NULL),
    ('Stock1First', 'Stock1Last', 2, NULL),
    ('Stock2First', 'Stock2Last', 3, NULL),
    ('Stock3First', 'Stock3Last', 3, NULL),
    ('Magic', 'Broom', 3, NULL),
    ('LittleBossFirst', 'LittleBossLast', 4, 1),
    ('BigBossFirst', 'BigBossLast', 4, 2);
