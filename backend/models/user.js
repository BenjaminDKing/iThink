const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        google_id: {type: String, required: true},
        email: {type: String, length: { max: 255 }},
        first_name: String,
        last_name: String,
        profile_pic: {
            url: {type: String, default: "https://res.cloudinary.com/dlhcvweaj/image/upload/v1678493207/dn10vry7gs5oinh3qh4r.webp" },
            img_id: { type: String, default: "dn10vry7gs5oinh3qh4r" } 
        },
        buddies: [
            {type: Schema.Types.ObjectId, ref: 'User', required: false}
        ],
        personal_philosophy: {type: String, required: false, length: {max: 200}}
    }
)

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema)