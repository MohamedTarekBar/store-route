const errorMiddleware = (err, req, res, next) => {
  if (err.from != undefined) {
    console.log('error on ' + err.from);
    console.log(err.message);
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: 'please contact adminstrator',
    });
  }
  const status = err.status || 500;
  const message = err.message || 'whoops something went wrong';
  return res.status(status).json({
    status,
    message,
  });
};

module.exports = errorMiddleware;
