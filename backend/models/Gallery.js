const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	venue: {
		type: String,
		required: false
	},
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
		required: false
	}],
	date:{
		type: Date,
		required: true
	}
});

module.exports = Images = mongoose.model("Images", ItemSchema);
