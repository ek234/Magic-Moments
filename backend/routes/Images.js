var express = require("express");
var router = express.Router();
const { spawn } = require("child_process")

// Load User model
const Img = require("../models/Images");

// GET request 
// Getting all the users
// router.get("/", function(req, res) {
//     User.find(function(err, users) {
// 		if (err) {
// 			console.log(err);
// 		} else {
// 			res.json(users);
// 		}
// 	})
// });

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/", (req, res) => {
    const newItem = new Img({
        venue: req.body.venue,
        date: req.body.date,
        img: req.body.file
    });

    newItem.save()
        .then(item => {
            res.status(200).json(item);
			const python = spawn( "python3", ["../scripts/facedetect.py"] )
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	User.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });

module.exports = router;

