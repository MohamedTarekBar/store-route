const connect = require('../Database/connect');

class User {
    async getUserById(id) {
        try {
            const getQuery = 'SELECT * FROM users WHERE id=?';
            const result = await connect(getQuery,[id]);
            return result[0]
        } catch (error) {
            throw error
        }
    }
    async index () {
        try {
            const query = 'SELECT * FROM users';
            const result = await connect(query);
            return result
        } catch (error) {
            throw error
        }
    }
    
    async create ({name,age,email,password}={}) {
        try {
            const query = 'INSERT INTO users (name,age,email,password) values (?,?,LOWER(?),?);';
            const result = await connect(query,[name,age,email,password]);
            return await this.getUserById(result.insertId)
        } catch (error) {
            if (error.errno = 1062) {
                throw {
                    status: 502,
                    message: 'email already exist'
                }
            }
            throw error
        }
    }

    async update ({id,name,age,email,password}={}) {
        try {
        
            const getQuery = 'SELECT * FROM users WHERE id=?';
            const user = await connect(getQuery,[id]);
            const oldUserData = user
            if (oldUserData.length) {
                if (oldUserData[0].email.trim().toLowerCase() != email.trim().toLowerCase()) {
                    const updateQuery = 'UPDATE users SET name=?, age=?, email=?, password=? WHERE id=?'
                    const result = await connect(updateQuery,[
                        name ? name : oldUserData.name,
                        age? age : oldUserData.age,
                        email? email : oldUserData.email,
                        password? password : oldUserData.password,
                        id
                    ])
                    if (result.affectedRows > 0) {
                       return await this.getUserById(id)
                    } else {
                        throw {
                            status: 500,
                            message: 'failed to update user'
                        }
                    }
                } else {
                    throw {
                        status: 500,
                        message: 'email provided equal the last email please avoid sending fake requests'
                    }
                }
            } else {
                throw {
                    status: 500,
                    message: 'user with id provided not found'
                }
            }
        } catch (error) {
            if (error.errno == 1062) {
                throw {
                    status: 502,
                    message: 'email already in use with diffrent user'
                }
            }
            throw error
        }
    }
}


module.exports = User