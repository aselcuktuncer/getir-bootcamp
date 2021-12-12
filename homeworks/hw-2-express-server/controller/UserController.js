const db = require("../database/lotr");
const fs = require("fs"); //file system module
const path = require("path");

let reqPath = path.join(__dirname, "../");
const logFile = fs.createWriteStream(reqPath + "/log/history.log", {
  flags: "a",
}); //for logging

const users = db;

//user is fetched by id
const getUser = (req, res) => {
  const date = new Date().toString(); //to log date in log file
  const requestedID = req.params.id;
  const foundUser = users.find((user) => requestedID == user.id);
  //writing file
  logFile.write(
    `\n"At ${date}: a ${req.method} method is sent to http://127.0.0.1:3000/users${req.url} URL which has RawHeaders: ${req.rawHeaders}",`
  );
  if (foundUser) return res.status(200).json(foundUser);
  else return res.status(404).send(`User with ${requestedID} is not found!`);
};

//fetching all users
const getAllUsers = (req, res) => {
  const date = new Date().toString(); //to log date in log file
  logFile.write(
    `\n"At ${date}: a ${req.method} method is sent to http://127.0.0.1:3000/users${req.url} URL which has RawHeaders: ${req.rawHeaders}",`
  );
  res.status(200).json(users);
};

//adding new user
const insertUser = (req, res) => {
  const body = req.body;
  let lastID = users[users.length - 1].id;
  const newUser = {
    id: lastID + 1,
    name: body.name,
    city: body.city,
    job: body.job,
  };
  db.push(newUser);
  const date = new Date().toString(); //to log date in log file
  logFile.write(
    `\n"At ${date}: a ${req.method} method is sent to http://127.0.0.1:3000/users${req.url} URL which has RawHeaders: ${req.rawHeaders}",`
  );
  res.status(200).send(newUser);
};

//updating user by id
const updateUser = (req, res) => {
  const updatedUser = req.body;
  const requestedID = req.params.id;
  const foundUser = users.find((user) => requestedID == user.id);

  if (foundUser) {
    foundUser.name = updatedUser.name || foundUser.name;
    foundUser.city = updatedUser.city || foundUser.city;
    foundUser.job = updatedUser.job || foundUser.job;
  }
  const date = new Date().toString(); //to log date in log file
  logFile.write(
    `\n"At ${date}: a ${req.method} method is sent to http://127.0.0.1:3000/users${req.url} URL which has RawHeaders: ${req.rawHeaders}",`
  );
  res.status(200).send(foundUser);
};

//pathcing user by id
const patchUser = (req, res) => {
  const updatedUser = req.body;
  const requestedID = req.params.id;
  const foundUser = users.find((user) => requestedID == user.id);

  if (foundUser) {
    foundUser.name = updatedUser.name || foundUser.name;
    foundUser.city = updatedUser.city || foundUser.city;
    foundUser.job = updatedUser.job || foundUser.job;
  }
  const date = new Date().toString(); //to log date in log file
  logFile.write(
    `\n"At ${date}: a ${req.method} method is sent to http://127.0.0.1:3000/users${req.url} URL which has RawHeaders: ${req.rawHeaders}",`
  );
  res.status(200).send(foundUser);
};

//deleting user by id
const deleteUser = (req, res) => {
  const requestedID = req.params.id;

  let i = users.findIndex((user) => user.id == requestedID);
  const deleted = users.splice(
    users.findIndex((user) => user.id == requestedID),
    1
  );
  const date = new Date().toString(); //to log date in log file
  logFile.write(
    `\n"At ${date}: a ${req.method} method is sent to http://127.0.0.1:3000/users${req.url} URL which has RawHeaders: ${req.rawHeaders}",`
  );
  return res.status(200).json(deleted);
};

module.exports = {
  getUser,
  getAllUsers,
  insertUser,
  updateUser,
  patchUser,
  deleteUser,
};
