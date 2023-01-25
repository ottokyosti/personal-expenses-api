CREATE TABLE expenses(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date DATE DEFAULT NULL,
    amount DECIMAL(8,2) DEFAULT NULL,
    shop VARCHAR(255) DEFAULT NULL,
    category VARCHAR(255) DEFAULT NULL
);



START TRANSACTION;
INSERT INTO expenses
    VALUES (NULL, '2023-01-02', 123.45, 'Prisma', 'Ruoka');
INSERT INTO expenses
    VALUES (NULL, '2023-01-03', 121.01, 'Prisma', 'Viihde');
INSERT INTO expenses
    VALUES (NULL, '2023-01-04', 100.82, 'Verkkokauppa', 'Elektroniikka');
SELECT * FROM expenses;
COMMIT;