const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        google_id: {type: String, required: true},
        email: {type: String, length: { max: 255 }},
        first_name: String,
        last_name: String
    }
)

module.exports = mongoose.model("User", UserSchema)