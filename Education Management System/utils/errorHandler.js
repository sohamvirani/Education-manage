const errorMiddleware = (error, req, res, next) => {
  console.error('Error stack:', error.stack);
  res.status(error.statusCode || 500).json({
      message: error.message || 'An unexpected error occurred',
  });
};

module.exports = errorMiddleware;
