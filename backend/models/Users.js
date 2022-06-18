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
		required: true
	}],
	date:{
		type: Date,
		required: true
	}
});

module.exports = User = mongoose.model("Items", ItemSchema);
