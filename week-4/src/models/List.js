const Mongoose = require("mongoose");

const ListSchema = new Mongoose.Schema(
  {
    title: String,
    description: String,
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("list", ListSchema);
