const hs = require("http-status");
const { passwordToHash, generateJWTAccessToken, generateJWTRefreshToken } = require("../scripts/utils/helper");
const eventEmitter = require("../scripts/events/eventEmitter");
const uuid = require("uuid");
const UserService = require("../services/UserService");
class UserController {
  index(req, res) {
    UserService.list()
      .then((userList) => {
        if (!userList) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var.." });
        res.status(hs.OK).send(userList);
      })
      .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
  }
  create(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.create(req.body)
      .then((createdUser) => {
        if (!createdUser) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var.." });
        res.status(hs.OK).send(createdUser);
      })
      .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
  }
  login(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.findOne(req.body)
      .then((user) => {
        if (!user) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır." });
        user = {
          ...user.toObject(),
          tokens: {
            access_token: generateJWTAccessToken(user),
            refresh_token: generateJWTRefreshToken(user),
          },
        };
        delete user.password;
        res.status(hs.OK).send(user);
      })
      .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
  }
  resetPassword(req, res) {
    const newPassword = uuid.v4()?.split("-")[0] || `glsn-usr-${new Date().getTime()}`;
    UserService.updateWhere({ email: req.body.email }, { password: passwordToHash(newPassword) }).then((fetchedUser) => {
      if (!fetchedUser) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır.." });

      eventEmitter.emit("send_mail", {
        to: req.body.email,
        subject: "Şifre Resetleme",
        html: `<b>${newPassword}</b>`,
      });

      res.status(200).send({
        message: "Şifrenizin Sistemde kayıtlı e-posta adresinize gönderilmiştir.",
      });
    });
  }
}

module.exports = new UserController();
