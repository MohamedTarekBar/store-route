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
        description varchar(255) NOT NULL,
        price numeric(10,2) NOT NULL
    );
`;
const createUserProductsTable = `
    CREATE TABLE IF NOT EXISTS user_products (
        id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
        product_id int NOT NULL,
        user_id int NOT NULL,
        CONSTRAINT \`fk_product_id\`
        FOREIGN KEY (product_id) REFERENCES products (id),
        CONSTRAINT \`fk_user_id\`
        FOREIGN KEY (user_id) REFERENCES users (id)
    );
`;

module.exports = {
  createProductsTable,
  createUsersTable,
  createUserProductsTable,
};
