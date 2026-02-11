module.exports = function errorHandler(err, req, res, next) {
  console.error("[GLOBAL ERROR HANDLER]", err.stack || err.message || err);

  res.status(500).json({
    error: "Internal server error",
    debug: err.message
  });
};
