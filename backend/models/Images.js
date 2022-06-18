const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
	people: [{
		type: Long,
		required: false
	}],
	tags: [{
		type: String,
		required: false
	}],
	image:{
		type: Buffer,
		required: true
	}
	date:{
		type: Date,
		required: true
	}
});

module.exports = Images = mongoose.model("Images", ItemSchema);
