# personal-budget-backend
# Sample User with some data inserted
username: "varun"
password: "password"

---

## Project Setup

This section covers the setup and configuration for managing database migrations using Sequelize in our Node.js application. Sequelize is an ORM that supports easy handling of SQL transactions with JavaScript and supports migrations for database version control.

### Prerequisites

- Node.js installed on your machine.
- MySQL Server running and accessible.
- npm (Node Package Manager) installed.

### Installation

1. **Install Dependencies**

   First, you need to install Sequelize CLI and the necessary MySQL driver. Run the following command in your project directory:

   ```bash
   npm install sequelize sequelize-cli mysql2
   ```

2. **Initialize Sequelize**

   Initialize Sequelize to create the necessary directories and configuration files:

   ```bash
   npx sequelize-cli init
   ```

   This command will create the following structure in your project:

   - `config/`: Contains configuration file `config.json` that tells CLI how to connect with your database.
   - `migrations/`: Contains all migration files.
   - `models/`: Contains all model files.
   - `seeders/`: Contains all seed files.

### Configure Database

Edit the `config/config.json` file to match your database settings. Here's an example configuration for development:

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "personal_budget_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Replace `"username"`, `"password"`, `"database"`, and `"host"` with your actual database credentials.

### Creating Migrations

To create a new migration file, use the Sequelize CLI. Here’s how you can create a migration for a 'Users' table:

```bash
npx sequelize-cli migration:generate --name create-users
```

This command creates a new file in the `migrations/` directory. Edit this file to define your table structure:

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // Add other fields as required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
```

### Running Migrations

To apply migrations to your database, run:

```bash
npx sequelize-cli db:migrate
```

This command will execute the migrations you've defined in your `migrations/` directory, updating your database schema accordingly.

### Reverting Migrations

If you need to revert the last migration, you can do so by running:

```bash
npx sequelize-cli db:migrate:undo
```

To revert all migrations, run:

```bash
npx sequelize-cli db:migrate:undo:all
```

### Conclusion

This setup guide should help you manage your database schema changes using Sequelize. For more advanced configurations and options, refer to the [Sequelize documentation](https://sequelize.org/master/manual/migrations.html).

---