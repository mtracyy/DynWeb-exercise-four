const express = require("express");

const router = express.Router();
//require firebase
const firebase = require("firebase");
//init firestore database
const db = firebase.firestore();
const blogposts = db.collection("blogposts");

const form = `<form action="/create/submit">
    <input type="text" name="title" placeholder="Title"/>
    <input type="text" name="text" placeholder="Text"/>
    <input type="text" name="author" placeholder="Author"/>
    <button type="submit">Submit</button>
</form>`;

// /create
router.get("/", (req,res) => res.send(form));


// /create/submut
router.get("/submit", (req,res) => {
    const queryParams = req.query;
    const idFromTitle = queryParams.title.replace(/\s+/g, "-").toLowerCase();

    blogposts
        .doc(idFromTitle)
        .set(queryParams)
        .then(function (doc) {
            res.send(
                "<h1>Submission successful</h1><p><a href='/create'>Create another post</a></p>"
            );
        })
        .catch(function (error) {
            console.log("Error", error);
            res.send(`Error submitting: ${error.toString()}`);
        });
});


module.exports = router;