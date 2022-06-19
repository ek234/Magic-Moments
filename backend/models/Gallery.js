const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	occasion: {
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
		required: true
	}],
	date:{
		type: Date,
		required: true
	}
}, { collection : 'gallery' });

module.exports = Gallery = mongoose.model("Gallery", ItemSchema);
