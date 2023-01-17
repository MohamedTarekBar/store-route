const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name varchar(50) NOT NULL,
        age int NOT NULL,
        email varchar(100) NOT NULL UNIQUE,
        password varchar(255) NOT NULL
    );
`;

const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
        id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
        name varchar(50) NOT NULL,
        description varchar(255),
        price numeric(10,2) NOT NULL,
        created_by int NOT NULL,
        CONSTRAINT \`fk_created_by\`
        FOREIGN KEY (created_by) REFERENCES users(id)
    );
`;

module.exports = {
  createProductsTable,
  createUsersTable,
};
