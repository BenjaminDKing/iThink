const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ThoughtSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        title: {type: String, required: true, length: { max: 50 }},
        content: {type: String, required: true, length: { max: 500 }},
        category: {type: String, required: false, length: { max: 20 }},
        date: {type: Date}
    }
)

module.exports = mongoose.model("Thought", ThoughtSchema);