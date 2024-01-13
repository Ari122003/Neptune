import mongoose from "mongoose";
import { MongoClient } from "mongodb";
mongoose.set("strictQuery", true);

// const url = "mongodb://127.0.0.1:27017/Neptune";
const url =
	"mongodb+srv://Aritra:MbchAudwK4d6lAoA@cluster0.tog5hdg.mongodb.net/";

const client = new MongoClient(url);

const connect = async () => {
	await mongoose.connect(url).then(() => {
		console.log("Successfully connected");
	});
};

export default connect;
