const express = require("express");
const { createNewToken, verifyToken } = require("../middleware/tokenAuth");
const path = require("path");
const fs = require("fs");
const router = express.Router();

let reqPath = path.join(__dirname, "../");
const logFile = fs.createWriteStream(reqPath + "/log/history.log", {
  flags: "a",
});

const {
  getUser,
  getAllUsers,
  insertUser,
  updateUser,
  patchUser,
  deleteUser,
} = require("../controller/UserController");

//token is checked via this method
function verifyAuthentication(req, res, next) {
  const token = req.body.token || req.header("Authorization");
  let keepGoing = false;
  let isTokenValid = verifyToken(token);

  if (isTokenValid.status == 0) {
    req.userData = isTokenValid.data;
    keepGoing = true;
  } else if (isTokenValid.status == 1) {
    res.status(401).json({
      success: false,
      status: 401,
      message: "There is no token dude!",
    });
  } else if (isTokenValid.status == 2) {
    res.status(403).json({
      success: false,
      status: 403,
      message: "Invalid token, is this a DDOS attack or something else?",
    });
  }

  if (keepGoing) return next();
}

//to create token, this method is used
router.post("/create-token", (req, res) => {
  const date = new Date().toString(); //to log date in log file
  let tokenID = req.body.id || req.body.tokenID;

  if (!tokenID) {
    logFile.write(
      `\n"At ${date}: a ${req.method} method is sent to http://127.0.0.1:3000/users${req.url} URL which has RawHeaders: ${req.rawHeaders}",`
    );
    res.status(400).json({
      success: false,
      status: 400,
      message: "You have to add an id!",
    });
    return;
  }

  //new token is created
  let token = createNewToken(tokenID);
  logFile.write(
    `\n"At ${date}: a ${req.method} method is sent to http://127.0.0.1:3000/users${req.url} URL which has RawHeaders: ${req.rawHeaders}",`
  );
  res.status(201).json({
    success: true,
    status: 201,
    token: token,
  });
});

router.get("/", getAllUsers); //only this route public
router.get("/:id", verifyAuthentication, getUser);
router.post("/", verifyAuthentication, insertUser);
router.put("/:id", verifyAuthentication, updateUser);
router.patch("/:id", verifyAuthentication, patchUser);
router.delete("/:id", verifyAuthentication, deleteUser);

module.exports = router;
