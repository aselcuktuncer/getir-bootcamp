const hs = require("http-status");
const { list, insert } = require("../services/Users");

const index = (req, res) => {
  list()
    .then((userList) => {
      if (!userList)
        res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var.." });
      res.status(hs.OK).send(userList);
    })
    .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
};

const create = (req, res) => {
  insert(req.body)
    .then((createdUser) => {
      if (!createdUser)
        res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var.." });
      res.status(hs.OK).send(createdUser);
    })
    .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
};

module.exports = {
  index,
  create,
};
