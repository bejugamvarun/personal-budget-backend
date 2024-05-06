const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost:3306',
    user: 'root',
    password: 'root',
    database: 'personal-budget-db'
  });

module.exports = pool;