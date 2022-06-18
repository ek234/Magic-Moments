const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
//	name: {
//		type: String,
//		required: false
//	},
	faces: [{
		type: Buffer,
		required: true
	}],
});

module.exports = Templates = mongoose.model("Templates", ItemSchema);
