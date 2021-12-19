const ApiError = require("../errors/ApiError");
const httpStatus = require("http-status");

const idChecker = (req, res, next) => {
  if (!req?.params?.id?.match(/^[0-9a-fA-F]{24}$/)) {
    next(new ApiError("Lütfen geçerli bir ID bilgisi giriniz", httpStatus.BAD_REQUEST));
    return;
  }
  next();
};

module.exports = idChecker;
