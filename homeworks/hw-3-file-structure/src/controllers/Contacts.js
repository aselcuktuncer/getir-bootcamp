const hs = require("http-status");
const {list, insert } = require("../services/Contacts");

const index = (req, res) => {
    list()
        .then((contactList) => {
            if(!contactList)
                res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "No contact.."});
            res.status(hs.OK).send(contactList);
        })
        .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
};

const create = (req, res) => {
    insert(req.body)
        .then((createdContact) => {
            if(!createdContact)
                res.status(hs.INTERNAL_SERVER_ERROR).send({ error: " Contact can not created.."});
            res.status(hs.OK).send(createdContact)
        })
        .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
};

module.exports = {
    index,
    create,
}