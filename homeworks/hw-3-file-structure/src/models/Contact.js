const Mongoose = require("mongoose");

const ContactSchema = new Mongoose.Schema(
    {
        first_name: String,
        last_name: String,
        phone_number:String,
    },
    {timestamps: true, versionKey: false}
);

module.exports = Mongoose.model("contact", ContactSchema)