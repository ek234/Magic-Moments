const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
//    name: {
//        type: String,
//        required: false
//    },
    faces: [{
        type: Number,
        required: true
    }],
	img: {
		type: String,
		required: true
	}
});

module.exports = Templates = mongoose.model("Templates", ItemSchema);
