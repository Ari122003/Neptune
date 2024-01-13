import express from "express";
const router = express.Router();
import Product from "./Productschema.js";

// Adding new product

router.post("/newproduct", async (req, res) => {
	try {
		const { name, details, price, image, username, userimage, token } =
			req.body;

		const date = new Date();

		const newproduct = new Product({
			Name: name,
			Details: details,
			Price: price,
			Image: image,
			Username: username,
			Userimage: userimage,
			Date: `${date.getDate()} / ${
				date.getMonth() + 1
			} / ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`,
			Token: token,
		});

		await newproduct.save();
		res.json("Successfully Saved");
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server error");
	}
});

// Fetching products of an user

router.post("/getmyproducts", async (req, res) => {
	try {
		const { token } = req.body;
		const array = await Product.find({ Token: token });

		res.json(array);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server error");
	}
});

// Fetching all products

router.get("/allproducts", async (req, res) => {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server error");
	}
});

export default router;
