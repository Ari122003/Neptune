import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
	Name: {
		type: String,
	},

	Token: {
		type: String,
		required: true,
	},
	Image: {
		type: String,
	},
});

export default mongoose.model("User", UserSchema);
