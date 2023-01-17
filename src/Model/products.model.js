const connect = require('../Database/connect');
class Product {
  async getProductById(id) {
    try {
      const getQuery = 'SELECT * FROM products WHERE id=?';
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
      const query = 'SELECT * FROM products';
      const result = await connect(query);
      return result;
    } catch (error) {
      throw error;
    }
  }
  create = async ({ name, description, price, created_by } = {}) => {
    try {
      const query = 'INSERT INTO products (name,description,price,created_by) values (?,?,?,?)';
      const result = await connect(query, [name, description, price, created_by]);
      return await this.getUserById(result.insertId);
    } catch (error) {
      throw error;
    }
  };
  async update({ id, name, description, price, created_by } = {}) {
    try {
      const query = 'UPDATE products SET name=?,description=?,price=? Where id=? AND created_by=?';
      const product = await this.getProductById(id);
      const update = await connect(query, [
        name ? name : product.name,
        description ? description : product.description,
        price ? price : product.price,
        id,
        created_by,
      ]);
      if (update.affectedRows) {
        return await this.getProductById(id);
      } else {
        throw {
          status: 500,
          message: 'unexpected error failed to update product',
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async delete({ id, createdBy } = {}) {
    try {
      const product = await this.getProductById(id);
      if (product) {
        const query = 'DELETE FROM products WHERE id=? AND created_by=?';
        const result = await connect(query, [id, createdBy]);
        if (result.affectedRows) {
          return product;
        } else {
          throw {
            status: 500,
            message: 'unexpected error failed to delete products',
          };
        }
      }
    } catch (error) {
      throw error;
    }
  }

  filterByPrice = async ({ price } = {}) => {
    try {
      const query = 'SELECT * FROM products WHERE price>?';
      const products = await connect(query, [price]);
      if (products.length) {
        return products;
      } else {
        throw {
          status: 500,
          message: 'no products found',
        };
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = Product