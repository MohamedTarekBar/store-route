require('dotenv').config()
const db = require('mysql2');
const { createUsersTable, createProductsTable } = require('./migrations');

const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    HOST
} = process.env

const config = {
    database : DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    host: HOST
}

module.exports = async () => {
    const promise = new Promise((res,rej)=>{
        const connection  = db.createConnection(config);
        connection.connect((error)=>{
            if (error != null) {
                error.from = 'database'
                rej(error)
            }
            rej(error)
        })
        connection.query(createUsersTable,error=>{
            if (error) {
                error.from = 'database'
                rej(error)
            }
        })
        connection.query(createProductsTable,error=>{
            if (error) {
                error.from = 'database'
                rej(error)
            }
        })
        res(connection)
    })
    return promise
};