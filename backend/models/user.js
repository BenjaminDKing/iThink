const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        google_id: {type: String, required: true},
        email: {type: String, length: { max: 255 }},
        first_name: String,
        last_name: String,
        // buddies: [
        //     {type: Schema.Types.ObjectId, ref: 'User', required: false}
        // ]
    }
)

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema)