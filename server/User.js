import express from "express";
const router = express.Router();
import User from "./User_schema.js";

import auth from "./Firebase.js";
import nodemailer from "nodemailer";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Fetching data of an user

router.post("/getuser", async (req, res) => {
	try {
		const user = await User.findOne({ Token: req.body.Token });
		res.json(user);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server error");
	}
});

// Adding a new user

router.post("/sendotp", async (req, res) => {
	try {
		const { email, name, password, otpfromuser, generatedotp } = req.body;

		if (generatedotp == otpfromuser) {
			await createUserWithEmailAndPassword(auth, email, password)
				.then((user) => {
					res.json(user);
				})
				.catch((err) => {
					res.json(err);
				});
		} else {
			res.json("Incorrect otp");
		}
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server error");
	}
});

router.post("/normalsignup", async (req, res) => {
	try {
		const { email } = req.body;

		const genotp = Math.floor(100000 + Math.random() * 900000);
		res.json(genotp);

		const transporter = nodemailer.createTransport({
			service: "gmail",

			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASS,
			},
		});

		await transporter.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: "Verification email",
			text: `OTP:- ${genotp}`,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json("Internal server error");
	}
});

router.post("/newuser", async (req, res) => {
	try {
		const { Name, Token } = req.body;

		if ((await User.findOne({ Token: Token })) == null) {
			const newuser = new User({ Name, Token });

			await newuser.save();
			res.json("Registered");
		} else {
			res.json("Email already exists");
		}

		res.status(200);
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server error");
	}
});

// Updating user data

router.put("/updatename", async (req, res) => {
	try {
		const { name, token } = req.body;

		await User.findOneAndUpdate({ Token: token }, { Name: name });
		res.json("Updated successfully");
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server error");
	}
});

router.put("/updateimage", async (req, res) => {
	try {
		const { image, token } = req.body;

		await User.findOneAndUpdate({ Token: token }, { Image: image });
		res.json("Updated successfully");
	} catch (error) {
		console.log(error.message);
		res.status(500).send("Internal server error");
	}
});

export default router;
