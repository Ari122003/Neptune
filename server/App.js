import "dotenv/config";
import express from "express";
import cors from "cors";
import connect from "./Database.js";
import router from "./User.js";
import prouter from "./Product.js";
import bodyParser from "body-parser";

const app = express();
connect();

app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
const port = process.env.PORT;

app.use("/User", router);
app.use("/Product", prouter);

app.get("/", (req, res) => {
	res.send("<h1>App is live and it's hot<h1>");
});

app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`);
});
