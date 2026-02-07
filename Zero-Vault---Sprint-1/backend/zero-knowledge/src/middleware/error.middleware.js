module.exports = function errorHandler(err, req, res, next) {
  console.error("Error occurred:", err.message);

  res.status(500).json({
    error: "Internal server error",
  });
};
