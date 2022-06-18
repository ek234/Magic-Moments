const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	venue: {
		type: String,
		required: false
	},
	img: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: true
	}
});

module.exports = Images = mongoose.model("Images", ItemSchema);
