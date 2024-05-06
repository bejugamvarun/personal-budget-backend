const pool = require('./dbConfig');

const createDatabaseSQL = 'CREATE DATABASE IF NOT EXISTS personal_budget_db;';
const useDatabaseSQL = 'USE personal_budget_db;';

const migrations = [
    `CREATE TABLE IF NOT EXISTS Users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        reset_token VARCHAR(255)
    );`,
    `CREATE TABLE IF NOT EXISTS Month (
        month_id INT AUTO_INCREMENT PRIMARY KEY,
        month VARCHAR(50) UNIQUE NOT NULL
    );`,
    `CREATE TABLE IF NOT EXISTS Budgets (
        budget_id INT AUTO_INCREMENT PRIMARY KEY,
        month_id INT,
        user_id INT,
        budget_criteria VARCHAR(100),
        amount DECIMAL(10, 2),
        FOREIGN KEY (month_id) REFERENCES Month(month_id),
        FOREIGN KEY (user_id) REFERENCES Users(user_id)
    );`,
    `CREATE TABLE IF NOT EXISTS Expenses (
        expense_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        month_id INT,
        budget_criteria_id INT,
        spent_amount DECIMAL(10, 2),
        FOREIGN KEY (user_id) REFERENCES Users(user_id),
        FOREIGN KEY (month_id) REFERENCES Month(month_id),
        FOREIGN KEY (budget_criteria_id) REFERENCES Budgets(budget_id)
    );`
];

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    // Create the database and set it for use
    connection.query(createDatabaseSQL, (err, result) => {
        if (err) {
            console.error('Error creating database:', err);
            connection.release();
            return;
        }
        console.log('Database created or already exists.');

        // Set the database for use
        connection.query(useDatabaseSQL, (err, result) => {
            if (err) {
                console.error('Error setting database:', err);
                connection.release();
                return;
            }
            console.log('Database set.');

            // Execute all migrations
            migrations.forEach((migration, index) => {
                connection.query(migration, (err, result) => {
                    if (err) {
                        console.error(`Migration ${index + 1} failed:`, err);
                    } else {
                        console.log(`Migration ${index + 1} succeeded:`, result);
                    }
                    if (index === migrations.length - 1) {
                        connection.release();
                    }
                });
            });
        });
    });
});
