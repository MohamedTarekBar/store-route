const client = require('./database');

const connect = async (query, data) => {
  const promise = new Promise(async (res, rej) => {
    try {
      const connection = await client();
      connection.query(query, data, (error, result) => {
        if (error) {
          error.from = 'database';
          rej(error);
          connection.destroy();
        } else {
          res(result);
          connection.destroy();
        }
      });
    } catch (error) {
      error.from = 'database';
      rej(error);
    }
  });
  return promise;
};

module.exports = connect;
