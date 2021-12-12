const Mongoose = require("mongoose");

const PhoneBookSchema = new Mongoose.Schema(
    {
        title: String,
        owner: {
            type: Mongoose.Types.ObjectId,
            ref: "contact",
        },
        contacts: [
            {
                contact_id: {
                    type:Mongoose.Types.ObjectId,
                    ref: "contact",
                }

            }
        ]
    },
    {timestamps: true, versionKey: false}
)

module.exports = Mongoose.model("phoneBook", PhoneBookSchema)