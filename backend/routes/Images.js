var express = require("express");
var router = express.Router();
const { spawn } = require("child_process")

// Load User model
const Img = require("../models/Images");
const Gal = require("../models/Gallery");
const Tem = require("../models/Templates");

// Getting all the users
router.get("/getimages", async function(req, res) {
    Gal.find({})
        .then( g => {
            return res.status(200).json(g);
        })
        .catch((error) => {
            console.log(error);
        });
});

// Getting all templates
router.get("/getTemplates", async function(req, res) {
    Tem.find({}, {image:1})
        .then( t => {
            return res.status(200).json(t);
        })
        .catch((error) => {
            console.log(error);
        });
});

async function pyStart () {
    const proc = spawn( "python3", ["scripts/facedetect.py"] )
    proc.stdout.on('data', function(data) {
        console.log(data.toString());
    } )
    proc.stderr.on('data', function(data) {
        console.log(data.toString());
    } )
}

router.post("/addtag", (req, res1) => {
    console.log(req.body);
    var match = { _id: req.body.id };
    Gal.findOne( match )
        .then( img => {
            var tags = img['tags'].concat(req.body.addtag)
            Gal.updateOne( match, { $set: { 'tags': tags } }, function(err, res) {
                if (err) {
                    console.log(err)
                }
            })
        })
        .catch((error) => {
            console.log(error);
        });
});

router.post("/postImage", (req, res) => {
    const newItem = new Img({
        occasion: req.body.name,
        venue: req.body.venue,
        date: req.body.date,
        img: req.body.imgs
    });

    newItem.save()
        .then(item => {
            res.status(200).json(item);
            pyStart()
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;
