const express = require("express");

const router = express.Router();

//require firebase
const firebase = require("firebase");

//init firestore database
const db = firebase.firestore();

const blogposts = db.collection("blogposts");

// // get single blog post
// const documentToGet = "sample-post";
router.get("/", (req,res) => res.send("Please include an ID"));
router.get("/:id", (req,res) => {
    const queryID = req.params.id;

    blogposts
        .doc(queryID)
        .get()
        .then(function (doc) {
            if (doc.exists) {
                return res.send(doc.data());
            } else {
                // doc.data() will be undefined in this case
                return res.send("No such document!");
            }
        })
        .catch(function (error) {
            console.log("Error:", error);
            return res.send(error);
        });
});

module.exports = router;