import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductSchema = new Schema({
	Name: {
		type: String,
		required: true,
	},
	Details: {
		type: String,
		required: true,
	},
	Price: {
		type: String,
		required: true,
	},
	Image: {
		type: String,
		required: true,
	},

	Date: {
		type: String,
		required: true,
	},

	Token: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Product", ProductSchema);
