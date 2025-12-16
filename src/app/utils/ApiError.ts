class ApiError extends Error {
  statusCode: number;
  constructor(statusCode = 500, message = "Something went wrong") {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ApiError;
