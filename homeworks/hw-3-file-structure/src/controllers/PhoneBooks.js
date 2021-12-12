const hs = require("http-status");
const {list, insert, findOne, updateDoc } = require("../services/PhoneBooks");

const index = (req, res) => {
    list()
        .then((phoneBookList) => {
            if(!phoneBookList)
                res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "No Phone Book.."});
            res.status(hs.OK).send(phoneBookList);
        })
        .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
};

const create = (req, res) => {
    insert(req.body)
        .then((createdPhoneBook) => {
            if(!createdPhoneBook)
                res.status(hs.INTERNAL_SERVER_ERROR).send({ error: " Phone Book can not created.."});
            res.status(hs.OK).send(createdPhoneBook)
        })
        .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
};

const update = (req, res) => {
    if(!req.params.id)
        return res.status(hs.BAD_REQUEST).send({ message: "There is no id.."})
    updateDoc(req.params.id, req.body)
        .then((updatedDoc) => {
            if(!updatedDoc)
                return res.status(hs.BAD_REQUEST).send({ message: " Can not updated.."});
            res.status(hs.OK).send(updatedDoc)
        })
        .catch((e) => res.status(hs.BAD_REQUEST).send(e))
};

const addContact = (req, res) => {
    if(!req.params.id)
        return res.status(hs.BAD_REQUEST).send({ message: "There is no id.."})
    findOne({_id: req.params.id})
    .then((mainPhoneBook) => {
        if(!mainPhoneBook)
        return res.status(hs.BAD_REQUEST).send({ message: "There is no phone book.."});
        const contacts= {
            contact_id: req.body.contact_id,
            hey: "haha"
        };
        
        console.log(contacts)
        mainPhoneBook.contacts.push(contacts)
        console.log(mainPhoneBook)
        updateDoc(req.params.id, mainPhoneBook)
        .then((updatedDoc) => {
            if(!updatedDoc)
                return res.status(hs.BAD_REQUEST).send({ message: " Can not updated.."});
            res.status(hs.OK).send(updatedDoc)
        })
        .catch((e) => res.status(hs.BAD_REQUEST).send(e))
    })
}

module.exports = {
    index,
    create,
    update,
    addContact,
}