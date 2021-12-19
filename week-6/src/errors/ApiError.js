class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.status = statusCode;
  }

  badData(message, statusCode) {}
}

module.exports = ApiError;
