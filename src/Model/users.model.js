const connect = require('../Database/connect');

class User {
  async getUserById(id) {
    try {
      const getQuery = 'SELECT * FROM users WHERE id=?';
      const result = await connect(getQuery, [id]);
      if (result.length) {
        return result[0];
      } else {
        throw {
          status: 500,
          message: 'no user found with provided id',
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async index() {
    try {
      const query = 'SELECT * FROM users';
      const result = await connect(query);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async create({ name, age, email, password } = {}) {
    try {
      const query = 'INSERT INTO users (name,age,email,password) values (?,?,LOWER(?),?);';
      const result = await connect(query, [name, age, email, password]);
      return await this.getUserById(result.insertId);
    } catch (error) {
      if ((error.errno = 1062)) {
        throw {
          status: 502,
          message: 'email already exist',
        };
      }
      throw error;
    }
  }

  async update({ id, name, age, email, password } = {}) {
    try {
      const query = 'UPDATE users SET name=?,age=?,email=LOWER(?),password=? Where id=?';
      const user = await this.getUserById(id);
      console.log(user);
      const update = await connect(query, [
        name ? name : user.name,
        age ? age : user.age,
        email ? email : user.email,
        password ? password : user.password,
        id,
      ]);
      if (update.affectedRows) {
        return await this.getUserById(id);
      } else {
        throw {
          status: 500,
          message: 'unexpected error failed to update user',
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async delete({ id } = {}) {
    try {
      const user = await this.getUserById(id);
      if (user) {
        const query = 'DELETE FROM users WHERE id=?';
        const result = await connect(query, [id]);
        if (result.affectedRows) {
          return user;
        } else {
          throw {
            status: 500,
            message: 'unexpected error failed to delete user',
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }
  searchByName = async ({ name } = {}) => {
    try {
      const query = 'SELECT id, name, age, email  FROM users WHERE name LIKE ?';
      const users = await connect(query, [name + '%']);
      if (users.length) {
        return users;
      } else {
        throw {
          status: 500,
          message: 'no users found',
        };
      }
    } catch (error) {
      throw error;
    }
  };

  searchByNameAndAge = async ({ name, age } = {}) => {
    try {
      const query = 'SELECT * FROM users WHERE name=? AND age>?';
      const users = await connect(query, [name, age]);
      if (users.length) {
        return users;
      } else {
        throw {
          status: 500,
          message: 'no users found',
        };
      }
    } catch (error) {
      throw error;
    }
  };
  getUsersByIds = async ({ ids } = {}) => {
    try {
      const query = 'SELECT * FROM users WHERE id IN (?)';
      const users = await connect(query, [ids]);
      if (users.length) {
        return users;
      } else {
        throw {
          status: 500,
          message: 'no users found',
        };
      }
    } catch (error) {
      throw error;
    }
  };

  getAllUsersWithProducts = async () => {
    try {
      const query = `SELECT u.email, CONCAT('[',GROUP_CONCAT(JSON_OBJECT("name",p.name,"price",p.price)),']') As products FROM products As p LEFT JOIN users AS u ON u.id = p.created_by GROUP BY u.email`;
      const up = await connect(query);
      if (up.length) {
        const userProduct = up
        return userProduct.map(u => {
          return {
            email: u.email,
            products: JSON.parse(u.products)
          }
        })
      } else {
        throw {
          status: 500,
          message: 'no data found',
        };
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
