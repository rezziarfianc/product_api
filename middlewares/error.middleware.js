const errorHandler = (err, req, res, next) => {
  // console.error(err.stack);

  res.status(err.code || 500).json({
    success: false,
    code: err.code || 500,
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;