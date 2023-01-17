require('dotenv').config();
const db = require('mysql2');
const { createUsersTable, createProductsTable } = require('./migrations');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, HOST } = process.env;

const config = {
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  host: HOST,
};

class Connection {
  connection;
  constructor(config) {
    this.connection = db.createConnection(config);
  }
  checkConnection() {
    const promise = new Promise((res, rej) => {
      this.connection.connect((error) => {
        if (error) {
          error.from = 'database';
          rej(error);
        } else {
          res(this.connection);
        }
      });
    });
    return promise;
  }
  createTable(table) {
    return new Promise((res, rej) => {
      try {
        this.connection.query(table, (error) => {
          if (error) {
            rej(error);
          } else {
            res();
          }
        });
      } catch (error) {
        error.form = 'database';
        rej(error);
      }
    });
  }
}
const setDataBase = async () => {
  return new Promise(async (res, rej) => {
    try {
      const conn = new Connection(config);
      await conn.checkConnection();
      await conn.createTable(createUsersTable);
      await conn.createTable(createProductsTable);
      res(conn.connection);
    } catch (error) {
      rej(error);
    }
  });
};

module.exports = () => {
  return setDataBase();
};
