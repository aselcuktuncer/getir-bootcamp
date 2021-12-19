const hs = require("http-status");
const { checkSecureFile } = require("../scripts/utils/helper");
const path = require("path");
const ProductService = require("../services/ProductService");
const ApiError = require("../errors/ApiError");
class ProductController {
  index(req, res, next) {
    ProductService.list()
      .then((itemList) => {
        if (!itemList) return next(new ApiError("Sorun oluştu"));
        res.status(hs.OK).send(itemList);
      })
      .catch((e) => next(new ApiError(e?.message)));
  }
  create(req, res) {
    req.body.user_id = req.user;
    ProductService.create(req.body)
      .then((createdDoc) => {
        if (!createdDoc) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var.." });
        res.status(hs.OK).send(createdDoc);
      })
      .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
  }
  update(req, res) {
    ProductService.update(req.params.id, req.body)
      .then((updatedDoc) => {
        if (!updatedDoc) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir ürün bulunmamaktadır" });
        res.status(hs.OK).send(updatedDoc);
      })
      .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
  }
  addComment(req, res) {
    if (!req.params.id) return res.status(hs.BAD_REQUEST).send({ message: "Eksik bilgi.." });
    ProductService.findOne({ _id: req.params.id }).then((mainProduct) => {
      if (!mainProduct) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir ürün bulunmamaktadır" });
      const comment = {
        ...req.body,
        created_at: new Date(),
        user_id: req.user,
      };
      mainProduct.comments.push(comment);
      ProductService.update(req.params.id, mainProduct)
        .then((updatedDoc) => {
          if (!updatedDoc) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir ürün bulunmamaktadır" });
          res.status(hs.OK).send(updatedDoc);
        })
        .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
    });
  }
  addMedia(req, res) {
    if (!req.files?.file || !checkSecureFile(req?.files?.file?.mimetype)) return res.status(hs.BAD_REQUEST).send({ message: "Eksik bilgi.." });
    ProductService.findOne({ _id: req.params.id }).then((mainProduct) => {
      if (!mainProduct) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir ürün bulunmamaktadır" });

      const extension = path.extname(req.files.file.name);
      const fileName = `${mainProduct._id?.toString()}${extension}`;
      const folderPath = path.join(__dirname, "../", "uploads/products", fileName);

      req.files.file.mv(folderPath, function (err) {
        if (err) return res.status(hs.INTERNAL_SERVER_ERROR).send(err);
        mainProduct.media = fileName;
        ProductService.update(req.params.id, mainProduct)
          .then((updatedDoc) => {
            if (!updatedDoc) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir ürün bulunmamaktadır" });
            res.status(hs.OK).send(updatedDoc);
          })
          .catch((e) => res.status(hs.INTERNAL_SERVER_ERROR).send(e));
      });
    });
  }
}

module.exports = new ProductController();
