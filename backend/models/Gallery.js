const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	img: {
		type: String,
		required: true
	},
	people: [{
		type: String,
		required: false
	}],
	tags: [{
		type: String,
		required: true
	}],
	date:{
		type: Date,
		required: true
	}
});

module.exports = Images = mongoose.model("Images", ItemSchema);
