const jwt = require("jsonwebtoken");

const SECRET_KEY = "VERY_SECRET_TOKEN_KEY";
const BEARER = "Bearer ";

const VALID_TOKEN = 0;
const MISSING_TOKEN = 1;
const INVALID_TOKEN = 2;

//token is created
const createNewToken = (id) => {
  let token = jwt.sign({ uniqueId: id }, SECRET_KEY, { expiresIn: "8h" });
  return BEARER + token;
};

const verifyToken = (token) => {
  let finalKey = {
    status: null,
    data: null,
  };

  if (!token) {
    finalKey.status = MISSING_TOKEN;
  } else {
    try {
      if (!token.startsWith(BEARER))
        throw new Error("This is not a bearer token!");
      let payload = token.substring(BEARER.length);
      const decoded = jwt.verify(payload, SECRET_KEY);
      finalKey.status = VALID_TOKEN;
      finalKey.data = decoded;
    } catch (err) {
      finalKey.status = INVALID_TOKEN;
    }
  }

  return finalKey;
};

module.exports = {
  createNewToken,
  verifyToken,
};
