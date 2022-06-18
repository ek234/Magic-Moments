const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	tags: [{
		type: String,
		required: false
	}],
	img: {
		data: Buffer,
		contentType: String,
		required: true
	},
	// date:{
	// 	type: Date,
	// 	required: true
	// }
});

module.exports = Images = mongoose.model("Images", ItemSchema);
